import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/navbar";

export const Player = () => {
    const {name,tag} = useParams();
    const [player,setPlayer] = useState();
    const responses = {400: 'Please use the format username#tagline.', 403: 'Account information is currently unavailable. Please try again later.', 503: 'Account information is currently unavailable. Please try again later.', 408: 'Account information is currently unavailable. Please try again later.', 429: 'Account information is currently unavailable. Please try again later.', 404: 'Player not found.'}
    //useEffect will happen when a new name and tag are searched for or when the page loads 

    useEffect(() => {
        fetch(`/player/${name}/${tag}`)
        .then((res) => res.json())
        .then((data) =>  
        {if (data['status'] == 200) {
            setPlayer(data['data']['name']);
        } else {
            setPlayer(responses[data['status']])
        }}
        );
  }, [{name,tag}])

    return (
        <>
            <center id='background'>
                <NavBar/>
                <h1>{player}</h1>
            </center>
        </>
    )

 }
