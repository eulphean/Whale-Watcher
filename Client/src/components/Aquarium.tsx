/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Bounding Aquarium in the world.
*/

import * as THREE from 'three';

// Size of the Aquarium hosting the whales.
export const Box_Params = {
    width: 30,
    height: 18,
    depth: 40
};

const boxGeometry = new THREE.BoxGeometry(1, 1, 1); 
const edges = new THREE.EdgesGeometry(boxGeometry); 
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0x00ffff, linewidth: 5 } ) ); 

export default function Aquarium (props) {
    return <>
        <mesh {...props} geometry={boxGeometry}>
            <meshStandardMaterial roughness={0.765} transparent opacity={0.2} color="aqua" />
        </mesh>
        <primitive {...props} object={line} />
    </>
}