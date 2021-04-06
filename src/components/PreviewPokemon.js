import React, { useState, useContext } from 'react'
import { PokemonCtx } from '../PokemonContext';
import pokeball from '../assets/pokeball.png'

export default function PreviewPokemon() {
  const pokemonContext = useContext(PokemonCtx);
  const pokemon = pokemonContext.pokemon;
  let [onCatching, setOnCatching] = useState(false);

  const getAbilities = () => {
    if (pokemon.abilities.length > 0) {
      return pokemon.abilities.map((ability, idx) => (
        <p key={idx} className="text-lg">- {ability.ability.name}</p>
      ))
    }
  }

  const popupHandler = () => {
    pokemonContext.setPreviewPopup(false);
  }

  const catchPokemon = () => {
    if (onCatching) {
      return;
    }
    setOnCatching(true);

    setTimeout(() => {
      pokemonContext.setMyList((prev) => [...prev, pokemon]);
      setOnCatching(false);
    }, 1000)
  }

  const checkPokemonOnMyList = () => {
    const alreadyHas = pokemonContext.myList.find(poke => poke.id === pokemon.id);
    if (alreadyHas) {
      return (
        <div>Owned</div>
      )
    }

    return (
      <button className="w-full relative top-6" onClick={catchPokemon}>
        {/* <div className="animate-ping inline-flex h-12 w-12 rounded-full bg-gray-600 opacity-75"></div> */}
        <img className="w-16 mx-auto absolute left-0 right-0 top-0" src={pokeball} alt="pokeball"></img>
      </button>
    )
  }

  return (
    <div className={`${pokemonContext.previewPopup ? 'static' : 'hidden'}`}>
      <div className="fixed w-full h-screen top-0 right-0 left-0 bottom-0"></div>
      <div className={`left-popup ${pokemonContext.previewPopup ? 'open-popup' : ''}`}>
        <div>
          <img className="w-24 mx-auto" src={pokemon.sprite} alt={pokemon.name}></img>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-center">{pokemon.name}</p>
          <p className="text-2xl">Abilities</p>
          {getAbilities()}
          <button className="absolute top-0 right-0 p-4" onClick={popupHandler}>X</button>
          {checkPokemonOnMyList()}
        </div>
      </div>
    </div>
  )
}
