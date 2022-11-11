import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { OvrStats } from "../components/ovrstats";
import { DisplayMatches } from "../components/displaymatches";

export const Player = () => {
    const {name,tag} = useParams();
    const [fetching,setFetching] = useState('Please wait as we fetch stats');

    const [matches,setMatches] = useState('');
    const [ovrStats,setOvrStats] = useState('');
    const [otherInfo,setOtherInfo] = useState('');

    //Responses to handle any API errors
    const responses = {400: 'Please use the format username#tagline.', 403: 'Account information is currently unavailable. Please try again later.', 503: 'Account information is currently unavailable. Please try again later.', 408: 'Account information is currently unavailable. Please try again later.', 429: 'Account information is currently unavailable. Please try again later.', 404: 'Player not found.'}
   
    //useEffect will happen when a new name and tag are searched for or when the page loads 
    useEffect(() => {
        fetch(`/player/${name}/${tag}`)
        .then((res) => res.json())
        .then((data) =>  
        {if (data['status'] == 200) {
            //Remove loading message
            setFetching('')
            
            //Set ovrStats
            const ovr_stats = {kills: data['overallStats']}
            setOvrStats(ovr_stats)

            //Set matches
            const all_matches = data['matches']
            setMatches(all_matches)

            //Set otherInfo
            const other_info = {
                CurRank: data['curRank'],
                Elo: data['elo'],
                TierRank: data['tierRank'],
                TierPNG: data['tierPNG'],
                Card: data['card'],
                Lvl: data['lvl']
            }
            setOtherInfo(other_info)

        } else {

            //Explain error to user
            setFetching(responses[data['status']])
        }},
        );
  }, [name,tag])


    return (
        <>
            <div id='background'>
                <center>
                    <NavBar/><br></br>
                    <h1 id='loading'>{fetching}</h1>
                    {otherInfo!='' && 
                        <div id='player-header'>
                            <img id='player-card' src={otherInfo.Card}/>
                            <h1 id='player-title'>{name}#{tag}</h1>
                        </div>
                    }
                    {ovrStats!='' && <OvrStats ovrStats={ovrStats} otherInfo={otherInfo}/>}
                    
                    {matches!='' && <DisplayMatches matches={matches}/>}    
                </center>
            </div>
        </>
    )

 }

 //URL for getting rank png, <rank> is an integer corresponding to any given rank
 //https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/<rank>/largeicon.png 