import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(20, 10, 30); 
const edges = new THREE.EdgesGeometry(boxGeometry); 
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 5 } ) ); 

export default function Aquarium () {
    return <>
        <mesh geometry={boxGeometry}>
            <meshStandardMaterial roughness={0.765} transparent opacity={0.2} color="aqua" />
        </mesh>
        <primitive object={line} />
    </>
}