import React, { useState } from 'react';
import './App.css';
import CharacterComponents from '../src/components/characterComonents.tsx';
import { Character } from './interfaces.ts';


function App() {
  const [basketItems, setBasketItems] = useState<number>(0)
  const [basketItemNames, setBasketItemNames] = useState<Array<Character>>([])
  const handleBasketItems =(character: Character)=>{
      setBasketItems(basketItems + 1)
        setBasketItemNames([...basketItemNames, character])
  }
  return (
    <div className="App">
      <CharacterComponents basketAmount={basketItems} incBasket={handleBasketItems} />
    </div>
  );
}
export default App;
