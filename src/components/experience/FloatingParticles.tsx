"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParticlesProps {
  count?: number;
}

export function FloatingParticles({ count = 120 }: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, initialY] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const inits = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      const y = Math.random() * 8;
      pos[i * 3 + 1] = y;
      inits[i] = y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    return [pos, inits];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle vertical float
      array[i * 3 + 1] += delta * 0.18;
      // Gentle horizontal drift
      array[i * 3] += Math.sin(time * 0.8 + i) * delta * 0.04;

      // Wrap around when rising past ceiling
      if (array[i * 3 + 1] > 8.5) {
        array[i * 3 + 1] = -0.5;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F5C86A"
        size={0.065}
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
