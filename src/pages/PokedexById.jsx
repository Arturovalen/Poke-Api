import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Pokemon404 from '../components/pokedexById/Pokemon404'
import './styles/pokedexById.css'

const PokedexById = () => {

  const { id } = useParams()

  const [pokemon, setPokemon] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
      .then(res => setPokemon(res.data))
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
  }, [])

  if (hasError) {
    return <Pokemon404 />
  }

  return (
    <article>
      <section>
        <div>
          <header className={`card-poke__header bg-${pokemon?.types[0].type.name}`}>
            <img className='cardbyid__img' src={pokemon?.sprites.other['official-artwork'].front_default} />
          </header>




          <section className='cardbyid__box'>
            <h5 className='cardbyid__id'><span>#</span>{pokemon?.id}</h5>
            <h3 className='cardbyid__name'>{pokemon?.name}</h3>

            <div className='cardbyid__a'>
              <div><span>Weight: </span>{pokemon?.weight}</div>
              <div><span>Height: </span>{pokemon?.height}</div>
            </div>

            <ul className='cardbyid__hab'>
              {pokemon?.types.map(type => (<li>{type.type.name}</li>))}
              {pokemon?.types.habilities}
            </ul>

          </section>
          <ul className='cardbyid__hab2'>
            {pokemon?.stats.map(stat => (
              <li>
                <span>{stat.stat.name}: </span>
                <span>{stat.base_stat}</span>
              </li>
            ))
            }
          </ul>


        </div>
      </section>
    </article>
  )
}

export default PokedexById