import React, { Component, useState } from 'react';

import headRed from '../images/head-red.png';
import bodyRed from '../images/body-red.png';
import legsRed from '../images/legs-red.png';
import headWhite from '../images/head-white.png';
import bodyWhite from '../images/body-white.png';
import legsWhite from '../images/legs-white.png';

export const calcShots = (headShots,bodyShots,legShots) => {

    //Calculate which part of the body the user hits the most in game
    var bodyParts = {}
    const totalShots = headShots + bodyShots + legShots
    
    //Calculate percentage breakdown of where the user hits players. Round to 1 decimal place
    var headShots = (headShots/totalShots) * 100
    var headShots = Number(headShots.toFixed(1));
    var bodyShots = (bodyShots/totalShots) * 100
    var bodyShots = Number(bodyShots.toFixed(1));
    var legShots = (legShots/totalShots) * 100
    var legShots = Number(legShots.toFixed(1));
    
    //Identify the most shot region and pick body icons appropriately. The part of the body
    //that gets shot the most will be red, while the other two will be white.
    const shots = [headShots, bodyShots, legShots]
    const maxShots = Math.max.apply(Math, shots);

    if (maxShots==headShots) {
        bodyParts.head = headRed
        bodyParts.body = bodyWhite
        bodyParts.legs = legsWhite
    } else if (maxShots==bodyShots) {
        bodyParts.head = headWhite
        bodyParts.body = bodyRed
        bodyParts.legs = legsWhite
    } else {
        bodyParts.head = headWhite
        bodyParts.body = bodyWhite
        bodyParts.legs = legsRed
    }
    
    return ([bodyParts,shots])
}

export const OvrStats = ({ ovrStats, otherInfo }) => {
    
    //Some users have information that can be retrieved using the API but 
    //still don't have any recent enough matches to draw stats from. Verify that the user 
    //has at least 1 recent game played. 
    
    const gamesPlayed = ovrStats['score'][1]
    if (gamesPlayed > 0) {

        //Calculate average score across all matches
        const totalScore = ovrStats['score'][0]
        var avgScore = totalScore / gamesPlayed 
        var avgScore = Number(avgScore.toFixed(0));

        //Calculate kills/deaths ratio
        var kills = ovrStats['kills']
        var deaths = ovrStats['deaths']
        var assists = ovrStats['assists']

        var KD = kills / deaths
        var KD = Number(KD.toPrecision(3));
        var KAD = (kills+assists) / deaths
        var KAD = Number(KAD.toPrecision(3));

        const shotInfo = calcShots(ovrStats['headshots'],ovrStats['bodyshots'],ovrStats['legshots'])
        var bodyParts = shotInfo[0]
        var shotNums = shotInfo[1]
    }
    
    return (
        <>  

            <div id='ovr-stats-container'>
                <table id='other-info' align='left'>
                    <tr>
                        <td id='rank-png-container'> <img id='rank-png' src={otherInfo.TierPNG}/> </td>
                    </tr>
                    <tr>
                        <td id='rank-title'>
                        {otherInfo['CurRank']} <br></br> 
                        {otherInfo['Elo']} Elo
                        </td>
                    </tr>
                </table>

                {gamesPlayed > 0 &&
                <>
                    <table id='ovr-stats'>
                        <tr>
                            <td>Kills: {kills}</td>
                            <td>Assists: {assists}</td>
                            <td>Deaths: {deaths}</td>
                        </tr>
                        <tr>
                            <td>K/D: {KD}</td>
                            <td>Score: {avgScore}</td>
                            <td>KAD: {KAD}</td>
                        </tr>
                    </table>

                    <table id='body-shots'>
                        <tr>
                            <td class='body-parts'> <img src={bodyParts.head} class='body-img'/> </td>
                            
                        </tr>
                        <tr>
                            <td class='body-parts'> <img src={bodyParts.body} class='body-img' id='torso'/> </td>
                            
                        </tr>
                        <tr>
                            <td class='body-parts'> <img src={bodyParts.legs} class='body-img'/> </td>
                            
                        </tr>
                    </table>
                    
                    <table id='shots-count'>
                        <tr>
                            <td class='body-parts shot-nums'>{shotNums[0]}%</td>
                        </tr>
                        <tr>
                            <td class='body-parts shot-nums'>{shotNums[1]}%</td>
                        </tr>
                        <tr>
                            <td class='body-parts shot-nums'>{shotNums[2]}%</td>
                        </tr>
                    </table>

                </>
                } 

                {gamesPlayed == 0 &&
                    <h1 id='stats-unavailable'>Stats are unavailable because no recent games can be found for this user.</h1>
                 }
            </div>
                  
        </>
    )
}
