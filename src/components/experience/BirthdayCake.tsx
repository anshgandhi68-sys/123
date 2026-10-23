"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BirthdayCakeProps {
  litStates: boolean[];
  isWishing: boolean;
}

export function BirthdayCake({ litStates, isWishing }: BirthdayCakeProps) {
  const cakeGroup = useRef<THREE.Group>(null);
  const flamesRef = useRef<(THREE.Mesh | null)[]>([]);
  const flameLightsRef = useRef<(THREE.PointLight | null)[]>([]);

  // Candle colors
  const candleColors = ["#FAF0E1", "#F5C86A", "#C8A8FF", "#FAF0E1", "#F5C86A"];
  const candlePositions = [0, 1, 2, 3, 4].map((i) => {
    const angle = (i / 5) * Math.PI * 2;
    const radius = 0.38;
    return {
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
    };
  });

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Animate candle flames
    flamesRef.current.forEach((flame, index) => {
      if (!flame) return;
      const isLit = litStates[index];
      const targetScale = isLit ? 1 : 0.001;

      // Smoothly scale flame on/off
      flame.scale.x = THREE.MathUtils.lerp(flame.scale.x, targetScale, delta * 12);
      flame.scale.y = THREE.MathUtils.lerp(
        flame.scale.y,
        isLit ? 1 + Math.sin(time * 18 + index) * 0.2 : 0.001,
        delta * 14
      );
      flame.scale.z = THREE.MathUtils.lerp(flame.scale.z, targetScale, delta * 12);

      // Flickering rotation
      if (isLit) {
        flame.rotation.z = Math.sin(time * 14 + index) * 0.08;
      }
    });

    // Flickering candle point lights
    flameLightsRef.current.forEach((light, index) => {
      if (!light) return;
      const isLit = litStates[index];
      const flicker = isLit ? 1 + Math.sin(time * 22 + index * 3) * 0.15 : 0;
      light.intensity = THREE.MathUtils.lerp(
        light.intensity,
        isLit ? (isWishing ? 1.6 : 1.1) * flicker : 0,
        delta * 12
      );
    });

    // Gentle floating breathing for the cake
    if (cakeGroup.current) {
      cakeGroup.current.position.y = Math.sin(time * 1.2) * 0.02;
    }
  });

  return (
    <group ref={cakeGroup} position={[0, 0, 0]}>
      {/* Golden Cake Platter */}
      <mesh position={[0, 0.83, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.06, 48]} />
        <meshStandardMaterial
          color="#F5C86A"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Bottom Cake Tier - Rich Chocolate */}
      <mesh position={[0, 1.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.02, 1.02, 0.72, 48]} />
        <meshStandardMaterial color="#4A2A22" roughness={0.75} metalness={0.05} />
      </mesh>

      {/* Bottom Frosting Ring */}
      <mesh position={[0, 1.58, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.08, 48]} />
        <meshStandardMaterial color="#FAF0E1" roughness={0.5} />
      </mesh>

      {/* Top Cake Tier - Dark Chocolate */}
      <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.72, 0.52, 48]} />
        <meshStandardMaterial color="#5C3328" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Top Cream Layer */}
      <mesh position={[0, 2.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.75, 0.08, 48]} />
        <meshStandardMaterial color="#FAF0E1" roughness={0.45} />
      </mesh>

      {/* Decorative Golden Pearls along the rim */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x = Math.cos(angle) * 0.68;
        const z = Math.sin(angle) * 0.68;
        return (
          <mesh key={i} position={[x, 2.22, z]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#F5C86A" roughness={0.2} metalness={0.9} />
          </mesh>
        );
      })}

      {/* 5 Lit Birthday Candles */}
      {candlePositions.map((pos, i) => (
        <group key={i} position={[pos.x, 2.2, pos.z]}>
          {/* Wax Cylinder */}
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.44, 16]} />
            <meshStandardMaterial
              color={candleColors[i]}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>

          {/* Wick */}
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.06, 8]} />
            <meshBasicMaterial color="#252744" />
          </mesh>

          {/* Animated Flame Mesh */}
          <mesh
            ref={(el) => {
              flamesRef.current[i] = el;
            }}
            position={[0, 0.54, 0]}
          >
            <coneGeometry args={[0.07, 0.22, 12]} />
            <meshBasicMaterial color="#FFD27A" />
          </mesh>

          {/* Point Light from Flame */}
          <pointLight
            ref={(el) => {
              flameLightsRef.current[i] = el;
            }}
            position={[0, 0.58, 0]}
            color="#FFC56E"
            intensity={1.2}
            distance={4.5}
            decay={2}
          />
        </group>
      ))}

      {/* Cake Platter Drop Shadow */}
      <mesh position={[0, 0.81, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 32]} />
        <meshBasicMaterial color="#0A0F1E" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
