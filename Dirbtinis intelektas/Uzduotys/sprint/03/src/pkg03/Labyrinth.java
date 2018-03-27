/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pkg03;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 *
 * @author Lemmin
 */
public class Labyrinth {

    
    public static final int WALL = 1;
    public static final int EMPTY = 0;
    public static final int VISITED = -1;
    
    public static int stepNo = 1;
    static ExecutorService service = Executors.newSingleThreadExecutor();
    
    static Lab lab;
    
    static PrintStream out = System.out;
    public static Pos[] possibleMoves = new Pos[]{
        P(-1,0),P(0,-1),P(1,0),P(0,1)
        
    };
    
    
    static Pos P(int int1, int int2){
        return new Pos(int1,int2);
    }
    static void shutdown(){
        service.shutdown();
        try {
            service.awaitTermination(1, TimeUnit.DAYS);
        } catch (InterruptedException ex) {
        }
        System.exit(0);
    }
    static void halt(String reason) {
        System.out.println(reason);
        shutdown();
    }
    static void traceCall(final String s){
        Callable c = new Callable() {
            @Override
            public Object call() throws Exception {
                out.println(s);
                return null;
            }
        };
        service.submit(c);
    }
    static String specialFormat(Integer num, Integer leading){
        String s = String.valueOf(num);
        for(int i = s.length(); i< leading; i++){
            s = " "+s;
        }
        return s; 
    }
    
    static String generate(String s, int num){
        StringBuilder builder = new StringBuilder();
        for(int i = 0; i < num; i++){
            builder.append(s);
        }
        return builder.toString();
    }

    
    
    static Lab parseLab(String filename) throws FileNotFoundException, IOException{
        ArrayList<String> readFromFile = new ArrayList<>(FileReader.readFromFile(filename));
        Lab labyrinth = new Lab(readFromFile.get(0).length(),readFromFile.size());
        for(int i = 0; i < readFromFile.size(); i++){
            String row = readFromFile.get(i);
//            traceCall(row);
            for(int j = 0; j < row.length(); j++){
                Integer val = Integer.parseInt(row.charAt(j)+"");
                if(val == 2){
                    labyrinth.starting = new Pos(j,i);
                    labyrinth.set(j, i, 2);
                    continue;
                }
                labyrinth.set(j, i, val);
            }
        }
        return labyrinth;
    }

    
    static boolean go(Pos step){
        if(lab.edge(step)){
            return true;
        }
        boolean found = false;
        for(int i = 0; i < possibleMoves.length; i++){
            Pos next = possibleMoves[i];
            Pos nextStep = Pos.add(step, next);
            int type = lab.get(nextStep).val;
            String rule = "R"+(i+1);
            String trace = specialFormat(stepNo++,3)+") "+generate("-",lab.steps-3)+rule + " "+nextStep.toString();
            
            switch(type){
                case EMPTY:{
                    trace+=" EMPTY";
                    break;
                }
                case WALL:{
                    trace+=" WALL";
                    break;
                }
                default:{
                    trace+=" VISITED";
                    break;
                }
            }
            if(type!= EMPTY && i == 3){
                trace+=" BACKTRACK";
            }
            traceCall(trace);
            if(type == EMPTY){
                lab.set(nextStep, lab.steps++);
                found = go(nextStep);
                if(!found){
                    lab.set(nextStep, VISITED);
                    lab.steps--;
                    
                }
            }
            if(found){
                lab.positions.addFirst(nextStep);
                lab.rules.addFirst(rule);
                break;
            }
            
        }
        return found;
    }
   
    
    static Pos wave(Lab lab, Pos starting){
        LinkedList<Pos> nextIteration = new LinkedList<>();
        nextIteration.add(starting);
        int waveLength = 2;
        Pos toReturn = null;
        while(!nextIteration.isEmpty()){
            waveLength++;
            LinkedList<Pos> addNextIteration = new LinkedList<>();
            traceCall("Wave: "+(waveLength-2));
            for(Pos p:nextIteration){
                lab.closed++;
                traceCall("\t Close "+lab.closed+" "+p);
               
                for(int i = 0; i < possibleMoves.length; i++){
                    String rule = "R"+(i+1);
                    String trace = "\t\t"+rule;
                    Pos move = possibleMoves[i];
                    Pos newPos = Pos.add(p, move);
                    trace+=newPos;
                    Tile t = lab.get(newPos);
                    switch(t.val){
                        case EMPTY:{
                            trace+=" EMPTY";
                            t.val = waveLength;
                            t.back = p;
                            addNextIteration.add(newPos);
                            lab.opened++;
                            trace+=" OPEN "+lab.opened+" Pos="+newPos;
                            if(lab.edge(newPos)){
                                t.val = waveLength;
                                trace+= " TERMINAL";
                                toReturn = newPos;
                            }
                            break;
                        }
                        case WALL:{
                            trace+=" WALL";
                            break;
                        }
                        default:{
                            trace+=" VISITED";
                            
                        }
                    }
                    traceCall(trace);
                    
                }
            }
            if(toReturn!=null){
                return toReturn;
            }
            nextIteration.clear();
            nextIteration.addAll(addNextIteration);
            
            
        }
        
        return toReturn;
    }

    
    public static void nicePrintCall(Lab l){
        Runnable run = () ->{
            l.nicePrint(out);
        };
        service.submit(run);
    }
    public static void main(String[] args)throws Exception {

        String labLoc = conditionalArgument(args,0,"labSimple.txt");
        boolean wave = Boolean.parseBoolean(conditionalArgument(args,1,"true"));
        String fileLoc = conditionalArgument(args,2,null);
        if(fileLoc!=null){
            out = new PrintStream(fileLoc);
        }
        
        traceCall("Parameters [String] labyrinth file, [Boolean] use wave method, [String] file output");
        traceCall("Default: lab.txt,false,null");
        lab = parseLab(labLoc);
        out.println("Data:");
        lab.nicePrint(out);
        
        if(wave){
            Lab cloned = shallowCloneLab(lab);
            Pos lastPos = wave(cloned,cloned.starting);
            Tile lastTile = cloned.get(lastPos);
            while(lastTile != null && lastTile.back != null){
                lab.positions.addFirst(lastPos);
                lab.set(lastPos, lastTile.val);
                
                //Resolve rule
                Pos sub = Pos.sub(lastTile.back,lastPos);
                for(int i = 0; i<possibleMoves.length; i++){
                    if(sub.equals(possibleMoves[i])){
                        lab.rules.addFirst("R"+(i+1));
                    }
                }
                lastPos = lastTile.back;
                lastTile = cloned.get(lastPos);
            }   
            lab.positions.addFirst(lab.starting);
            
            traceCall("Wave trace");
            nicePrintCall(cloned);
        }else{
            traceCall("Recursive trace");
            go(lab.starting);
        }
        
        
        
        
        traceCall("\nTrace path\n");
        nicePrintCall(lab);
        traceCall("\nRules:" +lab.rules.toString());
        traceCall("Positions: "+lab.positions.toString());
        shutdown();
    }
    
