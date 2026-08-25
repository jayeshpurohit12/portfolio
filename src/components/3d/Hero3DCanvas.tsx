"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let animationFrameId: number;
    let isVisible = true;

    // Dimensions
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // Device capability detection
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        ("ontouchstart" in window && window.innerWidth < 1024));

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(
      isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5),
    );
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Dynamic Screen Canvas Texture
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 1024;
    const screenCtx = screenCanvas.getContext("2d");
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Draw Dynamic Screen Content
    let graphOffset = 0;
    const drawScreen = () => {
      if (!screenCtx) return;
      const ctx = screenCtx;

      // Dark futuristic UI background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
      bgGrad.addColorStop(0, "#081220");
      bgGrad.addColorStop(0.5, "#0b192e");
      bgGrad.addColorStop(1, "#050c18");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 512, 1024);

      // Status Bar
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px monospace";
      ctx.fillText("09:41", 36, 45);
      ctx.fillText("5G // 100%", 360, 45);

      // Dynamic Island / Camera Notch
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.roundRect(176, 20, 160, 36, 18);
      ctx.fill();
      ctx.strokeStyle = "#2e5bff40";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // App Header
      ctx.fillStyle = "#b8c3ff";
      ctx.font = "bold 24px monospace";
      ctx.fillText("> JAYESH_MOBILE_OS", 36, 110);
      ctx.fillStyle = "#2e5bff";
      ctx.font = "16px monospace";
      ctx.fillText("REACT NATIVE • ARCHITECTURE CORE", 36, 138);

      // Card 1: Performance Engine
      ctx.fillStyle = "rgba(18, 32, 58, 0.85)";
      ctx.beginPath();
      ctx.roundRect(36, 170, 440, 200, 16);
      ctx.fill();
      ctx.strokeStyle = "#2e5bff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#22c55e";
      ctx.font = "bold 16px monospace";
      ctx.fillText("● ENGINE STATE: 60 FPS FLUID", 60, 210);

      // Realtime Sine Wave Oscilloscope Graph
      ctx.beginPath();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 3;
      for (let x = 0; x <= 390; x += 5) {
        const y =
          290 +
          Math.sin((x + graphOffset) * 0.05) * 22 +
          Math.cos((x + graphOffset) * 0.02) * 12;
        if (x === 0) ctx.moveTo(60 + x, y);
        else ctx.lineTo(60 + x, y);
      }
      ctx.stroke();

      ctx.fillStyle = "#c4c5d9";
      ctx.font = "14px monospace";
      ctx.fillText("GPS Poll: 30% Batt Opt  |  RAM: 142 MB", 60, 345);

      // Card 2: Code Stream
      ctx.fillStyle = "rgba(13, 23, 40, 0.9)";
      ctx.beginPath();
      ctx.roundRect(36, 400, 440, 280, 16);
      ctx.fill();
      ctx.strokeStyle = "#434656";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#ffb4ab";
      ctx.font = "16px monospace";
      ctx.fillText("// Native Swift / Kotlin Bridge", 60, 440);

      ctx.fillStyle = "#d8e3fb";
      ctx.font = "15px monospace";
      ctx.fillText("const app = new MobileStack({", 60, 480);
      ctx.fillStyle = "#b8c3ff";
      ctx.fillText("  engine: 'TurboModules',", 80, 515);
      ctx.fillText("  runtime: 'Hermes v0.12',", 80, 550);
      ctx.fillText("  sync: '100% OfflineFirst'", 80, 585);
      ctx.fillStyle = "#d8e3fb";
      ctx.fillText("});", 60, 620);

      // Card 3: Metrics Bottom Banner
      ctx.fillStyle = "rgba(46, 91, 255, 0.15)";
      ctx.beginPath();
      ctx.roundRect(36, 710, 440, 130, 16);
      ctx.fill();
      ctx.strokeStyle = "#2e5bff80";
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 18px monospace";
      ctx.fillText("PRODUCTION DEPLOYMENTS", 60, 750);
      ctx.fillStyle = "#38bdf8";
      ctx.font = "14px monospace";
      ctx.fillText("iOS App Store  •  Google Play Store", 60, 785);
      ctx.fillStyle = "#22c55e";
      ctx.fillText("Status: Shipped to 100K+ Active Users", 60, 815);

      // Floating Glow Ring at bottom
      ctx.fillStyle = "#2e5bff";
      ctx.beginPath();
      ctx.arc(256, 930, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px monospace";
      ctx.textAlign = "center";
      ctx.fillText("RN", 256, 937);
      ctx.textAlign = "left";

      screenTexture.needsUpdate = true;
    };

    // 3D Phone Group
    const phoneGroup = new THREE.Group();
    phoneGroup.scale.set(0.72, 0.72, 0.72);
    scene.add(phoneGroup);

    // Phone Chassis Geometry & Materials
    const phoneWidth = 2.6;
    const phoneHeight = 5.2;
    const phoneDepth = 0.28;
    const phoneRadius = 0.25;

    // Body Shape with rounded corners
    const shape = new THREE.Shape();
    const x = -phoneWidth / 2;
    const y = -phoneHeight / 2;
    const w = phoneWidth;
    const h = phoneHeight;
    const r = phoneRadius;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings = {
      depth: phoneDepth,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const bodyGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    bodyGeometry.center();

    // Metallic Titanium Frame Material
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c1626,
      metalness: 0.85,
      roughness: 0.2,
    });

    const phoneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    phoneGroup.add(phoneBody);

    // Front Screen Mesh
    const screenGeometry = new THREE.PlaneGeometry(
      phoneWidth - 0.16,
      phoneHeight - 0.16,
    );
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = phoneDepth / 2 + 0.045;
    phoneGroup.add(screenMesh);

    // Front Glass Glare Mesh (Additive Blend)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const glassMesh = new THREE.Mesh(screenGeometry, glassMaterial);
    glassMesh.position.z = phoneDepth / 2 + 0.05;
    phoneGroup.add(glassMesh);

    // Triple Camera Bump (Back)
    const cameraIsland = new THREE.Group();
    cameraIsland.position.set(0.65, 1.8, -phoneDepth / 2 - 0.04);

    const bumpGeo = new THREE.BoxGeometry(0.9, 0.9, 0.08);
    const bumpMat = new THREE.MeshStandardMaterial({
      color: 0x070e1a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const bumpMesh = new THREE.Mesh(bumpGeo, bumpMat);
    cameraIsland.add(bumpMesh);

    const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16);
    lensGeo.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.95,
      roughness: 0.1,
    });

    const lens1 = new THREE.Mesh(lensGeo, lensMat);
    lens1.position.set(-0.22, 0.22, -0.04);
    cameraIsland.add(lens1);

    const lens2 = new THREE.Mesh(lensGeo, lensMat);
    lens2.position.set(-0.22, -0.22, -0.04);
    cameraIsland.add(lens2);

    const lens3 = new THREE.Mesh(lensGeo, lensMat);
    lens3.position.set(0.22, 0, -0.04);
    cameraIsland.add(lens3);

    phoneGroup.add(cameraIsland);

    // Orbiting 3D Hologram Rings
    const ringGeo = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2e5bff,
      transparent: true,
      opacity: 0.45,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo, ringMat);
    orbitRing1.rotation.x = Math.PI / 3;
    scene.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(ringGeo, ringMat);
    orbitRing2.rotation.x = -Math.PI / 4;
    orbitRing2.rotation.y = Math.PI / 6;
    orbitRing2.scale.set(1.15, 1.15, 1.15);
    scene.add(orbitRing2);

    // Floating 3D Satellites / Polyhedrons
    const polyGeo = new THREE.OctahedronGeometry(0.16, 0);
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x2e5bff,
      emissiveIntensity: 0.6,
      wireframe: true,
    });

    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const sat = new THREE.Mesh(polyGeo, polyMat);
      sat.position.set(
        Math.cos((i / 6) * Math.PI * 2) * 2.5,
        Math.sin((i / 6) * Math.PI * 2) * 1.6,
        Math.sin((i / 6) * Math.PI * 2) * 1.1,
      );
      satellites.push(sat);
      scene.add(sat);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    const blueFillLight = new THREE.DirectionalLight(0x2e5bff, 3.5);
    blueFillLight.position.set(-6, -4, 4);
    scene.add(blueFillLight);

    const rimLight = new THREE.PointLight(0xb8c3ff, 2, 10);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Mouse & Touch Tracking
    let targetRotX = 0.15;
    let targetRotY = -0.35;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / height - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        targetRotY = normX * 0.55;
        targetRotX = -normY * 0.35;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // Window Resize Handler
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 360;
      const newH = container.clientHeight || 480;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    // IntersectionObserver to suspend render loop when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    // Animation Loop
    let time = 0;
    let frameCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;

      time += 0.022;
      frameCount++;

      // Update 2D Canvas on Screen every 2nd frame for 2x CPU efficiency
      if (frameCount % 2 === 0) {
        graphOffset += 3.5;
        drawScreen();
      }

      // Damped 3D Rotation towards cursor target
      phoneGroup.rotation.y += (targetRotY - phoneGroup.rotation.y) * 0.07;
      phoneGroup.rotation.x += (targetRotX - phoneGroup.rotation.x) * 0.07;

      // Floating sine wave hovering
      phoneGroup.position.y = Math.sin(time * 1.5) * 0.12;

      // Rotate Orbit Rings
      orbitRing1.rotation.z += 0.005;
      orbitRing2.rotation.z -= 0.004;

      // Animate Satellites in 3D orbit
      satellites.forEach((sat, i) => {
        const angle = time * 0.6 + (i / 6) * Math.PI * 2;
        sat.position.x = Math.cos(angle) * (2.5 + Math.sin(time + i) * 0.15);
        sat.position.y = Math.sin(angle) * (1.6 + Math.cos(time + i) * 0.15);
        sat.position.z = Math.sin(angle * 1.2) * 1.0;
        sat.rotation.x += 0.03;
        sat.rotation.y += 0.04;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      screenGeometry.dispose();
      screenMaterial.dispose();
      glassMaterial.dispose();
      bumpGeo.dispose();
      bumpMat.dispose();
      lensGeo.dispose();
      lensMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      screenTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div
        ref={containerRef}
        className="w-full h-full"
        title="Interactive 3D Smartphone Device - Drag to Rotate"
      />
      {/* Interaction Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#121c2e]/80 border border-[#2e5bff]/40 font-mono text-[10px] text-[#b8c3ff] pointer-events-none backdrop-blur-sm shadow-md">
        <span>✦ Interactive 3D • Drag / Move to Tilt</span>
      </div>
    </div>
  );
};
