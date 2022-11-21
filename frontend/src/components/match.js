import React, { Component, useState } from 'react';
import { calcShots } from './ovrstats';

import headRed from '../images/head-red.png';
import bodyRed from '../images/body-red.png';
import legsRed from '../images/legs-red.png';
import headWhite from '../images/head-white.png';
import bodyWhite from '../images/body-white.png';
import legsWhite from '../images/legs-white.png';

export const capitalizeFirstLetter = (str) => {
    if (str == 'spikerush') {
        return 'Spike Rush'
    } else {
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        return str2
    }
  }

export const Match = ({ match, matchType }) => {
    const stats = match['stats']

    //Calculate information needed to display breakdown of where the  player shoots
    const shotInfo = calcShots(stats['headshots'],stats['bodyshots'],stats['legshots'])
    const bodyParts = shotInfo[0]
    const shotNums = shotInfo[1]
    var matchType = capitalizeFirstLetter(matchType)

    //dictionary storing keys to each matchtype's icon
    const matchTypeIcons = {
        'Unrated': '96BD3920-4F36-D026-2B28-C683EB0BCAC5',
        'Competitive': '96bd3920-4f36-d026-2b28-c683eb0bcac5',
        'Deathmatch': 'A8790EC5-4237-F2F0-E93B-08A8E89865B2',
        'Escalation': 'A4ED6518-4741-6DCB-35BD-F884AECDC859',
        'Onboarding': 'D2B4E425-4CAB-8D95-EB26-BB9B444551DC',
        'Replication': '4744698A-4513-DC96-9C22-A9AA437E4A58',
        'Spike Rush': 'E921D1E6-416B-C31F-1291-74930C330B7B',
        'Practice': 'E2DC3878-4FE5-D132-28F8-3D8C259EFCC6',
        'Snowball': '57038D6D-49B1-3A74-C5EF-3395D9F23A97'
    }

    const icon = 'https://media.valorant-api.com/gamemodes/' + matchTypeIcons[matchType] + '/displayicon.png'

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
                        {matchType} <img src={icon}/>   <br/><br/>
                        {match['map']} 
                    </h3>
                </td>
                <td class='match-data'></td>
                {matchType!='deathmatch' && <td class='match-data match-score'>{match['score']}</td>}
                <td class='match-data'>
                    <h3 class='match-stat'>
                        K/D/A <br/>
                        {stats['kills']}/{stats['deaths']}/{stats['assists']}
                    </h3>
                </td>
                <td class='match-data'>
                    <h3 class='match-stat'>
                        Score <br/>
                        {stats['score']}
                    </h3>
                </td>
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
