/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Top level class that wraps the R3F Canvas for this app.
*/

import { Canvas } from '@react-three/fiber'
import Experience from './Experience.tsx'
import { Leva } from 'leva'
import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'

export default function WhaleCanvas () {
    const [showGUI, setShowGui] = useState(true);
    const handleKeyDown = () => {
        setShowGui(!showGUI);
    }

    useEffect(() => {
        // Subsribe to a key event on component mount.
        document.addEventListener('keydown', handleKeyDown, true);
    }, [])
    return <>
        <div style={{width: "100vw", height:"100vh"}}>
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 5000,
                    position: [ 600, 900, 0 ]
                }}
                gl={{ preserveDrawingBuffer: true }}
            >
                {/* <color args={['#ffffff']} attach={'background'} /> */}
                {/* <Leva hidden /> */}
                <Experience />
            </Canvas>
        </div>
    </>
}