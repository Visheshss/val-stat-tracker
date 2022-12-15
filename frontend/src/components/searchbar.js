import React, { Component, useState, useTransition } from 'react';
import {useNavigate} from 'react-router-dom';

export const SearchBar = ({userInput}) => {
    
    const [name,setName] = useState('');
    const [tag,setTag] = useState('');
    let navigate = useNavigate();

    //As the search changes, the name and tag states are updated.
    const handleChange = (event) => {
        const search = (event.target.value).split('#');
        const name = search[0];
        const tag = search[1];
        setName(name);
        setTag(tag);
    };

    //
    const handleSubmit = () => {
        navigate(`/player/${name}/${tag}`);
    }

    return (
        <center>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} required value={userInput} placeholder='Username#Tag' type="text" class="search-hover"/>
                <br/><br/>
                <input class='button' id='submit' type='submit' value='Search'/>
            </form>
        </center>
    )
}
