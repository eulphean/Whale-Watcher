
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as YUKA from 'yuka'
import { randomIntFromInterval } from './Helper';
import { Box_Params } from './Aquarium';
import Whale from './Whale';
import { useControls } from 'leva';

// Define the number of whales we want to use.
const NUM_WHALES = 200;

let entityManager;
export default function WhaleManager () {
    // All the whales
    const whales = useRef([]);
    // All the seek targets
    const targets = useRef([]);
    const {hideTargets, hideWhales} = useControls('Whales', {
        hideTargets: true,
        hideWhales: false
    });

    // Component is getting initialized, let's do this right now. 
    useEffect(() => {
        // Setup YUKA
        entityManager = new YUKA.EntityManager();

        whales.current.map((v, i) => {
            v.matrixAutoUpdate = false;

            // Seek vehicle
            const vehicle = new YUKA.Vehicle();
            const s = 0.5 + Math.floor(Math.random() * 3.5);
            vehicle.scale.set(s, s, s);
            vehicle.position.x = 12 * Math.sin(i * 2 * Math.PI / NUM_WHALES);
            vehicle.position.z = 12 * Math.cos(i * 2 * Math.PI/NUM_WHALES);
            vehicle.rotation.fromEuler(0, 2 * Math.PI * Math.random(), 0);
            vehicle.mass = 5; 
            vehicle.maxSpeed = 1.2;
            vehicle.boundaryRadius = 0.1;
            vehicle.setRenderComponent(v, sync);

            // Seek target
            const yukaTarget = new YUKA.GameEntity();
            const targetMesh = targets.current[i];
            targetMesh.matrixAutoUpdate = false;
            yukaTarget.setRenderComponent(targetMesh, sync);

            // Seek behavior
            const seekBehavior = new YUKA.SeekBehavior(yukaTarget.position);
            vehicle.steering.add(seekBehavior);

            // Add everything to the entity manager, which will control the game entities
            entityManager.add(yukaTarget);
            entityManager.add(vehicle);

            // Start generating a target for us to seek to.
            setSeekTarget(yukaTarget);
        }); 
    },[]);

    useFrame((state, delta) => {
        entityManager.update(delta);
    });

    // Entity: Vehicle that is updated
    // renderComponent: Whale object
    const sync = (entity, ref) => {
        ref.matrix.copy(entity.worldMatrix);
    }

    const setSeekTarget = (target) => {
        const x = randomIntFromInterval(-Box_Params.width/2, Box_Params.width/2);
        const y = randomIntFromInterval(-Box_Params.height/2, Box_Params.height/2);
        const z = randomIntFromInterval(-Box_Params.depth/2, Box_Params.depth/2);
        target.position.set(x, y, z);
        setTimeout(() => setSeekTarget(target), 10000);
    }

    return <>
         {/* Note: YUKA ref is on the group and not on the actual mesh */}
         {[...Array(NUM_WHALES)].map((v, i) => 
            <group 
                key={i}
                ref={ref => whales.current[i] = ref}
            >
                <Whale visible={!hideWhales} />
            </group>
        )}
        {[...Array(NUM_WHALES)].map((v, i) => 
            <group
                key={i}
                ref={ref => targets.current[i] = ref}
            >
                <mesh visible={!hideTargets} scale={0.1}>
                    <sphereGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>
            </group>
        )}
    </>
}