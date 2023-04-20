import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export const Player = () => {

    const {camera} = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 2, 0] // The position has to be over the ground,
                            // the player would be catapulted out of the ground insted.
    }));

    // Reference for the players velocity
    const vel = useRef([0, 0, 0]);

    // Is going to be  updated everytime the shpere changes it's velocity
    useEffect( () => {

        api.velocity.subscribe((v) => { vel.current = v });

    }, [api.velocity]);


    // Reference to the players position
    const pos = useRef([0, 0, 0]);
    
    // Is going to be  updated everytime the shpere changes it's position
    useEffect( () => {

        api.position.subscribe((p) => { pos.current = p });

    }, [api.position]);


    // Is going to be  updated in every frame
    useFrame(() => {

        // Attach the camera to the player's current position
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));

        // api.velocity.set(0, 1, 0);

    });

    return (
        <mesh ref={ref}></mesh>
    );

}