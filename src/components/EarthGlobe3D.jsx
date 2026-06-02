import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Atmosfera (fresnel glow estilo Apple) ─── */
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
        // glow fino e suave, apenas no limbo
        float intensity = pow(0.60 - dot(vNormal, vView), 5.0);
        gl_FragColor = vec4(uColor, 1.0) * clamp(intensity, 0.0, 1.0) * 0.4;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  }), []);

  return (
    <mesh scale={1.10} material={material}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  );
}

/* ─── Planeta ─── */
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
    <group rotation={[0.35, 0, 0.08]}>
      {/* Superfície */}
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

      {/* Nuvens */}
      <mesh ref={cloudsRef} scale={1.012}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial map={clouds} transparent opacity={0.42} depthWrite={false} />
      </mesh>

      <Atmosphere />
    </group>
  );
}

/* ─── Canvas exportado ─── */
export default function EarthGlobe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.45], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      {/* Ambiente — Terra bem visível e uniforme */}
      <ambientLight intensity={0.7} />
      {/* Sol — frontal, ilumina quase toda a face visível com terminador suave */}
      <directionalLight position={[1.2, 0.8, 2.8]} intensity={3.2} color="#fff6ec" />
      {/* Preenchimento azulado discreto (rebote do espaço) */}
      <directionalLight position={[-2.5, -0.5, -1]} intensity={0.35} color="#2196F3" />

      <Suspense fallback={null}>
        <Earth />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        enableDamping
        dampingFactor={0.07}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />
    </Canvas>
  );
}
