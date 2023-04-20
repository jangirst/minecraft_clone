import { TextureLoader, NearestFilter, RepeatWrapping } from 'three';

import {
    dirtImg,
    grassImg,
    glassImg,
    logImg,
    woodImg
} from './images';


const dirtTexture = new TextureLoader().load( dirtImg );
const grassTexture = new TextureLoader().load( grassImg );
const glassTexture = new TextureLoader().load( glassImg );
const logTexture = new TextureLoader().load( logImg );
const woodTexture = new TextureLoader().load( woodImg );
const groundTexture = new TextureLoader().load( grassImg );

// the ground looks blury --> solution: use a filter, so that it looks pixelated
dirtTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;
groundTexture.magFilter = NearestFilter;

// the ground is jetzt a ground square, the image got streched --> solution: repeat the ground texture
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;

export {
    dirtTexture,
    grassTexture,
    glassTexture,
    logTexture,
    woodTexture,
    groundTexture
}