/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pkg02;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 *
 * @author Lemmin
 */
public class KnightTour {
    public static boolean trace = false;
    public static class Tile{
        public int stepN;
        public String toString(){
            return specialFormat(stepN,2);
        }
        
    }
    public static Pos[] possibleMoves = new Pos[]{
        P(2,1),
        P(1,2),
        P(-1,2),
        P(-2,1),
        P(-2,-1),
        P(-1,-2),
        P(1,-2),
        P(2,-1)
    };
    
    public static Tile[][] tiles;
    public static Pos P(int x, int y){
        return new Pos(x,y);
    }
    public static class Pos{
        int x,y;
        public Pos(int x, int y){
            this.x = x;
            this.y = y;
        }
        public String toString(){
            return y + " " + x;
        }
    }
    //4-8 board sizes

    
    public static boolean inBounds(Pos s){
        return (s.x>=0 && s.x < tiles[0].length) && (s.y >=0 && s.y < tiles.length);
    }
    
    public static Tile get(Pos s){
        return tiles[s.y][s.x];
    }
    
    
    public static String generate(String s, int num){
        String str = "";
        for(int i = 0; i < num; i++){
            str+=s;
        }
        return str;
    }
    
    public static boolean firstStep(Pos step){
        get(step).stepN = 1;
        boolean found = visit(2,step);
        if(!found){
            get(step).stepN = 0;
        }
        return found;
    }
    
    
    
    public static boolean visit(int stepN,Pos previousStep){
        
        boolean found = false;
        for(int i = 0; i < possibleMoves.length; i++){
            Pos move = possibleMoves[i];
            Pos nextStep = P(previousStep.x + move.x, previousStep.y + move.y);
            
            String s = generate("-",stepN)+" "+stepN+" -> " +"["+nextStep.toString()+"]";
//            state.state = generate("-",stepN) +"["+step.toString()+"]";
            boolean inBounds = inBounds(nextStep);
            boolean lastMove = i==possibleMoves.length-1;
            if(!inBounds){
                s+= " Out of bounds"; 
                if(lastMove){
                    s+= " Backtrack";
                }
                traceCall(s);
            }
            if(inBounds){
                
                Tile t = get(nextStep);
                if(t.stepN==0){
                    s+= " Continue";
                }else{
                    s+= " Visited";
                    if(lastMove){
                        s+= " Backtrack";
                    }
                }
                traceCall(s);
                if(t.stepN==0){
                    t.stepN = stepN;
                    if(stepN < tiles.length * tiles[0].length){
                        found = visit(stepN+1,nextStep);
                        if(!found){
                            t.stepN = 0;
                        }
                    }else{
                        found = true;
                    }
                }
            }
            if(found){
                break;
            }
        }
        
        return found;
    }
    
    public static void init(int N){
        tiles = new Tile[N][N];
        for(int i = 0; i < N; i++){
            tiles[i] = new Tile[N];
            for(int j = 0; j < N; j++){
                Tile tile = new Tile();
                tile.stepN = 0;
                tiles[i][j] = tile;
            }
        }
    }
    public static ExecutorService service = Executors.newSingleThreadExecutor();
    
    public static void traceCall(final String s){
        Callable c = new Callable() {
            @Override
            public Object call() throws Exception {
                trace(s);
                return null;
            }
        };
        service.submit(c);
    }
    public static void trace(String s){
        
        if(trace){
            output.println(specialFormat(step++,5)+s);
        }
    }
    static int step = 1;
    static PrintWriter output;
    public static void halt(String reason){
        System.out.println(reason);
        System.exit(1);
    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception {
        int n = 6;
        trace = false;
        Pos firstStep = P(0,0);
        System.out.println("Parameters [int, boolean, int, int]");
        System.out.println("N, trace enabled, Position x, Position y");
        try{
        if(args.length > 0){
            n = Integer.valueOf(args[0]);
            if(args.length > 1){
                trace = Boolean.valueOf(args[1]);
                if(args.length >3){
                    firstStep = new Pos(Integer.valueOf(args[2])-1,Integer.valueOf(args[3])-1);
                }
                
            }
        }
        System.out.println("Trace enabled:"+trace);
        }catch(Exception e){
            halt("Failed to parse parameters [int, boolean]");
        }
        if(n>8){
            halt("N is invalid, pick [5,6,7,8]");
        }
        output = new PrintWriter("trace.txt");

        
        
        long timeStart = System.currentTimeMillis();
        init(n);
        boolean found = firstStep(firstStep);
        long timeEnd = System.currentTimeMillis();
        System.out.println("Solution found:"+found);
        service.shutdown();
        service.awaitTermination(10000, TimeUnit.DAYS);
        output.println("  Y");
        output.println("  ^");
        for(int i = 0; i< tiles.length; i++){
            output.println((tiles.length-i)+" |"  +" " +Arrays.asList(tiles[n-i-1]));
        }
        output.print("  ");
        for(int i = 0; i< 4*n; i++){
            output.print("-");
        }
        output.println("--> X");
        output.print("   ");
        for(int i = 1; i<= tiles.length; i++){
            output.print(specialFormat(i,4));
        }
        output.println();
        float seconds = (float)(timeEnd - timeStart)/1000;
        output.println("Time taken:"+seconds);
        output.close();
        
    }
    
    public static String specialFormat(Integer num, Integer leading){
        String s = String.valueOf(num);
        for(int i = s.length(); i< leading; i++){
            s = " "+s;
        }
        return s;
        
    }

    
}
