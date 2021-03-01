import React, { useContext } from 'react'
import { PokemonCtx } from '../PokemonContext'

export default function MyPokemons() {
  const pokemonContext = useContext(PokemonCtx);

  const myPokemons = () => {
    if (pokemonContext.myList.length > 0) {
      return pokemonContext.myList.map(pokemon => {
        return (
          <div key={pokemon.id}>
            {pokemon.name}
          </div>
        )
      })
    }
  }

  return (
    <div>
      Pokemons
      {myPokemons()}
    </div>
  )
}
