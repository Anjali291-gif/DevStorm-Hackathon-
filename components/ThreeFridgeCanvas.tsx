'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Thermometer, Droplets } from 'lucide-react';

export const ThreeFridgeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [temp] = useState('3.2°C');
  const [humidity] = useState('68%');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 6.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight(0x528dff, 3.5, 30);
    primaryLight.position.set(4, 5, 5);
    scene.add(primaryLight);

    const secondaryLight = new THREE.PointLight(0xd0bcff, 2.5, 30);
    secondaryLight.position.set(-4, -2, 4);
    scene.add(secondaryLight);

    const cyanRimLight = new THREE.DirectionalLight(0x44d6fe, 2.0);
    cyanRimLight.position.set(0, 5, -4);
    scene.add(cyanRimLight);

    // Main Fridge Group
    const fridgeGroup = new THREE.Group();
    scene.add(fridgeGroup);

    // Fridge Outer Shell (Deep Obsidian Metallic Glass)
    const shellGeometry = new THREE.BoxGeometry(2.1, 3.6, 2.0);
    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111a2e,
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const fridgeShell = new THREE.Mesh(shellGeometry, shellMaterial);
    fridgeGroup.add(fridgeShell);

    // Fridge Interior Cavity Glow
    const interiorGeom = new THREE.BoxGeometry(1.9, 3.4, 1.8);
    const interiorMat = new THREE.MeshBasicMaterial({
      color: 0x528dff,
      transparent: true,
      opacity: 0.08,
    });
    const interior = new THREE.Mesh(interiorGeom, interiorMat);
    interior.position.z = 0.1;
    fridgeGroup.add(interior);

    // Interior Shelves (Glowing glass)
    const shelfGeom = new THREE.BoxGeometry(1.85, 0.04, 1.6);
    const shelfMat = new THREE.MeshPhysicalMaterial({
      color: 0x44d6fe,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
    });
    [-0.7, 0.1, 0.9].forEach((yPos) => {
      const shelf = new THREE.Mesh(shelfGeom, shelfMat);
      shelf.position.set(0, yPos, 0.1);
      fridgeGroup.add(shelf);
    });

    // Fridge Door (Semi-open glass door with edge highlights)
    const doorGeom = new THREE.BoxGeometry(2.1, 3.6, 0.08);
    const doorMat = new THREE.MeshPhysicalMaterial({
      color: 0x090e1b,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
    });
    const fridgeDoor = new THREE.Mesh(doorGeom, doorMat);
    fridgeDoor.position.set(0.15, 0, 1.05);
    fridgeDoor.rotation.y = 0.35; // slightly open
    fridgeGroup.add(fridgeDoor);

    // Door Glowing Digital Strip
    const stripGeom = new THREE.BoxGeometry(0.04, 2.8, 0.02);
    const stripMat = new THREE.MeshBasicMaterial({ color: 0x44d6fe });
    const strip = new THREE.Mesh(stripGeom, stripMat);
    strip.position.set(0.9, 0, 0.06);
    fridgeDoor.add(strip);

    // Door Handle (Cyan / Chrome cylinder)
    const handleGeom = new THREE.CylinderGeometry(0.035, 0.035, 1.6, 16);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xafc6ff,
      metalness: 0.9,
      roughness: 0.2,
    });
    const handle = new THREE.Mesh(handleGeom, handleMat);
    handle.position.set(0.92, 0, 0.14);
    fridgeDoor.add(handle);

    // Floating Food Objects
    const foodGroup = new THREE.Group();
    fridgeGroup.add(foodGroup);

    interface FloatingFood {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      speed: number;
      offset: number;
    }

    const floatingItems: FloatingFood[] = [];

    // Tomato
    const tomatoGeom = new THREE.SphereGeometry(0.2, 24, 24);
    const tomatoMat = new THREE.MeshStandardMaterial({
      color: 0xff3b30,
      roughness: 0.3,
      metalness: 0.1,
    });
    const tomato = new THREE.Mesh(tomatoGeom, tomatoMat);
    tomato.position.set(-0.6, 0.6, 1.5);
    foodGroup.add(tomato);
    floatingItems.push({ mesh: tomato, basePos: tomato.position.clone(), speed: 1.5, offset: 0 });

    // Orange / Citrus
    const orangeGeom = new THREE.SphereGeometry(0.18, 20, 20);
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xff9500,
      roughness: 0.5,
    });
    const orange = new THREE.Mesh(orangeGeom, orangeMat);
    orange.position.set(0.6, -0.4, 1.4);
    foodGroup.add(orange);
    floatingItems.push({ mesh: orange, basePos: orange.position.clone(), speed: 1.8, offset: 2 });

    // Fresh Leafy Greens (Icosahedron proxy with emerald glow)
    const leafGeom = new THREE.DodecahedronGeometry(0.16, 1);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x34c759,
      roughness: 0.4,
      emissive: 0x14532d,
      emissiveIntensity: 0.3,
    });
    const leaf = new THREE.Mesh(leafGeom, leafMat);
    leaf.position.set(-0.2, 1.1, 1.2);
    foodGroup.add(leaf);
    floatingItems.push({ mesh: leaf, basePos: leaf.position.clone(), speed: 1.2, offset: 4 });

    // Milk / Bottle Proxy
    const bottleGeom = new THREE.CylinderGeometry(0.1, 0.12, 0.45, 16);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
    const bottle = new THREE.Mesh(bottleGeom, bottleMat);
    bottle.position.set(0.4, 0.7, 0.4);
    foodGroup.add(bottle);
    floatingItems.push({ mesh: bottle, basePos: bottle.position.clone(), speed: 1.4, offset: 1.5 });

    // Holographic Energy Base Platform (Wireframe + Rings)
    const platformGeom = new THREE.CylinderGeometry(2.3, 2.5, 0.08, 36);
    const platformMat = new THREE.MeshBasicMaterial({
      color: 0x528dff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const platform = new THREE.Mesh(platformGeom, platformMat);
    platform.position.y = -2.3;
    fridgeGroup.add(platform);

    const ringGeom = new THREE.RingGeometry(2.2, 2.4, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x44d6fe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -2.32;
    fridgeGroup.add(ring);

    // Floating Holographic Sparkle Particles
    const particleCount = 45;
    const particleGeom = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 6;
      particlePos[i + 1] = (Math.random() - 0.5) * 5;
      particlePos[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x44d6fe,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // Mouse Interaction
    let targetRotationY = -0.2;
    let targetRotationX = 0.05;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.003;
        targetRotationX = Math.max(-0.2, Math.min(0.2, targetRotationX));
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = x * 0.5 - 0.2;
        targetRotationX = -y * 0.3 + 0.05;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotate towards target
      fridgeGroup.rotation.y += (targetRotationY - fridgeGroup.rotation.y) * 0.05;
      fridgeGroup.rotation.x += (targetRotationX - fridgeGroup.rotation.x) * 0.05;

      // Base bobbing
      fridgeGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      // Pulse holographic base
      platform.rotation.y += 0.005;
      ring.rotation.z += 0.003;
      platformMat.opacity = 0.2 + Math.sin(elapsedTime * 2) * 0.08;

      // Animate floating food pieces
      floatingItems.forEach((item) => {
        item.mesh.position.y =
          item.basePos.y + Math.sin(elapsedTime * item.speed + item.offset) * 0.08;
        item.mesh.rotation.x += 0.008;
        item.mesh.rotation.y += 0.012;
      });

      // Animate particle drift
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating UI HUD Elements */}
      <div className="absolute top-5 left-5 glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2.5 border border-primary/20 shadow-lg pointer-events-none">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
        </span>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-white font-semibold tracking-wider">
            FRIDGE STATUS: OPTIMAL
          </span>
          <span className="font-mono text-[9px] text-primary/80">12 ITEMS TRACKED</span>
        </div>
      </div>

      <div className="absolute top-5 right-5 glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2 border border-secondary/20 shadow-lg pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
        <span className="font-mono text-[10px] text-secondary font-medium tracking-wider">
          AI PREDICTIONS ACTIVE
        </span>
      </div>

      {/* Live Temperature & Humidity Badge */}
      <div className="absolute bottom-5 left-5 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-4 border border-white/10 shadow-xl pointer-events-none">
        <div className="flex items-center gap-1.5 text-tertiary">
          <Thermometer className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold text-white">{temp}</span>
        </div>
        <div className="w-[1px] h-4 bg-white/10" />
        <div className="flex items-center gap-1.5 text-primary">
          <Droplets className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold text-white">{humidity}</span>
        </div>
      </div>

      {/* Drag tip */}
      <div
        className={`absolute bottom-5 right-5 glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-40'
        }`}
      >
        <RotateCw className="w-3 h-3 text-on-surface-variant animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-mono text-[10px] text-on-surface-variant tracking-wider">
          DRAG TO ROTATE 3D VIEW
        </span>
      </div>
    </div>
  );
};
