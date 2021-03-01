import React from 'react';
import './App.css';
import MyPokemons from './components/MyPokemons';
import Pokemons from './components/Pokemons';
import PreviewPokemon from './components/PreviewPokemon';
import { PokemonContext } from './PokemonContext';


function App() {
  return (
    <PokemonContext>
      <div className="App">
        <Pokemons />
        <MyPokemons />
        <PreviewPokemon />
      </div>
    </PokemonContext>
  );
}

export default App;
