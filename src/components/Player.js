import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

// important constances for the game
const JUMP_FORCE = 4;
const SPEED = 4;


export const Player = () => {

    // Add the hook for the players movement
    const { moveForward, moveBackward, moveLeft, moveRight, jump} = useKeyboard();

    // Add a camera to the scene
    const {camera} = useThree();

    // Add a sphere = player to the scene
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

        const direction = new Vector3();

        // Manipulation the z-coordinats für the forward- and backward movement
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        );

        // Manipulate the x-coordinats for the left- and right movement
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);


        // Apply the direction to the player
        api.velocity.set(direction.x, vel.current[1], direction.z);

        // Accelerate the player with JUMP_FORCE upwards, if the player is not in die air
        //
        // BUG: now it is possible to jump from the air, in the moment when up- and downforce are less then 0.05
        //
        if ( jump && Math.abs(vel.current[1] < 0.05) ) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
        }

    });

    return (
        <mesh ref={ref}></mesh>
    );

}