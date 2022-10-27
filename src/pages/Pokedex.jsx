import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardPoke from '../components/pokedex/CardPoke'
import InputSearch from '../components/pokedex/InputSearch'
import SelectByType from '../components/pokedex/SelectByType'
import './styles/pokedex.css'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [typeSelected, setTypeSelected] = useState('All Pokemons')

  useEffect(() => {
    if (typeSelected !== 'All Pokemons') {
      // Si se seleccionó un tipo
      axios.get(typeSelected)
        .then(res => {
          const result = res.data.pokemon.map(e => e.pokemon)
          setPokemons(result)
        })
        .catch(err => console.log(err))
    } else {
      //Si quiero todos los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      axios.get(URL)
        .then(res => setPokemons(res.data.results))
        .catch(err => console.log(err))
    }
  }, [typeSelected])
  console.log(pokemons)

  const userName = useSelector(state => state.userName)

  return (
    <div>
    <header className='header__red'>
        <div className='header__black'></div>
        <div className='header__circle'>
            <div className='header__circle-int'></div>
        </div>
    </header>
    <img className='pokedex__img-2' src="/images/home/pokedex.png" alt="" />
      <article className='pokedex__article'>
        <p className='pokedex__introduce'>Welcome  <span className='pokedex__introduce-find'> {userName}</span>, here you can find your favorite pokemon.</p>
      </article>
      <aside className='pokedex__finder'>
        <InputSearch />
        <SelectByType setTypeSelected={setTypeSelected} />
      </aside>
      <main>
        <div className='card-container'>
          {
            pokemons?.map(pokemon => (
              <CardPoke
                key={pokemon.url}
                url={pokemon.url}
              />
            ))
          }
        </div>
      </main>
    </div>
  )
}

export default Pokedex