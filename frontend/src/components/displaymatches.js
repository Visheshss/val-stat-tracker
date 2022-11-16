import React, { Component, useState } from 'react';
import { Match } from './match';

export const DisplayMatches = ({matches}) => {

    return (
        //Iterate through each stored match
        <>       
            <div id='matches'>
                <center>
                {Object.keys(matches).map((type) => {
                    return (
                        Object.keys(matches[type]).map((matchID) => {
                            return (
                                <Match match={matches[type][matchID]} matchType={type}/>
                            );
                        })
                    );
                })
                }
                </center>
            </div>  
        </>
    )
}
