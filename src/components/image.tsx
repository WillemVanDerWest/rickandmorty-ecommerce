import React from "react";
import { Character } from "../interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css'
import logo from '../images/19.jpeg'


interface param {
  character: Character;
}

export default function LoadImage({ character }: param) {
  return (
    <LazyLoadImage
      className="img"
      placeholderSrc={logo}
      delaytime={10}
      src={character.image}
      alt={`Still of the character ${character.name}`}
      effect="blur"
      wrapperProps={{
        style: {transitionDelay: "0.2s"},
      }}
    />
  );
}
