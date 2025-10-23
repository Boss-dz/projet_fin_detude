import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function Model() {
  useGLTF.clear();
  const { scene } = useGLTF("/models/test/scene.gltf");
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    // Center model
    scene.position.x -= center.x;
    scene.position.z -= center.z;
    scene.position.y -= box.min.y;

    // Improve material properties

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        console.log("Mesh name:", child.name);
        if (child.name === "Pots_Small010_Plants_0") {
          // Make it red to show it's unhealthy
          child.material = child.material.clone();
          child.material.color = new THREE.Color("red");

          // Optional: make it glow slightly
          child.material.emissive = new THREE.Color("red");
          child.material.emissiveIntensity = 0.4;
        }

        if (child.name === "Pots_Large001_Plants_0") {
          // Make it red to show it's unhealthy
          child.material = child.material.clone();
          child.material.color = new THREE.Color("red");

          // Optional: make it glow slightly
          child.material.emissive = new THREE.Color("red");
          child.material.emissiveIntensity = 0.4;
        }
        // Enhance materials for better visual quality
        if (child.material) {
          child.material.metalness = 0.1;
          child.material.roughness = 0.5;
          child.material.envMapIntensity = 1;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1} />;
}

// function Model() {
//   const { scene } = useGLTF("/models/test/scene.gltf");

//   useEffect(() => {
//     // center & ground as before
//     const box = new THREE.Box3().setFromObject(scene);
//     const center = box.getCenter(new THREE.Vector3());
//     scene.position.x -= center.x;
//     scene.position.z -= center.z;
//     scene.position.y -= box.min.y;

//     // traverse and adjust
//     scene.traverse((child) => {
//       if (!child.isMesh) return;
//       console.log("Mesh name:", child.name);
//       child.castShadow = true;
//       child.receiveShadow = true;

//       // enhance base material properties safely
//       if (child.material) {
//         // ensure we don't accidentally modify a shared material for all meshes:
//         // only clone when we need to change properties that should be unique
//         // (for common tweaks you can leave shared materials untouched)
//       }

//       // TARGET: only change this specific mesh (exact name match)
//       if (child.name === "Pots_Large001_Plants_0") {
//         // clone material so changes don't affect other meshes that share it
//         child.material = child.material.clone();

//         // now modify color/emissive on the cloned material
//         child.material.color = new THREE.Color("red");
//         child.material.emissive = new THREE.Color("red");
//         child.material.emissiveIntensity = 0.6;

//         // optional: make it slightly shinier so the red stands out
//         child.material.roughness = Math.max(0, (child.material.roughness ?? 0.5) - 0.2);
//       }
//             if (child.name === "Pots_Small001_Plants_0") {
//               // clone material so changes don't affect other meshes that share it
//               child.material = child.material.clone();

//               // now modify color/emissive on the cloned material
//               child.material.color = new THREE.Color("red");
//               child.material.emissive = new THREE.Color("red");
//               child.material.emissiveIntensity = 0.6;

//               // optional: make it slightly shinier so the red stands out
//               child.material.roughness = Math.max(
//                 0,
//                 (child.material.roughness ?? 0.5) - 0.2
//               );
//             }

//       // apply generic visual improvements (safe to do if not cloning, or clone first)
//       if (child.material) {
//         // if you want these changes to be per-mesh, clone first; otherwise they affect all sharing meshes
//         child.material.metalness = child.material.metalness ?? 0.1;
//         child.material.roughness = child.material.roughness ?? 0.5;
//         child.material.envMapIntensity = child.material.envMapIntensity ?? 1;
//       }
//     });
//   }, [scene]);

//   return <primitive object={scene} scale={1} />;
// }

// Soft shadows component
function SoftShadowsSetup() {
  return (
    <AccumulativeShadows
      temporal
      frames={100}
      color="black"
      colorBlend={0.5}
      alphaTest={0.9}
      scale={20}
      position={[0, -0.005, 0]}
    >
      <RandomizedLight
        amount={8}
        radius={10}
        ambient={0.5}
        intensity={1}
        position={[5, 5, -5]}
        bias={0.001}
      />
    </AccumulativeShadows>
  );
}

// HTML Button component that works outside Canvas
function CameraControls() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        background: "rgba(0,0,0,0.7)",
        padding: "10px",
        borderRadius: "8px",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {["Front", "Back", "Top", "Right", "Left"].map((view) => (
          <button
            key={view}
            onClick={() => {
              // This would need a different approach since we can't use useThree here
              console.log(`Switch to ${view} view`);
            }}
            style={{
              padding: "8px 12px",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              backdropFilter: "blur(10px)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")
            }
          >
            {view}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MyModel() {
  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        height: "100vh",
        margin: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{
          position: [8, 5, 8],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%)",
        }}
        gl={{
          physicallyCorrectLights: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
          antialias: true,
        }}
        shadows
      >
        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.4} color="#ffffff" />

        {/* Main directional light (like sun) */}
        <directionalLight
          position={[10, 15, 8]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.0001}
          color="#fff9e6"
        />

        {/* Fill light */}
        <directionalLight
          position={[-8, 5, -5]}
          intensity={0.3}
          color="#e6f0ff"
        />

        {/* Rim/back light */}
        <directionalLight
          position={[-5, 8, -10]}
          intensity={0.4}
          color="#ffe6f0"
        />

        {/* Environment */}
        <Environment preset="sunset" background blur={0.5} />

        <Model />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={25}
          target={[0, 2, 0]}
          dampingFactor={0.1}
        />

        {/* Improved Ground Plane */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[50, 50]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>

        {/* Reflective ground */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={0.5}
          />
        </mesh>

        <SoftShadowsSetup />
      </Canvas>

      <CameraControls />
    </div>
  );
}
