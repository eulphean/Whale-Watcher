/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: The most critical component that manages all the whales in the
    ecosystem.
*/

import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as YUKA from 'yuka'
import Whale from './Whale';
import { useControls } from 'leva';
import Agent from './Agent'
import useGlobalStore from './stores/useGlobalStore';
import * as THREE from 'three'
import { MAX_SCALE, MIN_SCALE } from './Helper';

function getCleanHolders(topHolders) {
    let num = 0;
    topHolders.forEach(t => {
        if (t.numTokens > 0) {
            num++;
        }
    });
    return num;
}

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

    // [Only if we don't have any random agents]
    // Access all the whales that we just read from the contract.
    // Prune that whales that do not have the tokens anymore.
    const numRandomAgents = useGlobalStore((state) => state.numRandomAgents);
    // console.log(numRandomAgents);
    let topHolders, maxTokens, numWhales;
    if (numRandomAgents === 0) {
        topHolders = useGlobalStore((state) => state.topHolders);
        numWhales = getCleanHolders(topHolders); // Some of the holders have 0 tokens - let's ignore them.
        maxTokens = topHolders[0].numTokens; // It's ordered in ascending order.
    } else {
        // if we are not reading from the contract, we are using random agents.
        // console.log(numRandomAgents)
        numWhales = numRandomAgents;
    }

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

            let scale;
            if (numRandomAgents > 0) {
                // We need random scale
                scale = 0.5 + Math.floor(Math.random() * 3.5);
                // console.log(scale);
            } else {
                const numTokens = topHolders[i].numTokens;
                scale = THREE.MathUtils.mapLinear(numTokens, maxTokens, 0, MAX_SCALE, MIN_SCALE);
                console.log(numTokens + ', ' + scale);
            }            

            const posX = 12 * Math.sin(i * 2 * Math.PI / numWhales);
            const posZ = 12 * Math.cos(i * 2 * Math.PI/ numWhales);
            const agent = new Agent(whaleMesh, targetMesh, posX, posZ, scale);
           
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
         {[...Array(numWhales)].map((v, i) => 
            <group 
                key={i}
                ref={ref => whaleRefs.current[i] = ref}
            >
                <Whale visible={!hideWhales} />
            </group>
        )}
        {[...Array(numWhales)].map((v, i) => 
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