import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

import Picture01 from "../../../images/carlo.jpg";

const _ = ({ isMobile }) => {
  return (
    <>
      <pointLight
        position={[-2, 3, 1]}
        angle={-0.2}
        color="#684172"
        intensity={1}
      />
      <pointLight
        position={[2, -3, 1]}
        angle={-0.2}
        color="#769ea5"
        intensity={1}
      />
      <ambientLight intensity={0.3} />
      <PlaneBox position={[0, 0, 0]} isMobile={isMobile} />
    </>
  );
};

export default _;
function PlaneBox({ props, isMobile }) {
  const mesh = useRef();
  const skin = useTexture({
    map: Picture01,
  });

  useFrame((state, delta) => {
    if (isMobile) {
      mesh.current.rotation.y = mesh.current.rotation.y += 0.005;
    } else {
      mesh.current.rotation.x = mesh.current.rotation.x += 0.0002;
      mesh.current.rotation.y = mesh.current.rotation.y += 0.0005;
    }
  });
  return (
    <mesh {...props} ref={mesh} scale={0.6}>
      {!isMobile && <OrbitControls />}
      <boxBufferGeometry attach="geometry" args={[6, 8, 0.2]} />
      <meshStandardMaterial attach="material" {...skin} />
    </mesh>
  );
}
