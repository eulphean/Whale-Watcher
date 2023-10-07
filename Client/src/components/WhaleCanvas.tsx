/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Top level class that wraps the R3F Canvas for this app.
*/

import { Canvas, useThree } from '@react-three/fiber'
import Experience from './Experience.tsx'
import { Leva } from 'leva'

export default function WhaleCanvas () {
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
                <Leva
                    hidden // default = false, when true the GUI is hidden
                />
                <Experience />
            </Canvas>
        </div>
    </>
}