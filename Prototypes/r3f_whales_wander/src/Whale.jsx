import { useEffect, useMemo, useRef } from 'react'
import { useGLTF, Clone, useAnimations} from "@react-three/drei"
import { useGraph } from '@react-three/fiber';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

export default function Whale(props) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF("/whale.gltf");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    const action = actions['Swim'];
    // Add some degree of randomness about when things start.
    action.startAt(Math.random() * 5.0).play();

    return (() => {
        action.fadeOut(0.5);
        console.log('Cleanup')
    });
}, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="WhaleArmature" rotation={[0, -0.161, 0]}>
          <skinnedMesh
            name="Whale"
            geometry={nodes.Whale.geometry}
            material={materials.Whale}
            skeleton={nodes.Whale.skeleton}
          />
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone001} />
          <primitive object={nodes.Bone006} />
          <primitive object={nodes.Bone007} />
          <primitive object={nodes.Bone010} />
          <primitive object={nodes.Bone011} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/whale.gltf");

// NON-UNPACKED VERSION OF THE MODEL
// export default function Whale(props)
// {
//     // When we call this twice, the previous instance is used. 
//     // It's memoized through the calls. 
//     const whale = useGLTF('./whale.gltf');
//     const clone = useMemo(() => SkeletonUtils.clone(whale.scene), [whale.scene]);
//     const animations = useAnimations(whale.animations, clone);

//     useEffect(() => {
//         const action = animations.actions['Swim'];
//         // Add some degree of randomness about when things start.
//         action.startAt(Math.random() * 5.0).play();

//         return (() => {
//             action.fadeOut(0.5);
//             console.log('Cleanup')
//         });
//     }, []);

//     return <>
//         <primitive object={clone} />
//     </>
// }

// When testing with simple cone geometries, bring this back.
// return <>
// <mesh rotation-x={Math.PI/2} >
//     <coneGeometry args={[0.1, 0.5, 8]} />
//     <meshNormalMaterial/>
// </mesh>
// </>
