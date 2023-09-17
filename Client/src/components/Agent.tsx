/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: An uber class that wraps all YukaAgent related activities.
    Also, manages the internal state machine for each agent.
*/

import * as YUKA from 'yuka'
import { MAX_MASS, MAX_MAXSpeed, MAX_SCALE, MIN_MASS, MIN_MAXSpeed, MIN_SCALE, randomIntFromInterval } from './Helper';
import { Box_Params } from './Aquarium';
import { InsideState, OutsideState } from './AgentStates';
import * as THREE from 'three'

// This agent class will wrap everyting related to the 
export default class Agent extends YUKA.GameEntity {
    vehicle = '';
    target = ''; 
    constructor(vehicleMesh, targetMesh, posX, posZ, scale) {

        super();

        // Moving agent
        this.vehicle = new YUKA.Vehicle();

        // Agent scale
        // Generate a scale using the number of tokens
        this.vehicle.scale.set(scale, scale, scale);

        // Agent start position
        this.vehicle.position.x = posX;
        this.vehicle.position.z = posZ;

        // Agent rotation
        this.vehicle.rotation.fromEuler(0, 2 * Math.PI * Math.random(), 0);

        // We want to map other parameters based on the scale.
        const scaledMass = THREE.MathUtils.mapLinear(scale, MIN_SCALE, MAX_SCALE, MIN_MASS, MAX_MASS);
        this.vehicle.mass = scaledMass; 

        const scaledMaxSpeed = THREE.MathUtils.mapLinear(scale, MIN_SCALE, MAX_SCALE, MIN_MAXSpeed, MAX_MAXSpeed);
        this.vehicle.maxSpeed = scaledMaxSpeed;

        this.vehicle.boundaryRadius = 0.1;
        this.vehicle.setRenderComponent(vehicleMesh, this.sync);

        // Seek target
        this.target = new YUKA.GameEntity();
        this.target.setRenderComponent(targetMesh, this.sync);
        //  // Set a new target.
        //  this.setSeekTarget();

        // Seek behavior
        const seekBehavior = new YUKA.SeekBehavior(this.target.position);
        this.vehicle.steering.add(seekBehavior);

        // State Machine
        this.stateMachine = new YUKA.StateMachine(this);
        this.stateMachine.add('INSIDE', new InsideState());
        this.stateMachine.add('OUTSIDE', new OutsideState());
        // Choose the next state.
        this.chooseNextState();

        // Track current time. 
        this.currentTime = 0;
    }

    update(delta) {
        // Update the state machine.
        this.currentTime += delta; 
        this.stateMachine.update();
    }

    // Entity: Yuka vehicle that is updated
    // ref: r3f mesh that is updated.
    sync (entity, ref) {
        ref.matrix.copy(entity.worldMatrix);
    }

    setSeekTarget(place) {
        let x, y, z, v;
        if (place === 'internal') {
            x = randomIntFromInterval(-Box_Params.width/2, Box_Params.width/2);
            y = randomIntFromInterval(-Box_Params.height/2, Box_Params.height/2);
            z = randomIntFromInterval(-Box_Params.depth/2, Box_Params.depth/2);
            this.target.position.set(x, y, z);
        } else {
			const radius = Box_Params.width/2 * 2.0;
			const phi = Math.acos( ( 2 * Math.random() ) - 1 );
			const theta = Math.random() * Math.PI * 2;
            v = new YUKA.Vector3(0, 0, 0).fromSpherical(radius, phi, theta);        
            // Update target position
            this.target.position.copy(v);
        }

    }

    chooseNextState() {
        const toss = Math.random();
        if (toss >= 0.5) {
            this.stateMachine.changeTo('INSIDE');
        } else {
            this.stateMachine.changeTo('OUTSIDE');
        }
    }
};