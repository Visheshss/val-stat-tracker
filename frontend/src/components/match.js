import React, { Component, useState } from 'react';
import { calcShots } from './ovrstats';

import headRed from '../images/head-red.png';
import bodyRed from '../images/body-red.png';
import legsRed from '../images/legs-red.png';
import headWhite from '../images/head-white.png';
import bodyWhite from '../images/body-white.png';
import legsWhite from '../images/legs-white.png';

export const Match = ({ match, matchType }) => {
    const stats = match['stats']
    const shotInfo = calcShots(stats['headshots'],stats['bodyshots'],stats['legshots'])
    const bodyParts = shotInfo[0]
    const shotNums = shotInfo[1]

    if (match['hasWon'] == true) {
        var matchColor = 'match-data match-win'
    } else {
        var matchColor = 'match-data match-loss'
    }

    return (
        <>       
            <tr class='match-row'>
                <td class={matchColor}>
                    <h3>
                        <img class='agent-png' src={match['agentPNG']}></img> <br/>
                            {match['agentName']} 
                    </h3>
                </td>
                <td class='match-data'>
                    <h3 class='match-text'>
                        {matchType} <br/><br/>
                        {match['map']}
                    </h3>
                </td>
                <td class='match-data'></td>
                {matchType!='deathmatch' && <td class='match-data'>{match['score']}</td>}
                <td class='match-data'></td>
                <td class='match-data'>K/D/A: {stats['kills']}/{stats['deaths']}/{stats['assists']}</td>
                <td class='match-data'>Score: {stats['score']}</td>
                <td class='match-data'>
                    <table id='body-shots-mini'>
                        <tr>
                            <td class='body-parts-mini'> <img src={bodyParts.head} class='body-img-mini'/> </td>
                            
                        </tr>
                        <tr>
                            <td class='body-parts-mini'> <img src={bodyParts.body} class='body-img-mini' id='torso-mini'/> </td>
                            
                        </tr>
                        <tr>
                            <td class='body-parts-mini'> <img src={bodyParts.legs} class='body-img-mini'/> </td>
                            
                        </tr>
                    </table>
                    
                    <table id='shots-count-mini'>
                        <tr>
                            <td class='body-parts-mini shot-nums-mini'>{shotNums[0]}%</td>
                        </tr>
                        <tr>
                            <td class='body-parts-mini shot-nums-mini'>{shotNums[1]}%</td>
                        </tr>
                        <tr>
                            <td class='body-parts-mini shot-nums-mini'>{shotNums[2]}%</td>
                        </tr>
                    </table>
                </td>
                
            </tr>
        </>
    )
}
