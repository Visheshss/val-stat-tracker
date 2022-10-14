import React, { Component } from 'react';

export const SearchBar = ({userInput, onSearchChange, onSearchSubmit}) => {
    
    const handleChange = (event) => {
        onSearchChange(event.target.value);
    };

    const handleSubmit = (event) => {
        onSearchSubmit()
    };

    return (
        <center>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} id='search' type='text' required value={userInput} placeholder='Search Username'/>
                <input id='submit' type='submit'/>
            </form>
        </center>
    )
}
