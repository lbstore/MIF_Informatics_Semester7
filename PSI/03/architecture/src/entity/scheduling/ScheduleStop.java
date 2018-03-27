/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity.scheduling;

import entity.Address;
import java.util.Collection;

/**
 *
 * @author Lemmin
 */
public class ScheduleStop {
    Long id;
    Address adress;
    Collection<Delivery> offices;
}
