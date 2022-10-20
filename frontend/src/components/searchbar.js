import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

export const SearchBar = ({userInput}) => {
    
    const [name,setName] = useState('')
    const [tag,setTag] = useState('')

    //As the search changes, this will trigger the state 'search' and 
    const handleChange = (event) => {
        const search = (event.target.value).split('#')
        const name = search[0]
        const tag = search[1]
        setName(name)
        setTag(tag)
    };

    return (
        <center>
            <form>
                <input onChange={handleChange} id='search' type='text' required value={userInput} placeholder='Search Username'/>
                <Link to={`/player/${name}/${tag}`}>
                    <input id='submit' type='submit'/>
                </Link>
            </form>
        </center>
    )
}
