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
      <div>Empty</div>
    )
  }

  const loadMorePokemon = () => {
    if (pokemons.length > 0) {
      return (
        <button className="card-glassmorph" onClick={() => setLoadCounter(prev => prev += 10)}>Load More</button>
      )
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
        {renderPokemon()}
        {loadMorePokemon()}
      </div>
    </div>
  )
};

export default Pokemons;