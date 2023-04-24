import { usePlane } from "@react-three/cannon";
import { groundTexture } from '../images/textures';
import { useStore } from "../hooks/useStore";

export const Ground = () => {

    // add a plane ground to the canvas
    const [ref] = usePlane(() => ({
        // the ground is standing upwards --> solution: it has to be rotated by Pi/2 degree radian (90°)
        rotation: [-Math.PI/2, 0, 0], position: [0, -0.5, 0]
    }));

    const [addCube] = useStore((state) => [state.addCube]);

    groundTexture.repeat.set(100, 100);

    return (
        <mesh
        onClick={(e) => {
            e.stopPropagation();
            const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
            addCube(x, y, z);
        }} 
        ref={ ref }
        >
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' map={groundTexture} />
        </mesh>
    );
}