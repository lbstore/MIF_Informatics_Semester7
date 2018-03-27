/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pkg01;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;

/**
 *
 * @author Lemmin
 */
public class Hanoi {

    public static int debugTime = 0;
    public static long moves = 0;
    static class Tower{
        public String name;
        public Tower(String n){
            name = n;
        }
        @Override
        public boolean equals(Object other){
            if(other instanceof Tower){
                return((Tower) other).name.equals(this.name);
            }
            return false;
        }
    }
    
    static class ListTower extends Tower{
        public ArrayDeque<Integer> deque = new ArrayDeque<>();
        public ListTower pointer;
        public ListTower(String n) {
            super(n);
        }
        public boolean canAccept(Integer top){
            return deque.isEmpty() || deque.getLast() > top;
        }
        public Integer top(){
            return deque.getLast();
        }
        public boolean empty(){
            return deque.isEmpty();
        }
        public Integer size(){
            return deque.size();
        }
    }
    
    static class Move{
        public String from,to;
        public Integer what;
        public String toString(){
            return from+" -"+what+"-> "+to;
        }
        public String state;
    }
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception {
        Integer n = 10;
        if(args.length>0){
            n = Integer.parseInt(args[0]);    
        }
        Boolean cyclic = true;
        if(args.length>1){
            cyclic = Boolean.valueOf(args[1]);
        }
        
        if(n>10){
            throw new Exception("N per didelis (<=10)");
        }
        ArrayList<Move> steps;
        if(cyclic){
           steps = initCyclic(n);
        }else{
            steps = initRecursive(n);
        }
        
        
        
        int i = 1;
        int leading = 4;
        for(Move m:steps){
            System.out.println(specialFormat(i++,leading) +":"+m.toString() + "  busena["+m.state+"]");
        }
        System.out.println("Steps: " +steps.size());
        
        if(cyclic){
            System.out.println("Naudotas iteracinis metodas");
        }else{
            System.out.println("Naudotas rekursinis metodas");
        }
        
    }
    public static ListTower A,B,C;
    
    public static ArrayList<Move> initRecursive(int n){
        ArrayList<Move> moves = new ArrayList<>();
        A = new ListTower("A");
        B = new ListTower("B");
        C = new ListTower("C");
        for(int i = 0; i < n; i++ ){
            A.deque.addFirst(i+1);
        }
        recursive(moves, A, B, C, n);
        return moves;
    }
    
   
    
    public static void recursive(ArrayList<Move> actions, ListTower t1, ListTower t2, ListTower t3, Integer n){
        if(n > 0){
            recursive(actions, t1, t3, t2, n-1);
            Move move = new Move();
            move.from = t1.name;
            move.to = t3.name;
            move.what = n;
            t3.deque.addLast(t1.deque.pollLast());
            move.state = "A=" +A.deque.toString() + ", B"+B.deque.toString()+", C"+C.deque.toString();

            actions.add(move);
            recursive(actions, t2, t1, t3, n-1);
        }
    }
    
    public static ArrayList<Move> initCyclic(int n) throws InterruptedException{
        ArrayList<Move> actions = new ArrayList<>();
        ArrayList<ListTower> towers = new ArrayList<>();
        A = new ListTower("A");
        B = new ListTower("B");
        C = new ListTower("C");
        towers.add(A);
        towers.add(B);
        towers.add(C);
        for(int i = 0; i < n; i++ ){
            A.deque.addFirst(i+1);
        }
        towers.add(A);
        if(n % 2 == 0){//clockwise
            A.pointer = B;
            B.pointer = C;
            C.pointer = A;
        }else{//counter clockwise
            A.pointer = C;
            C.pointer = B;
            B.pointer = A;
        }
        
        
        Integer lastMoved = -1;
        while(C.size() < n){
            //find smallest

            ListTower from = null;
            for(ListTower sm:towers){
                if(!(sm.empty() || Objects.equals(sm.top(), lastMoved))
                        && (from == null || from.top() > sm.top())) {
                    from = sm;
                }
            }
            ListTower t = from.pointer;
            while(!t.canAccept(from.top())){
                t = t.pointer;
            }
            Integer accept = from.deque.pollLast();
            lastMoved = accept;
            t.deque.addLast(accept);
            Move move = new Move();
            move.from = from.name;
            move.to = t.name;
            move.what = accept;
            move.state = "A=" +A.deque.toString() + ", B"+B.deque.toString()+", C"+C.deque.toString();
            actions.add(move);
            if(debugTime>0){
                Thread.sleep(debugTime);
                System.out.println("#### " +actions.size()+" ####");
                for(ListTower p:towers){
                    System.out.print(p.name);
                    System.out.println(p.deque);
                }
            }
        }
        return actions;
    }
    
    public static String specialFormat(Integer num, Integer leading){
        String s = String.valueOf(num);
        for(int i = s.length(); i< leading; i++){
            s = " "+s;
        }
        return s;
        
    }
    
}
