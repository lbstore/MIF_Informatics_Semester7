
class ParseException(Exception):
    pass
    
class Parser:
    def __init__(self, fileName):
        self.fileName = fileName
        
    def readFile(self):
        fileHandle = open(self.fileName)
        self.buffer = fileHandle.read()
        fileHandle.close()    
    
    def removeComments(self):
        skip = False
        proccessed = []
        for c in self.buffer:
            if (c == '/'):
                skip = True
            elif (c == '\n'):
                skip = False
            if not(skip):
                proccessed.append(c)
        self.buffer = proccessed
        
    def splitLinesWords(self):
        self.linesWords = []
        for line in ''.join(self.buffer).splitlines():
            self.linesWords.append(line.split())
            
    def parseParts(self):
        self.parts = [[], [], []]
        for part in self.parts:
            while self.linesWords and not self.linesWords[0]:
                self.linesWords.pop(0)
            while self.linesWords and self.linesWords[0]:
                part.append(self.linesWords.pop(0))
            
        while self.linesWords and not self.linesWords[0]:
            self.linesWords.pop(0)
        if self.linesWords and self.linesWords[0]:
           raise ParseException("aptikti i failo formata neieinantys duomenys")
        
        
    def validateParts(self):
        if not self.parts[0]:
            raise ParseException("taisykliu dalis neatitinka formato")
        for rule in self.parts[0]:
            if not(len(rule) >= 2):
                raise ParseException("aptikta taisykle neturinti antecedento")
        if len(self.parts[1]) != 1:
            raise ParseException("faktu dalis neatitinka formato")
        if not self.parts[1][0]:
            raise ParseException("nera faktu!")
        if len(self.parts[2]) != 1:
            raise ParseException("tikslo dalis neatitinka formato")
        if len(self.parts[2][0]) != 1:
            raise ParseException("tikslas privalo buti vienas")
        for rule in self.parts[0]:
            for atom in rule:
                if not(atom.isalpha()):
                    raise ParseException("taisykles demenys privalo buti sudaryti is abeceles raidziu")
        for atom in self.parts[1][0]:
            if not(atom.isalpha()):
                raise ParseException("faktu demenys privalo buti sudaryti is abeceles raidziu")
        if not(self.parts[2][0][0].isalpha()):
            raise ParseException("tikslo demuo privalo buti sudarytas is abeceles raidziu")
            
    def assembleParts(self):
        try:
            self.readFile()
            self.removeComments()
            self.splitLinesWords()
            self.parseParts()
            self.validateParts()
            return self.parts
        except ParseException as pe:
            print 'Klaida nagrinejant failo turini: %s!' % str(pe)
            return None
        except IOError:
            print('Nepavyko nuskaityti arba atidaryti failo!')
            return None

class Rule:
    __ruleCounter = 1
    
    def __init__(self, list):
        self.name = 'R%s' % str(Rule.__ruleCounter)
        Rule.__ruleCounter += 1
        self.flag1 = False
        self.flag2 = False
        self.rhs = list.pop(0)
        self.lhs = list
        
    def __str__(self):
        return '%s:%s->%s' % (self.name, ','.join(self.lhs), self.rhs)
        
