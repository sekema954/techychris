import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";

const SubscribeModel = ({ path }: { path: string }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
};

const SubscribeModelViewer = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* GLB Model */}
        <React.Suspense fallback={<Html center>Loading...</Html>}>
          <SubscribeModel path="/models/subscribe_button.glb" />
        </React.Suspense>

        {/* No OrbitControls: model is fixed */}
      </Canvas>
    </div>
  );
};

export default SubscribeModelViewer;
