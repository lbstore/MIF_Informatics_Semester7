/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fcbc;

import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedList;

/**
 *
 * @author Laimonas-Beniusis-PC
 */
public class FCBC {
    public static int numPos = 5;
    public static interface Traceable {

        public void trace(String s);
    }


    public static class Rule {

        String name = "";
        String right = "";
        LinkedList<String> left = new LinkedList<>();
        boolean flag1, flag2;

        public String toString() {
            return name + ": " + left.toString() + " -> " + right;
        }
    }

    public static abstract class Chaining implements Traceable {

        String goal;
        LinkedList<Rule> rules = new LinkedList<>();
        HashSet<String> db = new HashSet<>();
        HashSet<String> currentFacts = new HashSet<>();
        LinkedList<String> results = new LinkedList<>();

        public abstract boolean execute();
       
        public void fromLines(Collection<String> lines) throws Exception {
            int mode = 0;
            int count = 0;
            try {
                for (String line : lines) {
                    count++;
                    line = line.trim();
                    if(line.isEmpty() && rules.isEmpty()){
                        System.out.println("["+line+"]" + count);
                        continue;
                    }
                    if (line.isEmpty()) {
                        mode++;
                        continue;
                    }
                    switch (mode) {
                        case 0: // rules
                            Rule rule = new Rule();
                            
                            rule.name = "R" + (rules.size() +1);
                            String[] split = line.split(" ");
                            
                            for (int i = 0; i < split.length; i++) {
                                
                                String r = split[i].trim();
                                if (r.isEmpty()) {
                                    continue;
                                }
                                if(i == 0){
                                    rule.right = r;
                                }else{
                                    rule.left.add(r);
                                }
                                
                            }
                            if(rule.left.isEmpty() || rule.right.isEmpty()){
                                continue;
                            }
                            rules.add(rule);
                            break;
                        case 1: // facts
                            for (String fact : line.split(" ")) {
                                fact = fact.trim();
                                if (fact.isEmpty()) {
                                    continue;
                                }
                                db.add(fact);
                            }
                            break;
                        case 2: // goal
                            goal = line;
                            break;
                        case 3: // too many empty lines
                            throw new Exception();
                    }
                }
            } catch (Exception e) {
                throw new Exception("Parsing error at line " + count);
            }
        }

        public void printBeforeExecution() {
            trace("PART 1. Data");
            String s = "\t";
            String ss = s + "\t";
            trace(s + "1) Rules:");
            for (Rule r : rules) {
                trace(ss + r.toString());
            }
            trace("");
            trace(s + "2) Given facts:");
            for (String f : this.db) {
                trace(ss + f);
            }
            trace("");
            trace(s + "3) Goal:");
            trace(ss + this.goal);
            trace("");
            trace("PART 2. Execution");
            trace("");

        }

        public void printAfterExecution(boolean found) {
            trace("");
            trace("PART 3. Results");
            String s = "\t";
            String add = " was not deduced";
            if (makeCol(currentFacts).contains(goal)) {
                add = " was deduced";
            }
            if (db.contains(this.goal)) {
                add = " was given";
            }
            trace(s + "1) " + this.goal + add);
            if (found) {

                if (!results.isEmpty()) {
                    trace(s + "2) Path: " + this.results.toString());
                }

            }
        }
        
    }

    public static abstract class FC extends Chaining {

        @Override
        public boolean execute() {
            if (db.contains(goal)) {
                return true;
            }
            int i = 1;
            while (true) {
                int sizeBefore = makeCol(db, currentFacts).size();
                trace("");
                trace(i++ + " ITERATION");
                for (Rule rule : rules) {
                    if (rule.flag1) {
                        trace(rule + " skip, flag1");
                    } else if (rule.flag2) {
                        trace(rule + " skip, flag2");
                    } else {
                        boolean satisfied = true;
                        HashSet<String> newDB = makeCol(db, currentFacts);
                        for (String f : rule.left) {
                            if (!newDB.contains(f)) {
                                trace(rule + " skip, missing " + f);
                                satisfied = false;
                                break;
                            }
                        }
                        if (satisfied) {
                            if (newDB.contains(rule.right)) {
                                rule.flag2 = true;
                                trace(rule + " skip, consequent in DB");
                            } else {
                                results.add(rule.name);
                                currentFacts.add(rule.right);
                                newDB = makeCol(db, currentFacts);
                                rule.flag1 = true;
                                trace(rule + " apply, DB:" + newDB);
                                if (newDB.contains(this.goal)) {
                                    trace("Goal found, terminating");
                                    return true;
                                }
                            }
                        }
                    }
                }
                if (sizeBefore == makeCol(db, currentFacts).size()) {
                    trace("No new facts. Terminating");
                    return false;
                }
            }
        }
    }

