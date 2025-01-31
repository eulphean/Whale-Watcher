/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Whale model class - this is deconstructed using the glstf into
    seperate nodes to allow us to clone it cleanly and modify it with the Yuka Game system.
*/

import { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations} from "@react-three/drei"
import { useGraph } from '@react-three/fiber';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import * as THREE from 'three'

const mat = new THREE.MeshNormalMaterial();
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
        <group  name="WhaleArmature" rotation={[0, -0.161, 0]}>
          <skinnedMesh
            name="Whale"
            geometry={nodes.Whale.geometry}
            material={mat}
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