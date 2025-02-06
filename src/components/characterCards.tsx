import React from "react"
import { Character } from "../interfaces";
import CharacterCard from "./characterCard.tsx";

interface param {
  incBasket: (character: Character) => void;
  basketAmount: number;
  data: Array<Character>
}

export default function RenderCards(prop:param){
    const characters = prop.data.map((character) => {
      return (
        <CharacterCard
        incBasket={prop.incBasket}
        key={character.id}
        character={character}
      />
      );
    });
    return <div className="cards">{characters}</div>;
  };