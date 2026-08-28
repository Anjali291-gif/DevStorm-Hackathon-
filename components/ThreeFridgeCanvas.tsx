'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Thermometer, Droplets, Maximize2, RotateCcw, Play, Pause, Eye } from 'lucide-react';

export const ThreeFridgeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [temp] = useState('3.8°C');
  const [humidity] = useState('62%');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [doorOpen, setDoorOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // References to communicate with the Three.js loop
  const autoRotateRef = useRef(true);
  const doorOpenRef = useRef(true);
  const resetTriggerRef = useRef(0);
  const zoomActionRef = useRef<number | null>(null);

  const toggleAutoRotate = () => {
    autoRotateRef.current = !autoRotateRef.current;
    setIsAutoRotating(autoRotateRef.current);
  };

  const toggleDoor = () => {
    doorOpenRef.current = !doorOpenRef.current;
    setDoorOpen(doorOpenRef.current);
  };

  const resetOrientation = () => {
    resetTriggerRef.current += 1;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || 550;
    let height = container.clientHeight || 580;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.5);

    // 2. High Quality WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Dynamic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x528dff, 3.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x44d6fe, 2.5);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xd0bcff, 2.0, 25);
    fillLight.position.set(0, -4, 5);
    scene.add(fillLight);

    // 4. Master 3D Root Group (allows full 360 degree rotation in ALL axes)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Texture Loader for the smart fridge image
    const textureLoader = new THREE.TextureLoader();
    const fridgeTexture = textureLoader.load('/smart-fridge.jpg');
    fridgeTexture.colorSpace = THREE.SRGBColorSpace;

    // 5. Main Fridge Body (Outer Chassis)
    const bodyGeom = new THREE.BoxGeometry(2.4, 4.0, 2.2);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c1222,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
    });
    const fridgeBody = new THREE.Mesh(bodyGeom, bodyMat);
    masterGroup.add(fridgeBody);

    // Fridge Interior Backboard with Texture Image
    const backboardGeom = new THREE.PlaneGeometry(2.1, 3.7);
    const backboardMat = new THREE.MeshBasicMaterial({
      map: fridgeTexture,
      toneMapped: true,
    });
    const backboard = new THREE.Mesh(backboardGeom, backboardMat);
    backboard.position.set(0, 0, -0.98);
    masterGroup.add(backboard);

    // Glowing Neon Interior Cavity Edges
    const innerLight = new THREE.PointLight(0x44d6fe, 2.8, 4.5);
    innerLight.position.set(0, 0.5, 0.2);
    masterGroup.add(innerLight);

    // 6. Shelves (Transparent Crystal Glass with Cyan edge glow)
    const shelfGeom = new THREE.BoxGeometry(2.15, 0.05, 1.8);
    const shelfMat = new THREE.MeshPhysicalMaterial({
      color: 0x44d6fe,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.5,
    });

    [-0.9, -0.1, 0.8, 1.5].forEach((yPos) => {
      const shelf = new THREE.Mesh(shelfGeom, shelfMat);
      shelf.position.set(0, yPos, 0.05);
      masterGroup.add(shelf);

      // Shelf front glowing LED strip
      const ledGeom = new THREE.BoxGeometry(2.15, 0.02, 0.03);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x44d6fe });
      const led = new THREE.Mesh(ledGeom, ledMat);
      led.position.set(0, yPos - 0.015, 0.96);
      masterGroup.add(led);
    });

    // 7. Interactive 3D Hinged Door
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-1.2, 0, 1.1); // Hinge on the left edge
    masterGroup.add(doorPivot);

    const doorMeshGeom = new THREE.BoxGeometry(2.4, 4.0, 0.1);
    const doorMeshMat = new THREE.MeshPhysicalMaterial({
      color: 0x090e1b,
      transparent: true,
      opacity: 0.45,
      roughness: 0.08,
      metalness: 0.95,
      clearcoat: 1.0,
      transmission: 0.4,
    });
    const doorMesh = new THREE.Mesh(doorMeshGeom, doorMeshMat);
    doorMesh.position.set(1.2, 0, 0); // offset from pivot
    doorPivot.add(doorMesh);

    // Door Frame Outline (Cyan Glowing Trim)
    const doorTrimGeom = new THREE.BoxGeometry(0.04, 3.9, 0.02);
    const doorTrimMat = new THREE.MeshBasicMaterial({ color: 0x44d6fe });
    const rightTrim = new THREE.Mesh(doorTrimGeom, doorTrimMat);
    rightTrim.position.set(2.36, 0, 0.06);
    doorPivot.add(rightTrim);

    // Door Handle (Chrome Sleek Bar)
    const handleGeom = new THREE.CylinderGeometry(0.04, 0.04, 2.2, 16);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xafc6ff,
      metalness: 0.95,
      roughness: 0.1,
    });
    const handle = new THREE.Mesh(handleGeom, handleMat);
    handle.position.set(2.28, 0, 0.18);
    doorPivot.add(handle);

    // 8. 3D Floating Interactive Groceries & Ingredients
    const foodGroup = new THREE.Group();
    masterGroup.add(foodGroup);

    interface FloatingItem {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      speed: number;
      offset: number;
      rotSpeed: number;
    }
    const floatingItems: FloatingItem[] = [];

    // Fresh Apple / Tomato
    const appleGeom = new THREE.SphereGeometry(0.22, 24, 24);
    const appleMat = new THREE.MeshStandardMaterial({
      color: 0xff3b30,
      roughness: 0.25,
      metalness: 0.1,
    });
    const apple = new THREE.Mesh(appleGeom, appleMat);
    apple.position.set(-0.55, 0.35, 1.4);
    foodGroup.add(apple);
    floatingItems.push({ mesh: apple, basePos: apple.position.clone(), speed: 1.6, offset: 0, rotSpeed: 0.01 });

    // Fresh Orange
    const orangeGeom = new THREE.SphereGeometry(0.2, 20, 20);
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xff9500,
      roughness: 0.45,
      metalness: 0.05,
    });
    const orange = new THREE.Mesh(orangeGeom, orangeMat);
    orange.position.set(0.65, -0.45, 1.35);
    foodGroup.add(orange);
    floatingItems.push({ mesh: orange, basePos: orange.position.clone(), speed: 2.0, offset: 2.1, rotSpeed: 0.015 });

    // Emerald Crisp Leaf / Avocado
    const leafGeom = new THREE.DodecahedronGeometry(0.2, 1);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x34c759,
      roughness: 0.35,
      emissive: 0x14532d,
      emissiveIntensity: 0.4,
    });
    const leaf = new THREE.Mesh(leafGeom, leafMat);
    leaf.position.set(-0.35, 1.1, 1.15);
    foodGroup.add(leaf);
    floatingItems.push({ mesh: leaf, basePos: leaf.position.clone(), speed: 1.4, offset: 4.2, rotSpeed: 0.008 });

    // Glass Milk / Beverage Bottle
    const bottleGeom = new THREE.CylinderGeometry(0.12, 0.14, 0.55, 18);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
      transmission: 0.5,
    });
    const bottle = new THREE.Mesh(bottleGeom, bottleMat);
    bottle.position.set(0.45, 0.95, 0.4);
    foodGroup.add(bottle);
    floatingItems.push({ mesh: bottle, basePos: bottle.position.clone(), speed: 1.5, offset: 1.2, rotSpeed: 0.005 });

    // 9. Futuristic Holographic Pedestal Base
    const platformGeom = new THREE.CylinderGeometry(2.6, 2.9, 0.1, 48);
    const platformMat = new THREE.MeshBasicMaterial({
      color: 0x528dff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const platform = new THREE.Mesh(platformGeom, platformMat);
    platform.position.y = -2.45;
    masterGroup.add(platform);

    const ringGeom = new THREE.RingGeometry(2.5, 2.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x44d6fe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -2.48;
    masterGroup.add(ring);

    // 10. Floating Holographic Cyber Particles
    const particleCount = 65;
    const particleGeom = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 6;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x44d6fe,
      size: 0.055,
      transparent: true,
      opacity: 0.65,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // 11. Complete 3D Spherical & Trackball Rotation Physics (ALL DIRECTIONS)
    let rotX = 0.08;
    let rotY = -0.35;
    let targetRotX = 0.08;
    let targetRotY = -0.35;
    let velX = 0;
    let velY = 0;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let currentDoorAngle = Math.PI * 0.45;

    // Mouse & Touch interaction handlers
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
      autoRotateRef.current = false;
      setIsAutoRotating(false);
      velX = 0;
      velY = 0;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;

      // Full 360 degree rotation in horizontal and vertical axes
      velY = dx * 0.007;
      velX = dy * 0.007;

      targetRotY += velY;
      targetRotX += velX;

      // Vertical rotation clamping to prevent complete inversion while allowing generous angles
      targetRotX = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, targetRotX));

      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // Safe catch
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.003;
      camera.position.z = Math.max(4.5, Math.min(11, camera.position.z + zoomDelta));
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // 12. Render Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Check reset trigger
      if (resetTriggerRef.current > 0) {
        targetRotX = 0.08;
        targetRotY = -0.35;
        camera.position.z = 7.5;
        resetTriggerRef.current = 0;
      }

      // Auto rotation when enabled and not dragging
      if (autoRotateRef.current && !isDragging) {
        targetRotY += 0.005;
      }

      // Inertia damping when released
      if (!isDragging) {
        velX *= 0.92;
        velY *= 0.92;
        targetRotX += velX;
        targetRotY += velY;
        targetRotX = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, targetRotX));
      }

      // Smooth interpolation for rotation
      rotX += (targetRotX - rotX) * 0.1;
      rotY += (targetRotY - rotY) * 0.1;

      masterGroup.rotation.x = rotX;
      masterGroup.rotation.y = rotY;

      // Gentle floating bob
      masterGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.1;

      // Animate Door Opening / Closing
      const targetDoorAngle = doorOpenRef.current ? Math.PI * 0.42 : 0;
      currentDoorAngle += (targetDoorAngle - currentDoorAngle) * 0.08;
      doorPivot.rotation.y = -currentDoorAngle;

      // Animate base rings and particles
      platform.rotation.y += 0.006;
      ring.rotation.z += 0.004;
      particleSystem.rotation.y = elapsedTime * 0.04;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      // Animate floating food objects
      floatingItems.forEach((item) => {
        item.mesh.position.y =
          item.basePos.y + Math.sin(elapsedTime * item.speed + item.offset) * 0.09;
        item.mesh.rotation.x += item.rotSpeed;
        item.mesh.rotation.y += item.rotSpeed * 1.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 13. Dynamic Resize Handler
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
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none rounded-3xl overflow-hidden glass-panel border border-tertiary/30 shadow-[0_0_50px_rgba(68,214,254,0.12)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Mount */}
      <div ref={containerRef} className="w-full h-full touch-none" />

      {/* Top Left HUD: Status */}
      <div className="absolute top-4 left-4 glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2.5 border border-tertiary/30 shadow-lg pointer-events-none backdrop-blur-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
        </span>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-white font-bold tracking-wider uppercase">
            3D SMART FRIDGE
          </span>
          <span className="font-mono text-[9px] text-tertiary/90 font-medium">REAL-TIME TELEMETRY</span>
        </div>
      </div>

      {/* Top Right HUD: AI Ready */}
      <div className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-2xl flex items-center gap-2 border border-primary/30 shadow-lg pointer-events-none backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
        <span className="font-mono text-[10px] text-primary font-medium tracking-wider">
          LIVE SENSORS
        </span>
      </div>

      {/* Interactive 3D Controls Toolbar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto gap-2">
        {/* Left: Temperature & Humidity Live Readouts */}
        <div className="flex items-center gap-2.5 glass-panel px-3.5 py-2 rounded-2xl border border-white/15 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-1.5 text-tertiary">
            <Thermometer className="w-3.5 h-3.5" />
            <span className="font-mono text-xs font-semibold text-white">{temp}</span>
          </div>
          <div className="w-[1px] h-3.5 bg-white/20" />
          <div className="flex items-center gap-1.5 text-primary">
            <Droplets className="w-3.5 h-3.5" />
            <span className="font-mono text-xs font-semibold text-white">{humidity}</span>
          </div>
        </div>

        {/* Right: 3D Interactive Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Toggle Door */}
          <button
            onClick={toggleDoor}
            title={doorOpen ? 'Close Fridge Door' : 'Open Fridge Door'}
            className="glass-panel p-2.5 rounded-xl border border-white/20 hover:border-tertiary/50 hover:bg-tertiary/15 transition-all text-white active:scale-95 flex items-center gap-1.5 backdrop-blur-md"
          >
            <Eye className="w-3.5 h-3.5 text-tertiary" />
            <span className="font-mono text-[10px] hidden sm:inline font-medium">
              {doorOpen ? 'CLOSE DOOR' : 'OPEN DOOR'}
            </span>
          </button>

          {/* Toggle Auto-Rotate */}
          <button
            onClick={toggleAutoRotate}
            title={isAutoRotating ? 'Pause 360° Spin' : 'Resume 360° Spin'}
            className={`glass-panel p-2.5 rounded-xl border transition-all active:scale-95 flex items-center gap-1.5 backdrop-blur-md ${
              isAutoRotating ? 'border-tertiary/60 bg-tertiary/15 text-tertiary' : 'border-white/20 text-white/80'
            }`}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="font-mono text-[10px] hidden sm:inline font-medium">
              {isAutoRotating ? 'SPINNING' : 'SPIN'}
            </span>
          </button>

          {/* Reset Orientation */}
          <button
            onClick={resetOrientation}
            title="Reset 3D Orientation"
            className="glass-panel p-2.5 rounded-xl border border-white/20 hover:border-tertiary/50 hover:bg-tertiary/15 transition-all text-white active:scale-95 backdrop-blur-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-white/90" />
          </button>
        </div>
      </div>

      {/* Drag & Rotation Hint Badge */}
      <div
        className={`absolute bottom-16 left-1/2 -translate-x-1/2 glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-tertiary/40 backdrop-blur-md pointer-events-none transition-opacity duration-300 shadow-[0_0_20px_rgba(68,214,254,0.2)] ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}
      >
        <RotateCw className="w-3 h-3 text-tertiary animate-spin" style={{ animationDuration: '4s' }} />
        <span className="font-mono text-[10px] text-white tracking-widest uppercase font-semibold">
          DRAG IN ALL DIRECTIONS (360° 3D)
        </span>
      </div>
    </div>
  );
};
