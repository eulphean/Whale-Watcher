/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Top level class that wraps the R3F Canvas for this app.
*/

import { Canvas } from '@react-three/fiber'
import Experience from './Experience.tsx'

export default function WhaleCanvas () {
    return <>
        <div style={{width: "100vw", height:"100vh"}}>
            <Canvas
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 5000,
                    position: [ 600, 900, 0 ]
                } }
            >
                <Experience />
            </Canvas>
        </div>
    </>
}