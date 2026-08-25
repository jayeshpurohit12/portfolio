"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const WaveGrid3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Check for WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    let animationFrameId: number;
    let isVisible = true;
    let isDisposed = false;

    // Device profile detection
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        ("ontouchstart" in window && window.innerWidth < 1024));

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    camera.position.set(0, 80, 180);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(
      isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5),
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Dynamic grid resolution based on device capability
    const cols = isMobile ? 36 : 70;
    const rows = isMobile ? 22 : 40;
    const count = cols * rows;
    const spacing = isMobile ? 14 : 9;

    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const baseColor = new THREE.Color("#2e5bff");
    const accentColor = new THREE.Color("#38bdf8");

    let idx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * spacing;
        const z = (j - rows / 2) * spacing;
        const y = 0;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        originalPositions[idx * 3] = x;
        originalPositions[idx * 3 + 1] = y;
        originalPositions[idx * 3 + 2] = z;

        // Color gradient along depth
        const depthRatio = j / rows;
        const col = baseColor.clone().lerp(accentColor, depthRatio * 0.7);

        colors[idx * 3] = col.r;
        colors[idx * 3 + 1] = col.g;
        colors[idx * 3 + 2] = col.b;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Simple procedural circular particle
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(46, 91, 255, 0.8)");
        grad.addColorStop(0.8, "rgba(46, 91, 255, 0.15)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: isMobile ? 4.5 : 3.5,
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.6 : 0.75,
      map: createParticleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.x = -0.2;
    particles.position.y = -40;
    scene.add(particles);

    // Mouse Interaction
    let targetCameraX = 0;
    let targetCameraY = 80;

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetCameraX = mouseX * 20;
      targetCameraY = 80 - mouseY * 12;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    // Resize Handler
    const onResize = () => {
      if (isDisposed) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize, { passive: true });

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    // Animation Loop
    let time = 0;
    let frameSkip = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;

      time += 0.018;

      // On mobile, update positions every 2nd frame for 2x CPU efficiency
      frameSkip++;
      if (!isMobile || frameSkip % 2 === 0) {
        if (!isMobile) {
          camera.position.x += (targetCameraX - camera.position.x) * 0.05;
          camera.position.y += (targetCameraY - camera.position.y) * 0.05;
          camera.lookAt(0, -20, 0);
        }

        const posArr = geometry.attributes.position.array as Float32Array;
        let pIdx = 0;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = originalPositions[pIdx * 3];
            const z = originalPositions[pIdx * 3 + 2];

            const wave1 = Math.sin(x * 0.04 + time) * 8;
            const wave2 = Math.cos(z * 0.05 + time * 0.8) * 8;
            const ripple =
              Math.sin((x * x + z * z) * 0.0001 - time * 1.5) * 3.5;

            posArr[pIdx * 3 + 1] = wave1 + wave2 + ripple;
            pIdx++;
          }
        }
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      if (!isMobile) {
        window.removeEventListener("mousemove", onMouseMove);
      }
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
