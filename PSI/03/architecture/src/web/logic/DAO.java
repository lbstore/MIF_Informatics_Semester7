/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package web.logic;

import entity.Office;
import entity.SystemParameters;
import entity.Truck;
import entity.User;
import entity.scheduling.Generation;
import entity.scheduling.ScheduleDay;
import java.util.Collection;

/**
 *
 * @author Lemmin
 */
public abstract class DAO {
    //cache
    Collection<Office> officeList;
    Collection<User> userList;
    Collection<Truck> trucks;
    SystemParameters parameters;
    Collection<Generation> generations;

    public Collection<Truck> getTrucks() {
        return trucks;
    }

    public void setTrucks(Collection<Truck> trucks) {
        this.trucks = trucks;
    }

    public Collection<Generation> getGenerations() {
        return generations;
    }

    public void setGenerations(Collection<Generation> generations) {
        this.generations = generations;
    }
    
    
    abstract void saveChanges(Class cls, Collection<?> list);
    
    abstract void saveCache();
    
    abstract void updateCache();
    

    public Collection<Office> getOfficeList() {
        return officeList;
    }

    public void setOfficeList(Collection<Office> officeList) {
        this.officeList = officeList;
    }

    public Collection<User> getUserList() {
        return userList;
    }

    public void setUserList(Collection<User> userList) {
        this.userList = userList;
    }

    public SystemParameters getParameters() {
        return parameters;
    }

    public void setParameters(SystemParameters parameters) {
        this.parameters = parameters;
    }
    
    public abstract ScheduleDay getAssignedScheduleDay(String workerID, String passwordHash); 
}