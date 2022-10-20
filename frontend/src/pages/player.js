import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Player = () => {
    const {name,tag} = useParams();
    const [player,setPlayer] = useState();

    //useEffect will happen when a new name and tag are searched for or when the page loads 

    useEffect(() => {
        fetch(`/player/${name}/${tag}`)
        .then((res) => res.json())
        .then((data) =>  setPlayer(data['data']['name']))
  }, [{name,tag}])

    return (
        <>
            <center>
                <h1>{player}</h1>
            </center>
        </>
    )

 }
