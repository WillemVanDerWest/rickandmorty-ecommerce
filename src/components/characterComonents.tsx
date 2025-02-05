import React, { Suspense, useEffect, useState, lazy } from "react";
import "../apiCalls/rickandmortyAPI.tsx";
import {
  getAllCharacters,
  getCharacterPage,
  getCharacterSearch,
} from "../apiCalls/rickandmortyAPI.tsx";
import { Character, Info } from "../interfaces.ts";
import Basket from "./basketComponent.tsx";
import SearchInput from "./searchInput.tsx";
import CharacterCard from "./characterCard.tsx";

interface param {
  incBasket: (character: Character) => void;
  basketAmount: number;
}

function CharacterComponents({ incBasket, basketAmount }: param) {
  const initialCharacter: Character[] = [];
  const [data, setData] = useState<Array<Character>>(initialCharacter);
  const [pageData, setPageData] = useState<Info<any>>();
  const nextLink = pageData?.info?.next;
  const removeAll = nextLink?.slice(
    pageData?.info?.next?.search("=") + 1,
    nextLink.length
  );
  const currentPageNumber = Number(removeAll) - 1;
  function handleState(info: Info<any>){
    const characters = info.results;
    setData(characters ? characters : initialCharacter);
    setPageData(info);
  }
  useEffect(() => {
    async function handleData() {
      const info: Info<any> = await getAllCharacters();
      handleState(info)
    }
    handleData();
  }, []);

  async function handleNextPage(pageNumber: number) {
    const info: Info<any> = await getCharacterPage(pageNumber);
    handleState(info)
  }

  async function handleSearch(search:string){
    console.log(`Your current search: ${search}`)
    const info: Info<any> = await getCharacterSearch(search);
    handleState(info)
  }

  const RenderCards = () => {
    const characters = data.map((character) => {
      return (
        <CharacterCard
        incBasket={incBasket}
        key={character.id}
        character={character}
      />
      );
    });
    return <div className="cards">{characters}</div>;
  };

  const PageAnateComponent = () => {
    return (
      <div>
        <button
          onClick={() =>
            handleNextPage(
              currentPageNumber === 1
                ? currentPageNumber
                : currentPageNumber - 1
            )
          }
        >{`<`}</button>
        <button>{currentPageNumber}</button>
        <button
          onClick={() => handleNextPage(currentPageNumber + 1)}
        >{`>`}</button>
      </div>
    );
  };
  return (
    <div>
      
      <Basket basketAmount={basketAmount} />
      <div>{data ? `we got the data` : `searching...`}</div>
      <PageAnateComponent />
      <SearchInput handleSearch={handleSearch}/>
      <RenderCards />
      <PageAnateComponent />
    </div>
  );
}

export default CharacterComponents;
