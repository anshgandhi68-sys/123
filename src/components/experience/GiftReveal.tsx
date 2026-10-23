"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GiftRevealProps {
  isRevealed: boolean;
  revealProgress: number; // 0 to 1
}

export function GiftReveal({ isRevealed, revealProgress }: GiftRevealProps) {
  const giftGroup = useRef<THREE.Group>(null);
  const lidGroup = useRef<THREE.Group>(null);
  const glowMesh = useRef<THREE.Mesh>(null);
  const giftLight = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Smooth lid elevation and rotation based on revealProgress
    if (lidGroup.current) {
      const targetY = 2.0 + revealProgress * 1.6;
      const targetRotZ = revealProgress * 0.45;
      const targetRotX = revealProgress * 0.2;

      lidGroup.current.position.y = THREE.MathUtils.lerp(
        lidGroup.current.position.y,
        targetY,
        delta * 6
      );
      lidGroup.current.rotation.z = THREE.MathUtils.lerp(
        lidGroup.current.rotation.z,
        targetRotZ,
        delta * 6
      );
      lidGroup.current.rotation.x = THREE.MathUtils.lerp(
        lidGroup.current.rotation.x,
        targetRotX,
        delta * 6
      );
    }

    // Gift inner light intensity
    if (giftLight.current) {
      const targetIntensity = isRevealed ? 3.5 : 0;
      giftLight.current.intensity = THREE.MathUtils.lerp(
        giftLight.current.intensity,
        targetIntensity,
        delta * 8
      );
    }

    // Glow aura pulse
    if (glowMesh.current) {
      const pulse = Math.sin(time * 2.2) * 0.08 + (isRevealed ? 0.35 : 0.18);
      (glowMesh.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }

    // Gentle float on pedestal
    if (giftGroup.current) {
      giftGroup.current.position.y = Math.sin(time * 1.5) * 0.04;
    }
  });

  return (
    <group position={[7, 0, 0]}>
      {/* Golden Cylindrical Pedestal */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.15, 1.8, 36]} />
        <meshStandardMaterial color="#252744" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.81, 0]} receiveShadow>
        <cylinderGeometry args={[1.12, 1.12, 0.08, 36]} />
        <meshStandardMaterial color="#F5C86A" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* Floating Gift Box Group */}
      <group ref={giftGroup}>
        {/* Gift Base Container */}
        <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#17224D" roughness={0.35} metalness={0.15} />
        </mesh>

        {/* Golden Cross Ribbon on Box */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[0.2, 1.22, 1.22]} />
          <meshStandardMaterial color="#F5C86A" roughness={0.2} metalness={0.85} />
        </mesh>
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[1.22, 1.22, 0.2]} />
          <meshStandardMaterial color="#F5C86A" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Glowing Aura Mesh */}
        <mesh ref={glowMesh} position={[0, 1.4, 0]}>
          <boxGeometry args={[1.35, 1.35, 1.35]} />
          <meshBasicMaterial
            color="#F5C86A"
            transparent
            opacity={0.18}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Lid Group with Ribbon & Bow */}
        <group ref={lidGroup} position={[0, 2.0, 0]}>
          {/* Lid Box */}
          <mesh position={[0, 0.14, 0]} castShadow>
            <boxGeometry args={[1.36, 0.28, 1.36]} />
            <meshStandardMaterial color="#17224D" roughness={0.35} metalness={0.15} />
          </mesh>
          {/* Lid Ribbon */}
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[0.2, 0.3, 1.38]} />
            <meshStandardMaterial color="#F5C86A" roughness={0.2} metalness={0.85} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[1.38, 0.3, 0.2]} />
            <meshStandardMaterial color="#F5C86A" roughness={0.2} metalness={0.85} />
          </mesh>

          {/* Golden Bow on top */}
          <group position={[0, 0.35, 0]}>
            <mesh position={[-0.2, 0.1, 0]} rotation={[0, 0.8, 0]}>
              <torusGeometry args={[0.18, 0.065, 12, 24]} />
              <meshStandardMaterial color="#F5C86A" roughness={0.2} metalness={0.85} />
            </mesh>
            <mesh position={[0.2, 0.1, 0]} rotation={[0, -0.8, 0]}>
              <torusGeometry args={[0.18, 0.065, 12, 24]} />
              <meshStandardMaterial color="#F5C86A" roughness={0.2} metalness={0.85} />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#F5C86A" roughness={0.2} metalness={0.85} />
            </mesh>
          </group>
        </group>

        {/* Inner Warm Light that shines when revealed */}
        <pointLight
          ref={giftLight}
          position={[0, 1.6, 0]}
          color="#FFE2A8"
          intensity={0}
          distance={8}
          decay={2}
        />
      </group>
    </group>
  );
}
