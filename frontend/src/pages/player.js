import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { OvrStats } from "../components/ovrstats";
import { DisplayMatches } from "../components/displaymatches";
import { MatchTypeSelect } from "../components/matchtypeselect";
import { Chart } from "../components/mmrchart";

export const Player = () => {
    const {name,tag} = useParams();
    const _name = name + ''
    const _tag = tag + ''

    const [fetching,setFetching] = useState('Please wait as we fetch stats');

    const [matches,setMatches] = useState();

    //ovrStats stores the stats of the current match type. However, matches of all types are considered
    //in the initial load, and if the user changes the match type, they can change it back to 'All'. defStats
    //stores stats for all games.
    const [ovrStats,setOvrStats] = useState('');
    const [defStats,setDefStats] = useState('');

    const [otherInfo,setOtherInfo] = useState('');
    const [matchType,setMatchType] = useState('All')
    const [mmr,setMMR] = useState('')

    //Responses to handle any API errors
    const responses = {'unknown': 'We were unable to retrieve stats for'+_name+'#'+_tag+'. Please try again.', 400: 'Please use the format username#tagline.', 403: 'Account information is currently unavailable. Please try again later.', 503: 'Account information is currently unavailable. Please try again later.', 408: 'Account information is currently unavailable. Please try again later.', 429: 'Account information is currently unavailable. Please try again later.', 404: 'Player not found.'}
   
    //useEffect will happen when a new name and tag are searched for or when the page loads 
    useEffect(() => {
        fetch(`/player/${name}/${tag}`)
        .then((res) => res.json())
        .then((data) =>  
        {if (data['status'] == 200) {
            //Remove loading message
            setFetching('')
            
            //Set ovrStats
            const ovr_stats = data['overallStats']
            setOvrStats(ovr_stats)
            setDefStats(ovr_stats)

            //Set matches   
            const all_matches = data['matches']
            setMatches(all_matches)

            //Set otherInfo
            const other_info = {
                'CurRank': data['curRank'],
                'Elo': data['elo'],
                'TierRank': data['tierRank'],
                'TierPNG': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/'+ data['tierPNG'] + '/largeicon.png',
                'Card': data['card'],
                'Lvl': data['lvl']
            }
            setOtherInfo(other_info)

        } else {

            //Explain error to user
            setFetching(responses[data['status']])
        }},
        );
    }, [name,tag])
  
    const handleTypeChange = (e) => {
        setMatchType(e)
    }

    const handleStatsChange = (e) => {
        //If the selected match type is 'All', set the ovrStats to defStats, which stores
        //stats for games of all types. Otherwise, update ovrStats to stats for the selected
        //gamemode 
        if (matchType == 'All') {
            setOvrStats(defStats)
        } else {
            setOvrStats(e)
        }
    }

    const getMMR = () => {
        fetch("/mmr", {
          method: "POST",
          body: JSON.stringify({ content: [_name,_tag] }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Accept': 'application/json'
          },
        })
          .then((res) => res.json())
          .then((info) => {
            setMMR(info['res'])
          });
      }
      
      
    //If the currently selected game mode is competitive, use a useEffect hook to retrieve 
    //the player's MMR history from the backend.
    useEffect(() => {
        if (matchType=='Competitive') {
            getMMR()
        }
    }, [matchType])

    return (
        <>
            <div id='background'>
                <center>
                    <NavBar/><br></br>
                    <h1 id='loading'>{fetching}</h1>
                    {otherInfo!='' && 
                        <div id='player-header'>
                            <img id='player-card' src={otherInfo['Card']}/>
                            <h1 id='player-title'>{_name}#{_tag}</h1>
                        </div>
                    }
                    {matches!='' && ovrStats['deaths'] > 0 && <MatchTypeSelect matches={matches} onTypeChange={handleTypeChange}/>}
                    {matchType=='Competitive' && <Chart mmrData={mmr}/>}
                    {ovrStats!='' && <OvrStats ovrStats={ovrStats} otherInfo={otherInfo}/>}
                    {matches!='' && ovrStats['deaths'] > 0 && <DisplayMatches matches={matches} matchtype={matchType} onStatsChange={handleStatsChange}/>}<br/><br/>
                </center>
            </div>
        </>
    )

 }
