
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as YUKA from 'yuka'
import { randomIntFromInterval } from './Helper';
import { Box_Params } from './Aquarium';
import Whale from './Whale';
import { useControls } from 'leva';
import Agent from './Agent'

// Define the number of whales we want to use.
const NUM_WHALES = 200;

let entityManager;
export default function WhaleManager () {
    // All the whales
    const whaleRefs = useRef([]);
    // All the seek targets
    const targetRefs = useRef([]);
    const {hideTargets, hideWhales} = useControls('Whales', {
        hideTargets: true,
        hideWhales: false
    });

    // Component is getting initialized, let's do this right now. 
    useEffect(() => {
        // Setup YUKA
        entityManager = new YUKA.EntityManager();

        whaleRefs.current.map((whaleMesh, i) => {
            // Really important property to set to make sure that three.js doesn't update the matrices for 
            // this mesh. 
            whaleMesh.matrixAutoUpdate = false;
            
            // Make sure three.js cannot update the matrices on the targetMesh as well.
            const targetMesh = targetRefs.current[i];
            targetMesh.matrixAutoUpdate = false;

            const posX = 12 * Math.sin(i * 2 * Math.PI / NUM_WHALES);
            const posZ = 12 * Math.cos(i * 2 * Math.PI/NUM_WHALES);
            const agent = new Agent(whaleMesh, targetMesh, posX, posZ);
           
            // Add everything to the entity manager, which will control the game entities
            // entityManager.add(agent.target);
            // entityManager.add(agent.vehicle);
            entityManager.add(agent);
            entityManager.add(agent.target);
            entityManager.add(agent.vehicle)
        }); 
    },[]);

    useFrame((state, delta) => {
        entityManager.update(delta);
    });

    return <>
         {/* Note: YUKA ref is on the group and not on the actual mesh, 
         so we are not applying transforms on the mesh */}
         {[...Array(NUM_WHALES)].map((v, i) => 
            <group 
                key={i}
                ref={ref => whaleRefs.current[i] = ref}
            >
                <Whale visible={!hideWhales} />
            </group>
        )}
        {[...Array(NUM_WHALES)].map((v, i) => 
            <group
                key={i}
                ref={ref => targetRefs.current[i] = ref}
            >
                <mesh visible={!hideTargets} scale={0.1}>
                    <sphereGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>
            </group>
        )}
    </>
}