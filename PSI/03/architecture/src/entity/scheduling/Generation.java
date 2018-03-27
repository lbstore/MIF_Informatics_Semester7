/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity.scheduling;

import java.util.Collection;

/**
 *
 * @author Lemmin
 */
public class Generation {
    Long id;
    Boolean active;
    Integer period;
    Collection<AssignedScheduleDay> schedules;
    
}
