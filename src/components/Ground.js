import { usePlane } from "@react-three/cannon";
import { groundTexture } from '../images/textures';
import { NearestFilter, RepeatWrapping } from "three";

export const Ground = () => {

    // add a plane ground to the canvas
    const [ref] = usePlane(() => ({
        // the ground is standing upwards --> solution: it has to be rotated by Pi/2 degree radian (90°)
        rotation: [-Math.PI/2, 0, 0], position: [0, 0, 0]
    }));

    // the ground looks blury --> solution: use a filter, so that it looks pixelated
    groundTexture.magFilter = NearestFilter;

    // the ground is jetzt a ground square, the image got streched --> solution: repeat the ground texture
    groundTexture.wrapS = RepeatWrapping;
    groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(100, 100);

    return (
        <mesh ref={ ref }>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' map={groundTexture} />
        </mesh>
    );
}