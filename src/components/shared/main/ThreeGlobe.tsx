"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Planet & Glow Setup ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Positions the planet at the bottom center to show only the top curved horizon
    globeGroup.position.set(0, -3.45, 0);

    const radius = 3.8;

    // 1. Planet Sphere
    const sphereGeometry = new THREE.SphereGeometry(radius, 64, 64);
    
    // Smooth blue-tinted material reacting to lights
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x050f2b,          // Deep dark space blue
      roughness: 0.8,
      metalness: 0.1,
      flatShading: false,
    });
    const planetMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(planetMesh);

    // 2. Custom Atmosphere Glow Shader (Fresnel effect)
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          // High intensity at the curved edges
          float intensity = pow(1.0 - dot(normal, viewDir), 2.2); 
          
          // Pure glowing light-blue/cyan color
          vec3 glowColor = vec3(0.17, 0.51, 0.98); 
          gl_FragColor = vec4(glowColor * intensity * 2.0, intensity * 0.95);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });

    const glowGeometry = new THREE.SphereGeometry(radius * 1.025, 64, 64);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    globeGroup.add(glowMesh);

    // 3. Floating Space Stars/Dust
    const starCount = 350;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Scatter stars in a box area around the horizon
      starPositions[i * 3] = (Math.random() - 0.5) * 15;     // X
      starPositions[i * 3 + 1] = (Math.random() - 0.2) * 8;  // Y (concentrated around top/sides)
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z

      // Varying bright blue and white colors
      const isWhite = Math.random() > 0.4;
      if (isWhite) {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 1.0;
        starColors[i * 3 + 2] = 1.0;
      } else {
        starColors[i * 3] = 0.4;
        starColors[i * 3 + 1] = 0.7;
        starColors[i * 3 + 2] = 1.0;
      }
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // --- Lighting ---
    // Ambient light representing faint deep space illumination
    const ambientLight = new THREE.AmbientLight(0x0a1535, 0.4);
    scene.add(ambientLight);

    // Strong directional light pointing from the top-front to illuminate the horizon
    const dirLight = new THREE.DirectionalLight(0x4ca3ff, 2.5);
    dirLight.position.set(0, 5, 2);
    scene.add(dirLight);

    // Subtle cyan point light in front to add a premium center glow
    const pointLight = new THREE.PointLight(0x2c82f5, 1.5, 10);
    pointLight.position.set(0, 1, 3);
    scene.add(pointLight);

    // --- Interaction & Motion ---
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

      targetX = x * 0.2;
      targetY = y * 0.15;
    };

    let scrollProgress = 0;
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // --- Resize handler ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let animationFrameId: number | null = null;
    let isIntersecting = false;

    const animate = () => {
      if (!isIntersecting) {
        animationFrameId = null;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse interaction lerping
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Slow rotation on the planet
      planetMesh.rotation.y += 0.0008;
      planetMesh.rotation.x = currentY * 0.5;
      planetMesh.rotation.z = currentX * 0.5;

      // Atmosphere moves with mouse slightly
      glowMesh.rotation.x = currentY * 0.4;
      glowMesh.rotation.z = currentX * 0.4;

      // Slowly rotate space stars
      starPoints.rotation.y += 0.0002;
      starPoints.rotation.x += 0.0001;

      // Pulse star sizes slightly
      const time = Date.now() * 0.001;
      starMaterial.size = 0.035 + Math.sin(time * 1.5) * 0.012;

      renderer.render(scene, camera);
    };

    // --- Intersection Observer (performance) ---
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasIntersecting = isIntersecting;
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !wasIntersecting) {
          if (animationFrameId === null) {
            animate();
          }
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // --- Cleanup ---
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Dispose ThreeJS resources properly
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[220px] sm:h-[260px] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab" />
      {/* Visual fading overlays to blend canvas perfectly into footer background */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#020205] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020205] pointer-events-none" />
    </div>
  );
}
