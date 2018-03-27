/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package web.logic;

/**
 *
 * @author Lemmin
 */
public abstract class JSONhandler {
    DAO dao;
    
    public abstract void handleJson(String str);
    public abstract void authenticate(String number,String passwordHash);
}
