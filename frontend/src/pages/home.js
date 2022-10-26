import React, { Component, useEffect, useState } from 'react';
import {SearchBar} from '../components/searchbar'
import {NavBar} from '../components/navbar'
export const Home = () => {
    
  return (
    <div id='background'>
        <center>
          <NavBar/>
          <h1 style={{color: 'white'}}>Search to view player stats</h1> <br/>
          <SearchBar/>
        </center>
    </div>
    );
  };

