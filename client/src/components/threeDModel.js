import React from "react";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { isMobile } from "react-device-detect";
export default function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={isMobile ? 1 : 2.3}>
      <MeshDistortMaterial
        color="#8352FD"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
}
