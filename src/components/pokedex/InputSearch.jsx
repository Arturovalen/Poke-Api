import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/form.css'

const InputSearch = () => {

    const navigate = useNavigate()

    const submit = e => {
        e.preventDefault()
        navigate(`/pokedex/${e.target.search.value.trim().toLowerCase()}`)
    }

    return (
        <form className='form__total' onSubmit={submit}>
            <input className='form__input' id='search' type="text" placeholder='Search a pokemon' />
            <button className='form__button' >Search</button>
        </form>
    )
}

export default InputSearch