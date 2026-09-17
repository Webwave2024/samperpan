import { forwardRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export const ProductModel = forwardRef<THREE.Group, any>((props, ref) => {
  // We use the uploaded image as a texture on a 3D plane.
  // IMPORTANT: Please rename your uploaded image to "dress.jpg" and place it in the "public" folder!
  
  // Try to load the texture. We use a placeholder color if the texture isn't ready.
  let texture;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    texture = useTexture("/dress.jpg");
    texture.colorSpace = THREE.SRGBColorSpace;
  } catch (e) {
    console.warn("Texture /dress.jpg not found. Please add it to the public folder.");
  }

  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="garment">
        {/* We use a plane to display the 2D image in 3D space */}
        <mesh name="torso" position={[0, 0, 0]}>
          {/* Aspect ratio roughly matches the uploaded image */}
          <planeGeometry args={[3, 4.5]} />
          {texture ? (
            <meshStandardMaterial map={texture} side={THREE.DoubleSide} roughness={0.4} />
          ) : (
            <meshStandardMaterial color="#cc0000" side={THREE.DoubleSide} />
          )}
        </mesh>
        
        {/* Keeping dummy objects for the animation to prevent errors in ProductScene */}
        <mesh name="collar" position={[0, 0, 0]} visible={false}><boxGeometry/></mesh>
        <mesh name="sleeve-left" position={[0, 0, 0]} visible={false}><boxGeometry/></mesh>
        <mesh name="sleeve-right" position={[0, 0, 0]} visible={false}><boxGeometry/></mesh>
      </group>
    </group>
  );
});

ProductModel.displayName = "ProductModel";

