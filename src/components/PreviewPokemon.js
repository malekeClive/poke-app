import React, { useContext } from 'react'
import { PokemonCtx } from '../PokemonContext';
import pokeball from '../assets/pokeball.png'

export default function PreviewPokemon() {
  const pokemonContext = useContext(PokemonCtx);
  const pokemon = pokemonContext.pokemon;

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
    pokemonContext.setMyList((prev) => [...prev, pokemon])
  }

  return (
    <div className={`${pokemonContext.previewPopup ? 'static' : 'hidden'}`}>
      <div className="background-popup"></div>
      <div className={`left-popup ${pokemonContext.previewPopup ? 'open-popup' : ''}`}>
        <div>
          <img className="w-24 mx-auto" src={pokemon.sprite} alt={pokemon.name}></img>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-center">{pokemon.name}</p>
          <p className="text-2xl">Abilities</p>
          {getAbilities()}
          <button className="absolute top-0 right-0 p-4" onClick={popupHandler}>Close</button>
          <button className="w-full relative" onClick={catchPokemon}>
            <div className="animate-ping inline-flex h-12 w-12 rounded-full bg-white opacity-75"></div>
            {/* <span className="animate-ping inline-flex h-12 w-12 rounded-full bg-white opacity-75"></span> */}
            <img className="w-16 mx-auto absolute left-0 right-0 top-0" src={pokeball} alt="pokeball"></img>
          </button>
        </div>
      </div>
    </div>
  )
}
