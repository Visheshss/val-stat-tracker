import React, { Component, useEffect, useState } from 'react';
import {SearchBar} from '../components/searchbar'
export const Home = () => {
    
    const [data,setData] = useState([{}])

    useEffect (() => {
    fetch('/members').then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  },[] )

    const [search,setSearch] = useState("")

    const handleSearchChange = (userInput) => {
      setSearch(userInput)
    }

    const handleSearchSubmit = () => {
      console.log({search})
    }

  return (
    <div>
        <center>
          <h1>Home Page</h1>
          <SearchBar userInput = {search} onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}/>
        </center>
    </div>
  );

};