    static Lab shallowCloneLab(Lab original){
        Lab l= new Lab(original.x,original.y);
        for(int i = 0; i < l.x; i++){
            for(int j = 0; j < l.y; j++){
                Tile t = original.get(i, j);
                l.set(i,j,t.val);
            }
        }
        l.starting = new Pos(original.starting.x,original.starting.y);
        return l;
    }
    
    
    static class Pos{
        int x,y;
        public Pos(int x, int y){
            this.x = x;
            this.y = y;
        }
        public String toString(){
            return "["+(x+1) + " " + (lab.y-y)+"]";
        }
        public static Pos add(Pos p, Pos t){
            return new Pos(p.x + t.x, p.y + t.y);
        }
        public static Pos sub(Pos p, Pos t){
            return new Pos(p.x - t.x, p.y - t.y);
        }
        public boolean equals(Pos p){
            return this.x == p.x && this.y == p.y;
        }
    }  
    static class Tile{
        public int val;
        public Pos back;
        public Tile(int x){
            val = x;
        }
        public String toString(){
            return specialFormat(val,2);
        }
    }
    static class Lab{
        int opened;
        int closed;
        Pos starting;
        LinkedList<String> rules = new LinkedList<>();
        LinkedList<Pos> positions = new LinkedList<>();
        int steps = 3;
        ArrayList<ArrayList<Tile>> tiles;
        int x,y;
        public Lab(int x, int y){
            this.x = x;
            this.y = y;
            tiles = new ArrayList<>();
            for(int i = 0; i < y; i++){
                ArrayList<Tile> row = new ArrayList<>();
                for(int j = 0; j < x; j++){
                    row.add(new Tile(EMPTY));
                }
                tiles.add(0,row);
            }
        }
        public void set(int x, int y, int val){
            tiles.get(y).set(x, new Tile(val));
        }
        public void set(Pos p, int val){
            this.set(p.x, p.y, val);
        }
        public Tile get(int x, int y){
            return tiles.get(y).get(x);
        }
        public Tile get(Pos p){
            return get(p.x,p.y);
        }
        public boolean edge(Pos p){
            return (p.x == 0 || p.y == 0)||(p.x+1 == x || p.y+1 == y );
        }
        public void nicePrint(PrintStream output){
            output.println("  Y");
            output.println("  ^");
            for(int i = 0; i < this.y; i++){
                String tileS = this.tiles.get(i).toString();
                tileS = tileS.substring(1, tileS.indexOf(']'));
                output.println(specialFormat(y-i,2) +" | "+tileS);
            }
            output.print("  ");
            for(int i = 0; i< 4*x; i++){
                output.print("-");
            }
            output.println("--> X");
            output.print("   ");
            for(int i = 1; i<= this.x; i++){
                output.print(specialFormat(i,4));
            }
            output.println();
            
        }
                
    }
    
    public static String conditionalArgument(String[] args, int index, String def){
        if(args.length<=index){
            return def;
        }
        return args[index];
    }
}
