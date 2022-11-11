import React, { Component, useState } from 'react';

export const OvrStats = (ovrStats,otherInfo) => {

    return (
        <>
            <div id='ovr-stats-container'>
                <table id='other-info' align='left'>
                    <tr>
                        <td id='rank-png'><img/></td>
                    </tr>
                    <tr>
                        <td id='rank-title'>{otherInfo}</td>
                    </tr>
                </table>
                <table id='ovr-stats'>
                    <tr>
                        <td>Kills: {ovrStats}</td>
                        <td>Assists</td>
                        <td>Deaths</td>
                    </tr>
                    <tr>
                        <td>K/D</td>
                        <td>Score</td>
                        <td>bodyshots</td>
                    </tr>
                </table>
            </div> 
        </>
    )
}
