import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import searchIcon from '../images/search-icon.png';

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
            <div id='search-bar'>
                <form onSubmit={handleSubmit} class="search-box d-flex justify-center align-center">
                    <input onChange={handleChange} class='navbarinput' required value={userInput} type="text" placeholder="Username#Tag"/>
                    <a class="p-20 cursor-pointer" href={handleSubmit}>
                        <img class="search-btn max-h-20" src='https://findicons.com/files/icons/1262/amora/256/find.png' alt='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/245532/58-512.png' />
                    </a>
                </form>
            </div>
        </>
    )
}
