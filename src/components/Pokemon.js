import React, { memo, useContext } from 'react'
import { PokemonCtx } from '../PokemonContext'

const Pokemon = memo(({ pokemon }) => {
  const pokemonContext = useContext(PokemonCtx);

  const getPokemon = (url) => {
    pokemonContext.getPokemonBy(url);
  }

  return (
    <button className="card" onClick={() => getPokemon(pokemon.url)}>
      {pokemon.name}
    </button>
  )
});

export default Pokemon;
