import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import WhaleManager from './WhaleManager';
import Aquarium, { Box_Params } from './Aquarium';
import { useControls } from 'leva';

export default function Experience()
{
    const {showPerf} = useControls('Experience', {
        showPerf: false
    });

    return <>
        {showPerf ? <Perf position="top-left" /> : <></> }
        <OrbitControls makeDefault />
        <ambientLight color="white" />
        <WhaleManager />
        <Aquarium scale={[Box_Params.width, Box_Params.height, Box_Params.depth]} />
        {/* <gridHelper args={[50, 50]} /> */}
    </>
}