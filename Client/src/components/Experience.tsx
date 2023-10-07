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
import { useControls, button } from 'leva';
import { Leva } from 'leva';
import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

const newPosition = {x: -30, y: 20, z: 60};
const lookAt = new THREE.Vector3(0, 0, 0);
let tween;
export default function Experience()
{   

    const {gl, camera} = useThree();

    const {showPerf} = useControls('Experience', {
        showPerf: false,
        screenshot: button(() => {
            const link = document.createElement('a')
            link.setAttribute('download', 'canvas.png')
            link.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
            link.click()
        })
    });

    const [hide, setHide] = useState(false);

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
        <Stage shadows={'contact'} intensity={0.1}>
            <group position={[0, 50, 0]}>
                {showPerf ? <Perf position="top-left" /> : <></> }
                <OrbitControls autoRotate={true} autoRotateSpeed={0.5} makeDefault />
                <ambientLight color="white" />
                <WhaleManager />
                <Aquarium scale={[Box_Params.width, Box_Params.height, Box_Params.depth]} />
                <group scale={[1.4, 0.55, 1.5]} position={[0, 1.5, 0]}>
                    <Sparkles position={[0, -4, 0]} count={1000} size={10} scale={30} color={"aqua"} noise={5.0} />
                </group>
            </group>
        </Stage>
        {/* <gridHelper args={[50, 50]} /> */}
    </>
}