    public static <T> HashSet<T> makeCol(Collection<T>... cols) {
        HashSet<T> list = new HashSet<>();
        for (Collection c : cols) {
            list.addAll(c);
        }
        return list;
    }

    public static abstract class BC extends Chaining {

        int recFrame = 1;
        
        int step = 1;

        public String format(String goal, String str) {
            StringBuilder s = new StringBuilder();
            for (int i = 0; i < this.recFrame; i++) {
                s.append("..");
            }
            String res = String.format("%" + numPos + "d) " + s + " Goal %s" + ". " + str, step++, goal);
            return res;
        }

        @Override
        public boolean execute() {
            return bc(this.goal, new LinkedList<>());
        }

        private boolean bc(String g, LinkedList<String> currentGoals) {
            if (db.contains(g)) {
                return true;
            }
            boolean relevantRule = false;
            Object cloneFacts = currentFacts.clone();
            Object cloneResults = results.clone();
            for (Rule rule : rules) {
                if (rule.right.equals(g)) {
                    relevantRule = true;
                    boolean found = true;
                    trace(format(g, "Find " + rule + ". New goals:" + rule.left));
                    for (String f : rule.left) {
                        if (db.contains(f)) {
                            trace(format(f, "Fact was given, DB:" + db));
                        } else {
                            if (currentFacts.contains(f)) {
                                HashSet<String> newDB = makeCol(db, currentFacts);
                                trace(format(f, "Fact was deduced, DB:" + newDB));
                            } else {
                                if (currentGoals.contains(f)) {
                                    trace(format(f, "Cycle detected, Backtracking. FAIL."));
                                    found = false;
                                    break;
                                }
                                currentGoals.addLast(f);
                                this.recFrame++;
                                found = bc(f, currentGoals);
                                this.recFrame--;
                                currentGoals.pollLast();
                                if (!found) {
                                    break;
                                }
                                if (currentFacts.contains(this.goal)) {
                                    trace(format(f, "Final goal detected, Backtracking. OK."));
                                    return true;
                                }
                            }
                        }
                    }
                    if (found) {
                        results.add(rule.name);
                        currentFacts.add(rule.right);
                        HashSet<String> newDB = makeCol(db, currentFacts);
                        trace(format(g, "New Fact added, DB:" + newDB + ", Backtracking. OK"));
                        return true;
                    }
                }
                currentFacts = (HashSet<String>) cloneFacts;
                results = (LinkedList<String>) cloneResults;
            }
            if (relevantRule) {
                trace(format(g, "No more rules to deduce it. Backtracking. FAIL"));
            } else {
                trace(format(g, "No rules to deduce it. Backtracking. FAIL"));
            }
            return false;
        }

    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception {
        if(args.length != 3){
            System.out.println("Usage [FC/BC], inputFile, outputFile");
            System.exit(1);
        }
        String mode = "FC";
        String input="";
        String output="";
        mode = args[0];
        input = args[1];
        output = args[2];
        Chaining f;
        LinkedList<String> lines = new LinkedList<>();
        if(mode.equals("FC")){
            f = new FC() {
                @Override
                public void trace(String s) {
                    lines.add(s);
                }
            };
        }else{
            f = new BC() {
                @Override
                public void trace(String s) {
                    lines.add(s);
                }
            };
        }
        Collection<String> readFromFile = FileReader.readFromFile(input, "//");
        f.fromLines(readFromFile);
        f.printBeforeExecution();
        boolean ok = f.execute();
        f.printAfterExecution(ok);
        FileReader.writeToFile(output, lines);
    }

}
