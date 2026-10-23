"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function RoomEnvironment() {
  const framesGroup = useRef<THREE.Group>(null);
  const fairyLightsRef = useRef<(THREE.Mesh | null)[]>([]);

  // Procedural sunset window skyline texture
  const windowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Sunset gradient sky
    const grad = ctx.createLinearGradient(0, 0, 0, 600);
    grad.addColorStop(0, "#252744");
    grad.addColorStop(0.35, "#5B334B");
    grad.addColorStop(0.7, "#EBA75E");
    grad.addColorStop(1, "#F5C86A");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 600);

    // Distant soft stars in upper sky
    ctx.fillStyle = "#FAF0E1";
    for (let i = 0; i < 40; i++) {
      const sx = Math.random() * 512;
      const sy = Math.random() * 250;
      ctx.globalAlpha = Math.random() * 0.7 + 0.3;
      ctx.fillRect(sx, sy, 2, 2);
    }
    ctx.globalAlpha = 1.0;

    // Silhouette city skyline buildings
    ctx.fillStyle = "#10172D";
    const buildingWidths = [45, 55, 38, 62, 50, 42, 68, 52, 48, 60];
    let curX = 0;
    for (let i = 0; i < buildingWidths.length; i++) {
      const w = buildingWidths[i];
      const h = 120 + Math.sin(i * 1.5) * 80 + (i % 2 === 0 ? 50 : 20);
      ctx.fillRect(curX, 600 - h, w, h);

      // Building warm yellow window dots
      ctx.fillStyle = "#F5C86A";
      ctx.globalAlpha = 0.6;
      for (let r = 600 - h + 15; r < 580; r += 16) {
        for (let c = curX + 6; c < curX + w - 6; c += 10) {
          if (Math.random() > 0.4) {
            ctx.fillRect(c, r, 4, 6);
          }
        }
      }
      ctx.fillStyle = "#10172D";
      ctx.globalAlpha = 1.0;
      curX += w - 2;
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }, []);

  // Hanging fairy light positions along a curved rope
  const fairyPositions = useMemo(() => {
    const list: [number, number, number][] = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = -10 + t * 20;
      const sag = Math.sin(t * Math.PI) * 1.2;
      const y = 6.4 - sag;
      const z = -3.8;
      list.push([x, y, z]);
    }
    return list;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Subtle sway of floating picture frames
    if (framesGroup.current) {
      framesGroup.current.children.forEach((child, idx) => {
        child.position.y += Math.sin(time * 0.9 + idx * 1.2) * 0.0008;
      });
    }

    // Fairy lights soft pulse
    fairyLightsRef.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const scale = 0.85 + Math.sin(time * 2.5 + idx * 0.5) * 0.25;
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <group>
      {/* Back Wall */}
      <mesh position={[0, 4.5, -4.2]} receiveShadow>
        <planeGeometry args={[48, 14]} />
        <meshStandardMaterial color="#171D35" roughness={0.9} />
      </mesh>

      {/* Floor with rich midnight wood tone */}
      <mesh position={[0, -0.98, 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[48, 24]} />
        <meshStandardMaterial color="#10172D" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Wooden Desk Top */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.8, 0.16, 2.6]} />
        <meshStandardMaterial color="#5C3328" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Desk Legs */}
      {[
        [-2.7, -0.15, -1.1],
        [2.7, -0.15, -1.1],
        [-2.7, -0.15, 1.1],
        [2.7, -0.15, 1.1],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow receiveShadow>
          <boxGeometry args={[0.16, 1.6, 0.16]} />
          <meshStandardMaterial color="#3E2018" roughness={0.8} />
        </mesh>
      ))}

      {/* Desk Lamp */}
      <group position={[-2.4, 0.8, 0.3]}>
        {/* Lamp Base */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.35, 0.08, 24]} />
          <meshStandardMaterial color="#F5C86A" roughness={0.25} metalness={0.8} />
        </mesh>
        {/* Lamp Stem */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 1.25, 16]} />
          <meshStandardMaterial color="#F5C86A" roughness={0.25} metalness={0.8} />
        </mesh>
        {/* Warm Golden Cone Lampshade */}
        <mesh position={[0, 1.35, 0]} castShadow>
          <coneGeometry args={[0.45, 0.55, 24, 1, true]} />
          <meshStandardMaterial
            color="#EBA75E"
            emissive="#EBA75E"
            emissiveIntensity={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Lamp Warm Glow Light */}
        <pointLight
          position={[0, 1.15, 0]}
          color="#FFE2A8"
          intensity={1.8}
          distance={8}
          decay={2}
          castShadow
        />
      </group>

      {/* Sunset Window */}
      {windowTexture && (
        <group position={[-3.6, 3.4, -4.0]}>
          {/* Sky pane */}
          <mesh>
            <planeGeometry args={[3.2, 3.8]} />
            <meshBasicMaterial map={windowTexture} />
          </mesh>
          {/* Golden Window Frame Trim */}
          <mesh position={[0, 1.95, 0.05]}>
            <boxGeometry args={[3.4, 0.15, 0.12]} />
            <meshStandardMaterial color="#F5C86A" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, -1.95, 0.05]}>
            <boxGeometry args={[3.4, 0.15, 0.12]} />
            <meshStandardMaterial color="#F5C86A" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[-1.65, 0, 0.05]}>
            <boxGeometry args={[0.15, 3.9, 0.12]} />
            <meshStandardMaterial color="#F5C86A" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[1.65, 0, 0.05]}>
            <boxGeometry args={[0.15, 3.9, 0.12]} />
            <meshStandardMaterial color="#F5C86A" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Crossbars */}
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[0.08, 3.8, 0.08]} />
            <meshStandardMaterial color="#F5C86A" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.4, 0.04]}>
            <boxGeometry args={[3.2, 0.08, 0.08]} />
            <meshStandardMaterial color="#F5C86A" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* Wrapped Birthday Present on Desk */}
      <group position={[2.1, 1.12, 0.4]} rotation={[0, -0.2, 0]}>
        {/* Gift Box */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.65, 0.75]} />
          <meshStandardMaterial color="#8F5146" roughness={0.5} />
        </mesh>
        {/* Golden Ribbons */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.78, 0.67, 0.14]} />
          <meshStandardMaterial color="#F5C86A" roughness={0.25} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.14, 0.67, 0.78]} />
          <meshStandardMaterial color="#F5C86A" roughness={0.25} metalness={0.7} />
        </mesh>
      </group>

      {/* Stack of books on desk */}
      <group position={[-1.7, 0.92, -0.6]} rotation={[0, 0.15, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.9, 0.14, 0.65]} />
          <meshStandardMaterial color="#252744" roughness={0.8} />
        </mesh>
        <mesh position={[0.04, 0.14, -0.02]} rotation={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[0.82, 0.14, 0.58]} />
          <meshStandardMaterial color="#C8A8FF" roughness={0.6} />
        </mesh>
      </group>

      {/* Hanging Fairy Lights */}
      {fairyPositions.map((pos, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            fairyLightsRef.current[idx] = el;
          }}
          position={pos}
        >
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#F5C86A" : "#FFE09E"} />
        </mesh>
      ))}

      {/* Floating Picture Frames on Back Wall */}
      <group ref={framesGroup}>
        {[
          { pos: [1.8, 3.8, -3.9], rot: 0.05, label: "♡" },
          { pos: [3.4, 4.7, -3.9], rot: -0.04, label: "Bhaiya" },
          { pos: [-6.4, 3.6, -3.9], rot: 0.06, label: "Smile" },
          { pos: [-7.8, 4.8, -3.9], rot: -0.05, label: "Star" },
          { pos: [5.6, 3.2, -3.9], rot: -0.03, label: "Home" },
        ].map((frame, i) => (
          <group
            key={i}
            position={frame.pos as [number, number, number]}
            rotation={[0, 0, frame.rot]}
          >
            {/* Golden Frame Border */}
            <mesh castShadow>
              <boxGeometry args={[1.15, 1.45, 0.06]} />
              <meshStandardMaterial color="#F5C86A" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Inner Matte */}
            <mesh position={[0, 0, 0.04]}>
              <planeGeometry args={[0.95, 1.25]} />
              <meshBasicMaterial color="#252744" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
