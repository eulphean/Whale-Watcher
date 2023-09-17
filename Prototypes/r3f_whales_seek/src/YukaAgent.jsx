import * as YUKA from 'yuka'
import { randomIntFromInterval } from './Helper';
import { Box_Params } from './Aquarium';

const STATE = {
    STAY: 0,
    STEER_IN: 1,
    STEER_OUT: 2
};

// This agent class will wrap everyting related to the 
export default class YukaAgent {
    vehicle = '';
    target = ''; 
    constructor(vehicleMesh, targetMesh, posX, posZ) {
         // Moving agent
         this.vehicle = new YUKA.Vehicle();

         // Agent scale
         const s = 0.5 + Math.floor(Math.random() * 3.5);
         this.vehicle.scale.set(s, s, s);

         // Agent start position
         this.vehicle.position.x = posX;
         this.vehicle.position.z = posZ;

         // Agent rotation
         this.vehicle.rotation.fromEuler(0, 2 * Math.PI * Math.random(), 0);

         // other
         this.vehicle.mass = 5; 
         this.vehicle.maxSpeed = 1.2;
         this.vehicle.boundaryRadius = 0.1;
         this.vehicle.setRenderComponent(vehicleMesh, this.sync);

         // Seek target
         this.target = new YUKA.GameEntity();
         this.target.setRenderComponent(targetMesh, this.sync);
         // Set a new target.
         this.setSeekTarget();

         // Seek behavior
         const seekBehavior = new YUKA.SeekBehavior(this.target.position);
         this.vehicle.steering.add(seekBehavior);

         // Also create your state here.
    }

    // Entity: Yuka vehicle that is updated
    // ref: r3f mesh that is updated.
    sync (entity, ref) {
        ref.matrix.copy(entity.worldMatrix);
    }

    setSeekTarget() {
        const x = randomIntFromInterval(-Box_Params.width/2, Box_Params.width/2);
        const y = randomIntFromInterval(-Box_Params.height/2, Box_Params.height/2);
        const z = randomIntFromInterval(-Box_Params.depth/2, Box_Params.depth/2);
        this.target.position.set(x, y, z);
        setTimeout(() => this.setSeekTarget(), 10000);
    }
};