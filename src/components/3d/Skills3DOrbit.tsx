"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Skills3DOrbit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let animationFrameId: number;
    let isVisible = true;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

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
    container.appendChild(renderer.domElement);

    // Central Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer 3D Wireframe Icosahedron
    const icosaGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icosaMat = new THREE.MeshBasicMaterial({
      color: 0x2e5bff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosaMesh = new THREE.Mesh(icosaGeo, icosaMat);
    coreGroup.add(icosaMesh);

    // Inner Glowing Core Sphere
    const innerGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1d3ba8,
      emissive: 0x2e5bff,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Orbiting Satellite Nodes (Core Skills)
    const skillsList = [
      { name: "React Native", color: "#38bdf8" },
      { name: "Swift", color: "#f97316" },
      { name: "Kotlin", color: "#a855f7" },
      { name: "TypeScript", color: "#3b82f6" },
      { name: "TurboModules", color: "#22c55e" },
      { name: "Hermes", color: "#eab308" },
    ];

    const createTextTexture = (text: string, color: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(10, 20, 36, 0.85)";
        ctx.beginPath();
        ctx.roundRect(0, 0, 256, 64, 12);
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 128, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const satellites: THREE.Mesh[] = [];
    const spriteGroup = new THREE.Group();
    scene.add(spriteGroup);

    skillsList.forEach((skill) => {
      // 3D Orb Node
      const nodeGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: skill.color,
        emissive: skill.color,
        emissiveIntensity: 0.6,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      satellites.push(node);
      scene.add(node);

      // Sprite Label
      const texture = createTextTexture(skill.name, skill.color);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.4, 0.35, 1);
      node.add(sprite);
      sprite.position.y = 0.45;
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 10);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x2e5bff, 3, 10);
    blueLight.position.set(-4, -3, -3);
    scene.add(blueLight);

    // Interactive Drag Rotation
    let targetRotY = 0;
    let targetRotX = 0;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / height - 0.5) * 2;
        targetRotY += nx * 0.02;
        targetRotX += ny * 0.02;
        return;
      }
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      targetRotY += dx * 0.01;
      targetRotX += dy * 0.01;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 320;
      const newH = container.clientHeight || 320;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      time += 0.02;

      // Rotate central core
      coreGroup.rotation.y += 0.006;
      coreGroup.rotation.x += 0.003;

      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.08;
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.08;

      // Animate Orbiting Skill Satellites
      satellites.forEach((sat, i) => {
        const angle = time * 0.7 + (i / skillsList.length) * Math.PI * 2;
        const radius = 3.2;
        const elevation = Math.sin(time + i * 1.5) * 1.1;

        sat.position.x = Math.cos(angle) * radius;
        sat.position.z = Math.sin(angle) * radius;
        sat.position.y = elevation;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div
        ref={containerRef}
        className="w-full h-full"
        title="Interactive 3D Skills Polyhedron - Drag to Rotate"
      />
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#121c2e]/90 border border-[#2e5bff]/40 font-mono text-[9px] text-[#b8c3ff] pointer-events-none backdrop-blur-sm">
        <span>✦ Drag 3D Matrix</span>
      </div>
    </div>
  );
};
