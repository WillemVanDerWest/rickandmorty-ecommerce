import { Character } from "../interfaces"
import React from "react"

interface param {
    character: Character
    incBasket : (character: Character)=> void,
}

export default function Image({character}:param){
    return(
        <img alt={`A still shot of ${character.name} character`} src={character.image}  width={250}/>
    )
}