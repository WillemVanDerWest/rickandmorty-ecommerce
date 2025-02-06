import React, { Suspense, useEffect, useState, lazy } from "react";
import "../apiCalls/rickandmortyAPI.tsx";
import {
  getAllCharacters,
  getCharacterPage,
  getCharacterSearch,
  getNextPage,
  getPrevPage,
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
  const [searchInput, setSearchInput] = useState<string>()
  const nextLink = pageData?.info?.next ||null
  const prevLink = pageData?.info?.prev ||null
  const removeAll = nextLink?.slice(
    pageData?.info?.next?.search("=") + 1,
    nextLink.length
  );
  const [currentPageNumber,setCurrentPageNumber] = useState<number>(1)
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

  async function handleNextPage(pageLink: string) {
      handleState(await getNextPage(pageLink))
      setCurrentPageNumber(currentPageNumber+1)
  }

  async function handlePrevPage(pageLink: string) {
    handleState(await getPrevPage(pageLink))
    setCurrentPageNumber(currentPageNumber-1)
}


  async function handleSearch(search:string){
    console.log(`Your current search: ${search}`)
    setSearchInput(search)
    const info: Info<any> = await getCharacterSearch(search);
    handleState(info)
    setCurrentPageNumber(1)
  }

 

  const PageAnateComponent = () => {
    return (
      <div>
        {prevLink === null ? '' : <button
          onClick={() =>
            handlePrevPage(prevLink)
          }
        >{`<`}</button>}
        
        <button>{currentPageNumber}</button>
        {nextLink === null ? '' : <button
          onClick={() => handleNextPage(nextLink)}
        >{`>`}</button>}
      </div>
    );
  };

  const RenderCards = lazy(()=> delay(import("../components/characterCards.tsx")));

  return (
    <div>
      <Basket basketAmount={basketAmount} />
      <div>{data ? `we got the data` : `searching...`}</div>
      <PageAnateComponent />
      <SearchInput handleSearch={handleSearch}/>
        <Suspense fallback={<div>Loading...</div>}>
          <RenderCards basketAmount={basketAmount} data={data} incBasket={incBasket} key={1}/>
        </Suspense>
      <PageAnateComponent />
    </div>
  );
}

function delay(promise){
  return new Promise(resolve=>{
    setTimeout(resolve,2000)
  }).then(()=> promise)
}
export default CharacterComponents;
