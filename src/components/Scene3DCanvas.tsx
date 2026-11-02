import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { ProfileData } from '../types/portfolio';

interface Scene3DCanvasProps {
  profile: ProfileData;
  scrollProgress: number;
  scrollVelocity: number;
  interactiveMode?: boolean;
}

export const Scene3DCanvas: React.FC<Scene3DCanvasProps> = ({
  profile,
  scrollProgress,
  scrollVelocity,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [modelLoadError, setModelLoadError] = useState<string | null>(null);

  const profileRef = useRef<ProfileData>(profile);
  const scrollRef = useRef<number>(scrollProgress);
  const velocityRef = useRef<number>(scrollVelocity);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    velocityRef.current = scrollVelocity;
  }, [scrollVelocity]);

  const sceneObjectsRef = useRef<{
    scene: THREE.Scene;
    rootGroup: THREE.Group;
    presetGroup: THREE.Group;
    customModelGroup: THREE.Group;
    portraitGroup: THREE.Group;
    portraitMesh: THREE.Mesh | null;
    portraitFrameMesh: THREE.Mesh | null;
    rebuildPreset: () => void;
    updatePortraitTexture: (
      url: string,
      frameStyle: ProfileData['portraitFrameStyle'],
      scale: number
    ) => void;
    loadCustomGlb: (url: string | null) => void;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.052);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Monochrome White & Silver Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const whiteKeyLight = new THREE.PointLight(0xffffff, 22, 28, 1.5);
    whiteKeyLight.position.set(4.5, 4.0, 5.0);
    scene.add(whiteKeyLight);

    const silverFillLight = new THREE.PointLight(0xa1a1aa, 14, 25, 1.5);
    silverFillLight.position.set(-4.5, -2.5, 4.0);
    scene.add(silverFillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.2);
    rimLight.position.set(0, 6, 5);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const presetGroup = new THREE.Group();
    rootGroup.add(presetGroup);

    const customModelGroup = new THREE.Group();
    rootGroup.add(customModelGroup);

    const portraitGroup = new THREE.Group();
    rootGroup.add(portraitGroup);

    // Pure White & Silver Deep-Space Starfield
    const particleCount = 1100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cWhite = new THREE.Color(0xffffff);
    const cSilver = new THREE.Color(0xa1a1aa);
    const cZinc = new THREE.Color(0x52525b);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 6 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * 28;
      positions[i3 + 2] = (Math.random() - 0.5) * 22 - 4;

      const pick = Math.random();
      const c = pick < 0.4 ? cWhite : pick < 0.8 ? cSilver : cZinc;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Subtle White Spaceship Horizon Grid
    const gridHelper = new THREE.GridHelper(36, 36, 0x52525b, 0x18181b);
    gridHelper.position.y = -4.4;
    const gridMat = gridHelper.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.2;
    scene.add(gridHelper);

    let portraitMesh: THREE.Mesh | null = null;
    let portraitFrameMesh: THREE.Mesh | null = null;
    const textureLoader = new THREE.TextureLoader();

    const buildPortraitCard = () => {
      while (portraitGroup.children.length > 0) {
        portraitGroup.remove(portraitGroup.children[0]);
      }

      const cardWidth = 1.95;
      const cardHeight = 2.45;

      const planeGeo = new THREE.PlaneGeometry(cardWidth, cardHeight, 16, 16);
      const planeMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.25,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });

      portraitMesh = new THREE.Mesh(planeGeo, planeMat);
      portraitGroup.add(portraitMesh);

      const backGeo = new THREE.BoxGeometry(cardWidth + 0.12, cardHeight + 0.12, 0.07);
      const backMat = new THREE.MeshStandardMaterial({
        color: 0x09090b,
        metalness: 0.85,
        roughness: 0.2,
      });
      portraitFrameMesh = new THREE.Mesh(backGeo, backMat);
      portraitFrameMesh.position.z = -0.04;
      portraitGroup.add(portraitFrameMesh);

      const borderGeo = new THREE.EdgesGeometry(
        new THREE.BoxGeometry(cardWidth + 0.18, cardHeight + 0.18, 0.1)
      );
      const borderMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.65,
      });
      const borderLines = new THREE.LineSegments(borderGeo, borderMat);
      borderLines.position.z = -0.02;
      portraitGroup.add(borderLines);
    };

    buildPortraitCard();

    const updatePortraitTexture = (
      url: string,
      _frameStyle: ProfileData['portraitFrameStyle'],
      scale: number
    ) => {
      if (!portraitMesh) return;
      textureLoader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          const mat = portraitMesh!.material as THREE.MeshStandardMaterial;
          mat.map = tex;
          mat.needsUpdate = true;
        },
        undefined,
        () => {}
      );
      portraitGroup.scale.setScalar(scale || 1);
    };

    const rebuildPreset = () => {
      while (presetGroup.children.length > 0) {
        presetGroup.remove(presetGroup.children[0]);
      }

      const currentProfile = profileRef.current;
      const preset = currentProfile.active3DPreset;
      const wf = currentProfile.wireframeMode;

      if (preset === 'custom-glb' && currentProfile.customModelUrl) {
        return;
      }

      const chromeMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        metalness: 0.92,
        roughness: 0.14,
        wireframe: wf,
      });

      const whiteGlowMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.35,
        metalness: 0.85,
        roughness: 0.18,
        wireframe: wf,
      });

      const silverWireMat = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        emissive: 0x71717a,
        emissiveIntensity: 0.25,
        metalness: 0.7,
        roughness: 0.25,
        wireframe: true,
      });

      if (preset === 'gyro-core' || preset === 'custom-glb') {
        const ring1 = new THREE.Mesh(
          new THREE.TorusGeometry(2.15, 0.038, 24, 120),
          whiteGlowMat
        );
        ring1.name = 'gyro_ring_1';
        presetGroup.add(ring1);

        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.03, 20, 100), chromeMat);
        ring2.rotation.x = Math.PI / 3;
        ring2.name = 'gyro_ring_2';
        presetGroup.add(ring2);

        const cage = new THREE.Mesh(new THREE.IcosahedronGeometry(2.45, 1), silverWireMat);
        cage.name = 'gyro_cage';
        presetGroup.add(cage);
      } else if (preset === 'liquid-knot') {
        const knotGeo = new THREE.TorusKnotGeometry(1.42, 0.34, 200, 32, 2, 3);
        const knotMesh = new THREE.Mesh(knotGeo, chromeMat);
        knotMesh.name = 'main_sculpture';
        presetGroup.add(knotMesh);

        const wireKnot = new THREE.Mesh(
          new THREE.TorusKnotGeometry(1.46, 0.35, 120, 16, 2, 3),
          silverWireMat
        );
        wireKnot.name = 'wire_sculpture';
        presetGroup.add(wireKnot);
      } else if (preset === 'quantum-icosa') {
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 0), chromeMat);
        core.name = 'main_sculpture';
        presetGroup.add(core);

        const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.85, 1), silverWireMat);
        shell.name = 'wire_sculpture';
        presetGroup.add(shell);
      } else if (preset === 'dna-helix') {
        const helixGroup = new THREE.Group();
        helixGroup.name = 'main_sculpture';
        const rungs = 24;
        for (let i = 0; i < rungs; i++) {
          const t = (i / rungs) * Math.PI * 4;
          const y = (i - rungs / 2) * 0.18;
          const r = 1.25;

          const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), whiteGlowMat);
          s1.position.set(Math.cos(t) * r, y, Math.sin(t) * r);
          helixGroup.add(s1);

          const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), silverWireMat);
          s2.position.set(Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r);
          helixGroup.add(s2);
        }
        presetGroup.add(helixGroup);
      } else if (preset === 'cyber-portal') {
        const portalGroup = new THREE.Group();
        portalGroup.name = 'main_sculpture';
        for (let i = 0; i < 6; i++) {
          const ringGeo = new THREE.RingGeometry(0.8 + i * 0.25, 0.84 + i * 0.25, 6);
          const mat = i % 2 === 0 ? whiteGlowMat : silverWireMat;
          const mesh = new THREE.Mesh(ringGeo, mat);
          mesh.position.z = (i - 3) * 0.28;
          portalGroup.add(mesh);
        }
        presetGroup.add(portalGroup);
      }
    };

    const gltfLoader = new GLTFLoader();
    const loadCustomGlb = (url: string | null) => {
      while (customModelGroup.children.length > 0) {
        customModelGroup.remove(customModelGroup.children[0]);
      }
      if (!url) {
        setModelLoadError(null);
        return;
      }

      gltfLoader.load(
        url,
        (gltf) => {
          setModelLoadError(null);
          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const scale = 2.6 / maxDim;

          model.position.sub(center);
          const wrapper = new THREE.Group();
          wrapper.add(model);
          wrapper.scale.setScalar(scale);

          customModelGroup.add(wrapper);
        },
        undefined,
        () => {
          setModelLoadError('Could not parse 3D file. Ensure valid .glb or .gltf format.');
        }
      );
    };

    rebuildPreset();
    updatePortraitTexture(
      profileRef.current.portraitUrl,
      profileRef.current.portraitFrameStyle,
      profileRef.current.portraitScale
    );
    if (profileRef.current.customModelUrl) {
      loadCustomGlb(profileRef.current.customModelUrl);
    }

    sceneObjectsRef.current = {
      scene,
      rootGroup,
      presetGroup,
      customModelGroup,
      portraitGroup,
      portraitMesh,
      portraitFrameMesh,
      rebuildPreset,
      updatePortraitTexture,
      loadCustomGlb,
    };

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let reqId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const scroll = scrollRef.current;
      const speedMult = profileRef.current.autoRotateSpeed ?? 1.0;

      // In Hero (scroll < 0.14), the live Spline 3D Android card is foregrounded, so keep background sculpture deep & subtle
      let targetZ = -3.8;
      let targetX = 0;
      if (scroll >= 0.14 && scroll < 0.36) {
        targetZ = -1.2;
        targetX = window.innerWidth >= 1024 ? 2.2 : 0;
      } else if (scroll >= 0.36) {
        targetZ = -3.6;
        targetX = 0;
      }

      rootGroup.position.x = THREE.MathUtils.lerp(rootGroup.position.x, targetX, 0.05);
      rootGroup.position.z = THREE.MathUtils.lerp(rootGroup.position.z, targetZ, 0.05);
      rootGroup.position.y = Math.sin(elapsed * 1.2) * 0.1;

      presetGroup.rotation.y += 0.0045 * speedMult;
      presetGroup.rotation.x = THREE.MathUtils.lerp(
        presetGroup.rotation.x,
        mouseY * 0.2 + scroll * Math.PI,
        0.05
      );

      const r1 = presetGroup.getObjectByName('gyro_ring_1');
      if (r1) r1.rotation.x += 0.008 * speedMult;
      const r2 = presetGroup.getObjectByName('gyro_ring_2');
      if (r2) r2.rotation.z -= 0.01 * speedMult;

      customModelGroup.rotation.y = elapsed * 0.45 * speedMult + mouseX * 0.35;

      portraitGroup.visible =
        scroll >= 0.12 &&
        scroll < 0.36 &&
        profileRef.current.active3DPreset === 'gyro-core';
      portraitGroup.rotation.y = THREE.MathUtils.lerp(
        portraitGroup.rotation.y,
        mouseX * 0.25,
        0.06
      );

      particleSystem.rotation.y = elapsed * 0.018 + scroll * 0.8;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.3, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2 + mouseY * 0.2, 0.04);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const ctx = sceneObjectsRef.current;
    if (!ctx) return;
    ctx.rebuildPreset();
  }, [profile.active3DPreset, profile.wireframeMode]);

  useEffect(() => {
    const ctx = sceneObjectsRef.current;
    if (!ctx) return;
    ctx.updatePortraitTexture(
      profile.portraitUrl,
      profile.portraitFrameStyle,
      profile.portraitScale
    );
  }, [profile.portraitUrl, profile.portraitFrameStyle, profile.portraitScale]);

  useEffect(() => {
    const ctx = sceneObjectsRef.current;
    if (!ctx) return;
    ctx.loadCustomGlb(profile.customModelUrl);
    ctx.rebuildPreset();
  }, [profile.customModelUrl]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-cyber-grid">
      <div ref={mountRef} className="w-full h-full" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 20%, rgba(3, 3, 5, 0.78) 100%)',
        }}
      />
      {modelLoadError && (
        <div className="fixed bottom-20 left-6 z-50 bg-neutral-900 border border-white/20 text-white px-4 py-2 rounded-lg text-xs font-mono-tech">
          {modelLoadError}
        </div>
      )}
    </div>
  );
};
