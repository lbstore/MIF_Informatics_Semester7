/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package web.logic;

import entity.scheduling.Generation;

/**
 *
 * @author Lemmin
 */
public abstract class Generator {
    abstract Generation generate(GenerationParameters parameters);
}
