/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Common helper for components.
*/

// Random number between two numbers
export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const MAX_SCALE = 5.5;
export const MIN_SCALE = 0.8;

export const MAX_MASS = 8;
export const MIN_MASS = 2; 

export const MAX_MAXSpeed = 2.5;
export const MIN_MAXSpeed = 0.5;