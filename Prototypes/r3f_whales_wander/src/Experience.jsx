import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as YUKA from 'yuka'
import Aquarium from './Aquarium';

import Whale from './Whale';

const NUM_WHALES = 200;

let entityManager;
let yukaTime;
export default function Experience()
{
    const whales = useRef([]);

    const [active, setActive] = useState(false);

    // Component is getting initialized, let's do this right now. 
    useEffect(() => {
        // Setup YUKA
        entityManager = new YUKA.EntityManager();
        yukaTime = new YUKA.Time();

        whales.current.map((v, i) => {
            v.matrixAutoUpdate = false;
            
            // Vehicle Properties
            const vehicle = new YUKA.Vehicle();
            const s = 1 + Math.floor(Math.random() * 2);
            vehicle.scale.set(s, s, s);
            vehicle.position.x = 5 * Math.sin(i * 2 * Math.PI / NUM_WHALES);
            vehicle.position.z = 5 * Math.cos(i * 2 * Math.PI/NUM_WHALES);
            vehicle.rotation.fromEuler(0, 2 * Math.PI * Math.random(), 0);
            vehicle.setRenderComponent(v, sync);
            vehicle.mass = 5; 
            vehicle.boundaryRadius = 0.1;

            // Wandering 
            const wanderBehavior = new YUKA.WanderBehavior();
            vehicle.steering.add(wanderBehavior);
            entityManager.add(vehicle);
        }); 
    },[]);

    useFrame((state, delta) => {
        const yukaDelta = yukaTime.update().getDelta();
        entityManager.update(delta);
    });

    // Entity: Vehicle that is updated
    // renderComponent: Whale object
    const sync = (entity, ref) => {
        ref.matrix.copy(entity.worldMatrix);
    }

    const onWhaleClick = (event) => {
        console.log('Hello: ');
        console.log(event);
    }

    return <>
        <Perf position="top-left" />
        <OrbitControls makeDefault />
        <ambientLight color="white" />
        {/* Note: YUKA ref is on the group and not on the actual mesh */}
        {[...Array(NUM_WHALES)].map((v, i) => 
            <group 
                key={i}
                ref={ref => whales.current[i] = ref}
                onClick={() => setActive(!active)}
            >
                <Whale />
            </group>
        )}
        <Aquarium />
        {/* <gridHelper args={[50, 50]} /> */}
    </>
}