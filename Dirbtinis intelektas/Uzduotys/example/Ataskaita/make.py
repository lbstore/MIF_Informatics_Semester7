# -*- coding: iso-8859-4 -*-
import os

reportFileName = "ataskaita"
inputPrefix = "testas"
outputPrefix = "rezultatas"
verificationPrefix = "verifikavimo"
semanticPrefix = "semantinis"
graphPrefix = "g"

verificationGraphTitle = 'Verifikavimo grafas:'
semanticGraphTitle = 'Semantinis grafas:'

imageTag = '<img src="%s\%s%d.png">'

FCMode = "FC"
BCMode = "BC"

inputTitle = 'Įvestis:'
outputTitle = 'Išvestis:'

FCFiles = [ 
'Faktas konsekvente', 
'Čyras vs Negnevitsky; Čyras laimi', 
'Čyras vs Negnevitsky; Negnevitsky laimi',
'Tikslas tarp faktų',
'Kelias neegzistuoja',
'Negnevitsky pavyzdys (5 produkcijos, p.37)'
]

BCFiles = [
'Užmirštama šaka',
'Devynios produkcijos D,C',
'Devynios produkcijos C,D',
'Ciklas ir praleistas potikslis',
'Grafas su trumpu keliu',
'Grafas su ilgu keliu',
'Trys alternatyvos tikslui',
'Trys alternatyvos ir nepasiekiamas tikslas',
'Tikslas tarp faktų',
'Negnevitsky pavyzdys (5 produkcijos, p.39)'
]

nonbreakingSpaceCode = '&nbsp'
lineBreakTag = '<br>'

leadingTitleTag = '<h2>'
endingTitleTag = '</h2>'

leadingTags = '<html><head><style> table{border-collapse:separate;border: 1px; border-style:solid; width:640px; table-layout:fixed;}tr{font-size:9;font-family:courier new;}</style></head><body>'
endingTags = '</body</html>'

leadingCellTags = '<table><tr><td>'
endingCellTags = '</td></tr></table>'+lineBreakTag

def addSection(reportFile, files, mode):
    for i in range(1, len(files)+1):
        os.system('python main.py %s\%s%d.txt %s > %s\%s%d.txt' % (mode, inputPrefix, i, mode, mode, outputPrefix, i))        
        print >> reportFile, leadingTitleTag, "%d. " % i, files[i-1], endingTitleTag, lineBreakTag
        if os.path.isfile("%s\%s%d.png" % (mode, graphPrefix, i)):
            print >> reportFile, imageTag % (mode, graphPrefix, i), lineBreakTag
        print >> reportFile, inputTitle, lineBreakTag
        addTable(reportFile, '%s\%s%d.txt' % (mode, inputPrefix, i))
        print >> reportFile, outputTitle, lineBreakTag
        addTable(reportFile, '%s\%s%d.txt' % (mode, outputPrefix, i))
        addImage(reportFile, imageTag % (mode, verificationPrefix, i), verificationGraphTitle)
        addImage(reportFile, imageTag % (mode, semanticPrefix, i), semanticGraphTitle)

def addTable(reportFile, tableContentFileName):
    print tableContentFileName
    with open(tableContentFileName, 'r') as file:
        print >> reportFile, leadingCellTags, file.read().replace(' ', nonbreakingSpaceCode).replace('\n', lineBreakTag), endingCellTags 

def addImage(reportFile, imageTag, imageTitle):
    print >> reportFile, imageTitle, lineBreakTag, imageTag, lineBreakTag

with open("%s.html" % reportFileName, "w") as reportFile:
    print >> reportFile, leadingTags
    addSection(reportFile, FCFiles, FCMode)
    addSection(reportFile, BCFiles, BCMode)        
    print >> reportFile, endingTags