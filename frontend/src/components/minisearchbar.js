import React, { Component, useState } from 'react';
import {useNavigate} from 'react-router-dom';

export const MiniSearchBar = ({userInput}) => {

    const [name,setName] = useState('')
    const [tag,setTag] = useState('')
    let navigate = useNavigate();

    //As the search changes, this will trigger the state 'search' and 
    const handleChange = (event) => {
        const search = (event.target.value).split('#');
        const name = search[0];
        const tag = search[1];
        setName(name);
        setTag(tag);
    };

    const handleSubmit = () => {
        navigate(`/player/${name}/${tag}`);
    }

    return (
        <>
            <div >
                <form onSubmit={handleSubmit} class="search-box d-flex justify-center align-center">
                    <input onChange={handleChange} required value={userInput} type="text" placeholder="Username#Tag"/>
                    <a class="p-20 cursor-pointer"><img class="search-btn max-h-20" src="https://findicons.com/files/icons/1262/amora/256/find.png" alt="search" /></a>
                </form>
            </div>
        </>
    )
}
