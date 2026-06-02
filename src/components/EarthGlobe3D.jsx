import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const COLORS = {
  teal:   '#00D4AA',
  blue:   '#2196F3',
  orange: '#F4A261',
  green:  '#43A047',
};

/* ─── Atmosfera (fresnel glow) ─── */
function Atmosphere() {
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color('#3FA9F5') } },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      uniform vec3 uColor;
      void main() {
        float intensity = pow(0.62 - dot(vNormal, vView), 4.5);
        gl_FragColor = vec4(uColor, 1.0) * clamp(intensity, 0.0, 1.0) * 0.45;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  }), []);

  return (
    <mesh scale={1.12} material={material}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  );
}

/* ─── Planeta (no centro / origem) ─── */
function Earth() {
  const earthRef  = useRef();
  const cloudsRef = useRef();

  const [day, specular, normal, clouds] = useTexture([
    '/textures/earth_day.jpg',
    '/textures/earth_specular.jpg',
    '/textures/earth_normal.jpg',
    '/textures/earth_clouds.png',
  ]);
  day.colorSpace = THREE.SRGBColorSpace;
  clouds.colorSpace = THREE.SRGBColorSpace;
  day.anisotropy = 8;

  useFrame((_, delta) => {
    if (earthRef.current)  earthRef.current.rotation.y  += delta * 0.045;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.062;
  });

  return (
    <group rotation={[0.3, 0, 0.05]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={day}
          specularMap={specular}
          normalMap={normal}
          normalScale={[0.8, 0.8]}
          specular={new THREE.Color(0x2b3a55)}
          shininess={14}
        />
      </mesh>
      <mesh ref={cloudsRef} scale={1.012}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial map={clouds} transparent opacity={0.42} depthWrite={false} />
      </mesh>
      <Atmosphere />
    </group>
  );
}

/* ─── Satélite que orbita em um anel ─── */
function OrbitingSat({ radius, speed, phase, color, size }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    if (ref.current) ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

/* ─── Anel orbital 3D (trilha + satélite) ─── */
function Orbit({ radius, rotation, color, speed, phase, satSize = 0.05 }) {
  return (
    <group rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, 0.007, 12, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} toneMapped={false} />
      </mesh>
      <OrbitingSat radius={radius} speed={speed} phase={phase} color={color} size={satSize} />
    </group>
  );
}

/* ─── Sistema de anéis (gira lentamente) ─── */
function OrbitSystem() {
  const ref = useRef();
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.04; });
  return (
    <group ref={ref}>
      <Orbit radius={1.45} rotation={[1.15, 0, 0]}      color={COLORS.teal}   speed={0.55} phase={0}   satSize={0.05}  />
      <Orbit radius={1.70} rotation={[1.15, 0, 0.85]}   color={COLORS.blue}   speed={0.42} phase={2.1} satSize={0.045} />
      <Orbit radius={1.95} rotation={[1.32, 0.45, -0.5]} color={COLORS.orange} speed={0.32} phase={4.0} satSize={0.05}  />
      <Orbit radius={1.95} rotation={[1.32, 0.45, -0.5]} color={COLORS.green}  speed={0.32} phase={1.2} satSize={0.04}  />
    </group>
  );
}

/* ─── Canvas exportado (Terra + anéis na MESMA cena → sempre concêntricos) ─── */
export default function EarthGlobe3D() {
  // Força o R3F a remedir o container após o mount (corrige canvas 300x150)
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event('resize')), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.6], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[1.2, 0.8, 2.8]} intensity={3.2} color="#fff6ec" />
      <directionalLight position={[-2.5, -0.5, -1]} intensity={0.35} color="#2196F3" />

      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <OrbitSystem />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        enableDamping
        dampingFactor={0.07}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.72}
      />
    </Canvas>
  );
}
