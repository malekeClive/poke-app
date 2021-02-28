import React, { useState, useContext, useEffect, useRef } from 'react'
import { PokemonCtx } from '../PokemonContext';

export default function PreviewPokemon() {
  const pokemonContext = useContext(PokemonCtx);
  const pokemon = pokemonContext.pokemon;
  let [isActive, setIsActive] = useState(false);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setIsActive(true);
  }, [pokemon])

  const getAbilities = () => {
    if (pokemon.abilities.length > 0) {
      return pokemon.abilities.map((ability, idx) => (
        <p key={idx} className="text-lg">- {ability.ability.name}</p>
      ))
    }
  }

  const popupHandler = () => {
    setIsActive(() => !isActive);
  }

  return (
    <div className={`${isActive ? 'static' : 'hidden'}`}>
      <div className="background-popup"></div>
      <div className={`left-popup ${isActive ? 'open-popup' : ''}`}></div>
      <div className="popup-content">
        <div>
          <p className="text-4xl font-bold">{pokemon.name}</p>
          <p className="text-2xl">Abilities</p>
          {getAbilities()}
        </div>
        <div>
          <img src={pokemon.sprite} alt={pokemon.name}></img>
        </div>
        <button onClick={popupHandler}>Close</button>
      </div>
    </div>
  )
}
