import { nanoid } from "nanoid";
import { create } from "zustand";

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: [],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }));
    },
    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos ;
                return X != x || Y != y || Z != Z;
            })
        }));
    },
    setTexture: (texture) => {
        set(() => ({
            texture
        }));
    },
    saveWorld: () => {},
    resetWorld: () => {}
}));