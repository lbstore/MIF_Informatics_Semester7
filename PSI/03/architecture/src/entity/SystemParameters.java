/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.Collection;

/**
 *
 * @author Lemmin
 */
public class SystemParameters {
    Long id;
    Collection<TruckType> truckType;
    Collection<CarpetType> carpetType;
    Double kmCost;
    Address KJbaseLocation;
}
