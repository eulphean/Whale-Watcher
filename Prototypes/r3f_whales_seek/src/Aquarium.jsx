import * as THREE from 'three';

// Size of the aquarium
export const Box_Params = {
    width: 20,
    height: 10,
    depth: 30
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