import React, { useState } from 'react'

const PokemonCtx = React.createContext();
const initValue = {
  id: 0 ,
  name: "test",
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
  abilities: [],
}

const PokemonContext = ({children}) => {
  let [pokemon, setPokemon] = useState({...initValue});
  let [myList, setMyList] = useState([]);
  let [previewPopup, setPreviewPopup] = useState(false);

  const getPokemonBy = async (url) => {
    setPreviewPopup(true);
    const fetchByUrl = await fetch(url);
    const convertToJson = await fetchByUrl.json();

    const newPokemon = {
      id: convertToJson.id,
      name: convertToJson.name,
      sprite: convertToJson.sprites.front_default,
      abilities: convertToJson.abilities,
    }

    setPokemon(() => newPokemon);
  }

  return (
    <PokemonCtx.Provider value={{pokemon, myList, setMyList, getPokemonBy, previewPopup, setPreviewPopup}}>
      {children}
    </PokemonCtx.Provider>
  )
}

export { PokemonContext, PokemonCtx };