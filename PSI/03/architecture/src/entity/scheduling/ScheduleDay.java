/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity.scheduling;

import java.util.Collection;
import java.util.Date;

/**
 *
 * @author Lemmin
 */
public class ScheduleDay {
    Long id;
    Date date;
    Integer periodDay;
    Collection<Schedule> schedules;
}
