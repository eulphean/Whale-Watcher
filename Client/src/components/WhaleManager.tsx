/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: The most critical component that manages all the whales in the
    ecosystem.
*/

import { useFrame} from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as YUKA from 'yuka'
import Whale from './Whale';
import { useControls } from 'leva';
import Agent from './Agent'
import useGlobalStore from './stores/useGlobalStore';
import * as THREE from 'three'
import { MAX_SCALE, MIN_SCALE } from './Helper';

let entityManager;
export default function WhaleManager () {
    // All the whales
    const whaleRefs = useRef([]);
    // All the seek targets
    const targetRefs = useRef([]);
    // Refs for all the html elements.
    const htmlRefs = useRef([]);

    const {hideTargets, hideWhales} = useControls('Whales', {
        hideTargets: true,
        hideWhales: false
    });

    let topHolders, maxTokens, numWhales;
    topHolders = useGlobalStore((state) => state.topHolders);
    numWhales = topHolders.length;
    maxTokens = topHolders[0]['held_count']; // It's ordered in ascending order.
    console.log(maxTokens);

    // Component is getting initialized, let's do this right now. 
    useEffect(() => {
        // Setup YUKA
        entityManager = new YUKA.EntityManager();
        console.log(htmlRefs);
        whaleRefs.current.map((whaleMesh, i) => {
            // Really important property to set to make sure that three.js doesn't update the matrices for 
            // this mesh. 
            whaleMesh.matrixAutoUpdate = false;
            
            // Make sure three.js cannot update the matrices on the targetMesh as well.
            const targetMesh = targetRefs.current[i];
            targetMesh.matrixAutoUpdate = false;
   
            const numTokens = topHolders[i]['held_count'];
            const scale = THREE.MathUtils.mapLinear(numTokens, maxTokens, 0, MAX_SCALE, MIN_SCALE);
            // console.log(numTokens + ', ' + scale);        

            const posX = 12 * Math.sin(i * 2 * Math.PI / numWhales);
            const posZ = 12 * Math.cos(i * 2 * Math.PI/ numWhales);
            const agent = new Agent(whaleMesh, targetMesh, posX, posZ, scale);
           
            // Add everything to the entity manager, which will control the game entities
            // entityManager.add(agent.target);
            // entityManager.add(agent.vehicle);
            entityManager.add(agent);
            entityManager.add(agent.target);
            entityManager.add(agent.vehicle);
        }); 
    },[]);

    useFrame((state, delta) => {
        entityManager.update(delta);
    });

    const onPointerEnter = (event, i) => {
        const htmlRef = htmlRefs.current[i];
        htmlRef.style.opacity = 1; 
    }

    return <>
         {/* Note: YUKA ref is on the group and not on the actual mesh, 
         so we are not applying transforms on the mesh */}
         {[...Array(numWhales)].map((v, i) => 
            <group 
                key={i}
                ref={ref => whaleRefs.current[i] = ref}
                onPointerOver={(event) => onPointerEnter(event, i)}
            >
                <Html
                    ref={ref => htmlRefs.current[i] = ref}
                    style={{
                        transition: 'all 0.25s',
                        color: "red",
                        textDecoration: "underline",
                        fontSize: 16,
                        opacity: 0
                    }}
                >
                    {<a target="_blank" href={`https://etherscan.io/address/${topHolders[i]['address']}`}>{topHolders[i]['ens_name'] || topHolders[i]['address']}</a>}
                </Html>
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