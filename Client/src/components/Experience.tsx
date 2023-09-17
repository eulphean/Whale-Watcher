/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Core Experience class that has all our controls and lighting for the 
    scene.
*/

import { useState, useEffect } from 'react';
import { OrbitControls, Stage, Sparkles } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import WhaleManager from './WhaleManager';
import Aquarium, { Box_Params } from './Aquarium';
import { useControls } from 'leva';
import { Leva } from 'leva';

export default function Experience()
{
    const {showPerf} = useControls('Experience', {
        showPerf: false
    });

    const [hide, setHide] = useState(false);

    useEffect(() => {
        window.addEventListener("keypress", () => {
            setHide(!hide);
        });
    }, []);

    return <>
        <Stage shadows={'contact'} intensity={0.5}>
            <group position={[0, 45, 0]}>
                {showPerf ? <Perf position="top-left" /> : <></> }
                <OrbitControls makeDefault />
                <ambientLight color="white" />
                <WhaleManager />
                <Aquarium scale={[Box_Params.width, Box_Params.height, Box_Params.depth]} />
                <Sparkles position={[0, -4, 0]} count={1000} size={15} scale={40} color={"aqua"} noise={5.0} />
            </group>
        </Stage>
        {/* <gridHelper args={[50, 50]} /> */}
    </>
}