class ForwardBackwardChaining:
    def __init__(self, parts):
        self.rules = []
        for rule in parts[0]:
            self.rules.append(Rule(rule))
        self.facts = parts[1][0]
        self.goal = parts[2][0][0]
        self.results = []
        self.recursionDepth = 1
        self.stepCount = 0
        self.currentGoals = []
        self.currentFacts = []
        self.msg1 = '  %s ITERACIJA'
        self.msg2 = '    %s praleidziame, nes pakelta flag1.'
        self.msg3 = '    %s praleidziame, nes pakelta flag2.'
        self.msg4 = '    %s netaikome, nes truksta %s.'
        self.msg5 = '    %s netaikome, nes konsekventas faktuose. Pakeliame flag2.'
        self.msg6 = '    %s taikome. Pakeliame flag1. Faktai %s ir %s.'
        self.msg7 = '%2d)%sTikslas %s. %s'
        self.msg8 = 'Randame %s. Nauji tikslai %s.'
        self.msg9 = 'Ciklas. Griztame, FAIL.'
        self.msg10 = 'Faktas (buvo gautas), nes faktai %s ir %s. Griztame, sekme.'
        self.msg11 = 'Faktas (duotas), nes faktai %s. Griztame, sekme.'
        self.msg12 = 'Faktas (dabar gautas). Faktai %s ir %s. Griztame, sekme.'
        self.msg13 = 'Nera taisykliu jo isvedimui. Griztame, FAIL.'
        self.msg14 = 'Nera daugiau taisykliu jo isvedimui. Griztame, FAIL.'
        self.msg15 = '1 DALIS. Duomenys\n\n  1) Taisykles:\n     %s\n\n  2) Faktai:\n     %s\n\n  3) Tikslas:\n     %s\n\n2 DALIS. Vykdymas\n'
        self.msg16 = '\n3 DALIS. Rezultatai'
        self.msg17 = '  1) Tikslas %s isvestas.\n  2) Kelias %s.\n'
        self.msg18 = '  1) Tikslas %s tarp pradiniu faktu\n'
        self.msg19 = '  1) Tikslas %s neisvestas.\n'
    
    def formatTrace(self, modifier, goal, msg):
        self.stepCount += 1
        return self.msg7 % (self.stepCount,"".ljust(self.recursionDepth+modifier, '.'),goal,msg)
    
    def printInitialData(self):
        print self.msg15 % ('\n     '.join('%s: %s -> %s' % (rule.name, ', '.join(rule.lhs), rule.rhs) for rule in self.rules), ', '.join(self.facts), self.goal)

    def printResults(self):
        print self.msg16
        if self.goal in self.facts+self.currentFacts:
            if self.results:
                print self.msg17 % (self.goal, ', '.join(self.results))
            else:
                print self.msg18 % self.goal
        else:
            print self.msg19 % self.goal
    
    def executeForwardChaining(self):
        if self.goal in self.facts:
            return True
        iterationCounter = 1
        while True:
            isNewFact = False
            print self.msg1 % str(iterationCounter)
            iterationCounter += 1
            for rule in self.rules:
                if rule.flag1:
                    print self.msg2 % str(rule)
                elif rule.flag2:
                    print self.msg3 % str(rule)
                else:
                    isSatisfied = True
                    for atom in rule.lhs:
                        if atom not in self.facts+self.currentFacts:
                            print self.msg4 % (str(rule), atom)
                            isSatisfied = False
                            break
                    if isSatisfied:
                        if rule.rhs in self.facts+self.currentFacts:
                            rule.flag2 = True
                            print self.msg5 % (str(rule))
                        else:
                            self.results.append(rule.name)
                            isNewFact = True
                            self.currentFacts.append(rule.rhs)
                            rule.flag1 = True
                            print self.msg6 % (str(rule), ', '.join(self.facts), ', '.join(self.currentFacts))
                            if rule.rhs == self.goal:
                                return True
                            break
            if not isNewFact:
                break
            print
        return False
    
    def executeBackwardChaining(self, goal):
        if self.goal in self.facts:
            return True
        isRule = False
        factsCount = len(self.currentFacts)
        resultsCount = len(self.results)
        for rule in self.rules:
            if rule.rhs == goal:
                isRule = True
                isSatisfied = True
                print self.formatTrace(0, goal, self.msg8 % (str(rule),', '.join(rule.lhs)))
                for atom in rule.lhs:
                    if atom not in self.facts:
                        if atom not in self.currentFacts:
                            if atom in self.currentGoals:
                                print self.formatTrace(1, atom, self.msg9)
                                isSatisfied = False
                                break
                            self.currentGoals.append(goal)
                            self.recursionDepth += 1
                            isSatisfied = self.executeBackwardChaining(atom)
                            self.recursionDepth -= 1
                            self.currentGoals.pop()
                            if not isSatisfied:
                                break
                            if self.goal in self.currentFacts:
                                return True
                        else:
                            print self.formatTrace(1, atom, self.msg10 % (', '.join(self.facts), ', '.join(self.currentFacts)))
                    else:
                        print self.formatTrace(1, atom, self.msg11 % ', '.join(self.facts))
                if isSatisfied:
                    self.results.append(rule.name)            
                    self.currentFacts.append(rule.rhs)
                    print self.formatTrace(0, goal, self.msg12 % (', '.join(self.facts), ', '.join(self.currentFacts)))
                    return True
            while len(self.currentFacts) > factsCount:
                self.currentFacts.pop()
            while len(self.results) > resultsCount:
                self.results.pop()
        if not isRule:
            print self.formatTrace(0, goal, self.msg13)
        else:
            print self.formatTrace(0, goal, self.msg14)
        return False

if __name__ == "__main__":
    from sys import argv
    if len(argv) == 3 and (argv[2] == 'FC' or argv[2] == 'BC'):
        p = Parser(argv[1])
        parts = p.assembleParts()
        if parts is not None:
            fbc = ForwardBackwardChaining(parts)
            fbc.printInitialData()
            if (argv[2] == 'FC'):
                fbc.executeForwardChaining()
            elif (argv[2] == 'BC'):    
                fbc.executeBackwardChaining(fbc.goal)
            fbc.printResults()
    else:
        print 'Programos naudojimas: programos_vardas ivesties_failo_vardas (\'FC\' | \'BC\')'
            

