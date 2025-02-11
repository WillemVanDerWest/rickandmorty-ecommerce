import React, { useEffect, useState } from "react";
import { Character, Episode } from "../interfaces.ts";
import { getEpisode } from "../apiCalls/rickandmortyAPI.tsx";
import LoadImage from "./image.tsx";
interface param {
  character: Character;
  incBasket: (character: Character) => void;
}

function CharacterCard({ character, incBasket }: param) {
  const [firstSeen, setFirstSeen] = useState<Episode>();
  useEffect(() => {
    //find location name of first seen episode
    const handleLastSeen = async () => {
      setFirstSeen(await getEpisode(character.episode[0]));
    };
    handleLastSeen();
  }, []);

  let status = "alive";
  if (character.status === "Alive") {
    status = "alive";
  } else if (character.status === "Dead") {
    status = "dead";
  } else if (character.status === "unknown") {
    status = "unknown";
  }

  return (
    <div className="card">
      <div>
        <LoadImage character={character} />
      </div>
      <div className="infoCard">
        <div className="section">
          <a className="noMargin noPadding" href={`${character.url}`}>
            <h2 className="white-smoke title">{character.name}</h2>
          </a>
          <span className="white-smoke">
            <span className={status}>{`-_-`}</span>
            {`${character.status} - ${character.species}`}
          </span>
        </div>
        <div className="section">
          <span className="text-grey">Last known location:</span>
          <a href={character.location.url}>
            <span className="white-smoke">{`${character.location.name}`}</span>
          </a>
        </div>
        <div className="section">
          <span className="text-grey">First seen in:</span>
          <a className="white-smoke" href={`${character.episode[0]}`}>
            {firstSeen?.name ? firstSeen?.name : ""}
          </a>
        </div>
      </div>
    </div>
  );
}
export default CharacterCard;
