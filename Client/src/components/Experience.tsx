/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Core Experience class that has all our controls and lighting for the 
    scene.
*/

import { useState, useEffect } from 'react';
import { useThree, useFrame} from '@react-three/fiber'
import { OrbitControls, CameraControls, Stage, Sparkles } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import WhaleManager from './WhaleManager';
import Aquarium, { Box_Params } from './Aquarium';
import { useControls } from 'leva';
import { Leva } from 'leva';
import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

const newPosition = {x: -30, y: 20, z: 60};
const lookAt = new THREE.Vector3(0, 0, 0);
let tween;
export default function Experience()
{
    const {showPerf} = useControls('Experience', {
        showPerf: false
    });

    const [hide, setHide] = useState(false);

    const {gl, camera} = useThree();

    useEffect(() => {
        tween = new TWEEN.Tween(camera.position)
        .to(newPosition, 5000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onComplete(() => {
            console.log('Hello');
        });

        tween.start();

        window.addEventListener("keypress", () => {
            setHide(!hide);
        });
    }, []);

    useFrame((state, delta) => {
        TWEEN.update();
        state.camera.lookAt(lookAt);
    });

    return <>
        <Stage shadows={'contact'} intensity={0.5}>
            <group position={[0, 45, 0]}>
                {showPerf ? <Perf position="top-left" /> : <></> }
                <OrbitControls autoRotate={true} autoRotateSpeed={0.5} makeDefault />
                <ambientLight color="white" />
                <WhaleManager />
                <Aquarium scale={[Box_Params.width, Box_Params.height, Box_Params.depth]} />
                <Sparkles position={[0, -4, 0]} count={1000} size={15} scale={30} color={"aqua"} noise={5.0} />
            </group>
        </Stage>
        {/* <gridHelper args={[50, 50]} /> */}
    </>
}