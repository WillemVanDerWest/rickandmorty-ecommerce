import React, { Suspense, lazy, use, useEffect, useState } from "react";
import { Character } from "../interfaces.ts";
interface param {
  character: Character;
  incBasket: (character: Character) => void;
}

function CharacterCard({ character, incBasket }: param) {
  const clickMe = (prop: Character) => {
    incBasket(prop);
  };
  return (
    <div className="card">
      <h1 className="noMargin">{character.name}</h1>
      <img alt={`A still shot of ${character.name} character`} src={character.image}  width={250}/>
      <p>{character.status}</p>
      <p>{character.species}</p>
      <button
        onClick={() => {
          clickMe(character);
        }}
      >{`Add ${character.name} to cart`}</button>
    </div>
  );
}
export default CharacterCard;
