"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "./RoomEnvironment";
import { BirthdayCake } from "./BirthdayCake";
import { GiftReveal } from "./GiftReveal";
import { FloatingParticles } from "./FloatingParticles";

interface CameraRigProps {
  activeSection: string;
  isWishing: boolean;
  isGiftRevealed: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
}

function CameraRig({
  activeSection,
  isWishing,
  isGiftRevealed,
  isMobile,
  reducedMotion,
}: CameraRigProps) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const currentLookAt = useRef(new THREE.Vector3(0, 1.4, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Predefined camera targets [x, y, z] and lookAt [x, y, z]
  const shotConfig: Record<string, { pos: [number, number, number]; look: [number, number, number] }> = {
    welcome: { pos: [0, 2.6, 9.0], look: [0, 1.2, 0] },
    hero: { pos: [-0.6, 2.3, 6.4], look: [-1.4, 1.4, 0] },
    wishing: { pos: [0, 2.2, 3.8], look: [0, 1.6, 0] },
    memories: { pos: [0, 2.7, 8.5], look: [0, 2.2, 0] },
    letter: { pos: [-3.0, 2.2, 7.8], look: [-2.8, 1.8, 0] },
    special: { pos: [3.0, 2.2, 7.8], look: [2.8, 1.8, 0] },
    surprise: { pos: [7.0, 2.5, 6.2], look: [7.0, 2.0, 0] },
    giftOpen: { pos: [7.0, 2.6, 4.2], look: [7.0, 2.2, 0] },
    finale: { pos: [0, 2.3, 6.8], look: [0, 1.5, 0] },
  };

  useFrame((state, delta) => {
    let key = activeSection;
    if (isGiftRevealed) key = "giftOpen";
    else if (isWishing) key = "wishing";

    const config = shotConfig[key] || shotConfig.hero;
    const targetPos = new THREE.Vector3(...config.pos);
    const targetLook = new THREE.Vector3(...config.look);

    // Adjust distance on mobile portrait screens
    if (isMobile) {
      targetPos.z += 3.2;
      targetPos.y += 0.4;
      if (key === "hero") {
        targetPos.x = 0;
        targetLook.x = 0;
        targetLook.y = 2.1;
      }
    }

    // Parallax mouse sway (disabled if reduced motion)
    if (!reducedMotion) {
      targetPos.x += mouse.current.x * 0.35;
      targetPos.y += mouse.current.y * 0.2;
    }

    const lerpSpeed = reducedMotion ? 1 : Math.min(1, delta * 3.5);
    camera.position.lerp(targetPos, lerpSpeed);
    currentLookAt.current.lerp(targetLook, lerpSpeed);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

interface BirthdaySceneProps {
  activeSection: string;
  litStates: boolean[];
  isWishing: boolean;
  isGiftRevealed: boolean;
  revealProgress: number;
  isMobile: boolean;
  reducedMotion: boolean;
}

export function BirthdayScene({
  activeSection,
  litStates,
  isWishing,
  isGiftRevealed,
  revealProgress,
  isMobile,
  reducedMotion,
}: BirthdaySceneProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 2.6, 9.0], fov: 45, near: 0.1, far: 50 }}
        shadows={!isMobile}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#10172D"]} />
        <fog attach="fog" args={["#10172D", 14, 32]} />

        {/* Ambient & Atmosphere Lights */}
        <ambientLight intensity={isWishing ? 0.32 : 0.55} color="#8FA0D8" />
        <hemisphereLight
          args={["#C8A8FF", "#252744", isWishing ? 0.25 : 0.4]}
        />

        {/* Dynamic Key Spotlight */}
        <spotLight
          position={[-2.4, 3.8, 2.2]}
          target-position={[0, 1.2, 0]}
          intensity={0.9}
          color="#FFE2A8"
          angle={0.7}
          penumbra={0.6}
          castShadow={!isMobile}
        />

        {/* Camera Transition Controller */}
        <CameraRig
          activeSection={activeSection}
          isWishing={isWishing}
          isGiftRevealed={isGiftRevealed}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

        {/* 3D Scene Elements */}
        <RoomEnvironment />
        <BirthdayCake litStates={litStates} isWishing={isWishing} />
        <GiftReveal
          isRevealed={isGiftRevealed}
          revealProgress={revealProgress}
        />
        <FloatingParticles count={isMobile ? 55 : 120} />
      </Canvas>
    </div>
  );
}
