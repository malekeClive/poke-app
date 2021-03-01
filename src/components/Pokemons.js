import React, { useState, useEffect } from 'react'
import Pokemon from './Pokemon'

const Pokemons = () => {
  let [pokemons, setPokemons] = useState([]);
  let [loadCounter, setLoadCounter] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchPokemon = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${loadCounter}&limit=10`;
      const fetchByUrl = await fetch(url, { signal: abortController.signal });
      const convertToJson = await fetchByUrl.json();
      setPokemons((prev) => [...prev, ...convertToJson.results]);
    }

    fetchPokemon();

    return () => {
      abortController.abort();
    }
  }, [loadCounter]);


  const renderPokemon = () => {
    if (pokemons.length > 0) {
      return pokemons.map((pokemon, idx) => (
        <Pokemon key={idx} pokemon={pokemon} />
      ));
    }

    return (
      <div className="border border-red-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-red-400 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-red-400 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-red-400 rounded"></div>
              <div className="h-4 bg-red-400 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const loadMorePokemon = () => {
    if (pokemons.length > 0) {
      return (
        <button className="card" onClick={() => setLoadCounter(prev => prev += 10)}>Load More</button>
      )
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
        {renderPokemon()}
        {loadMorePokemon()}
      </div>
    </div>
  )
};

export default Pokemons;