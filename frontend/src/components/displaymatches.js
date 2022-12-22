import React, { useEffect } from 'react';
import { Match } from './match';

export const DisplayMatches = ({matches, matchtype, onStatsChange}) => {

    //curTypeStats will store stats for the selected game mode if the selected mode isn't 'All'.
    var curTypeStats = {'score': [0, 0], 'kills': 0, 'deaths': 0,
    'assists': 0, 'headshots': 0, 'bodyshots': 0, 'legshots': 0}

    useEffect(() => {
        //If matchtype has changed, then curTypeStats will have been updated with stats for
        //the newly selected game mode.
        statsChange(curTypeStats)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchtype]) 

    //statsChange is triggered when matchtype changes and sends the updated stats to player.js
    //using onStatsChange. In player.js, onStatsChange will trigger handleStatsChange which will
    //update the ovrStats state to curTypeStats if the selected game mode is not 'All'.
    const statsChange = (stats) => {
        onStatsChange(stats)
    };

    if (matchtype === 'Spike Rush') {
        matchtype = 'spikerush'
    } else {
        matchtype = matchtype.toLowerCase()
    }

    return (
        <>       
            <div id='matches'>
                <center>
                    {matchtype === 'all' &&
                    //Iterate through each stored match if the specified type of matches is all
                        <>
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
                        </>
                    }
                    {matchtype !== 'all' &&
                    //If a match type is specified, iterate through only games of that match type.
                        <>  
                            {Object.keys(matches[matchtype]).map((matchID) => {
                                const curMatch = matches[matchtype][matchID]
                                const curStats = curMatch['stats']

                                //Update curTypeStats to store the stats for the newly selected gamemode
                                curTypeStats['score'][0] += curStats['score']
                                curTypeStats['score'][1] += 1

                                curTypeStats['kills'] += curStats['kills']
                                curTypeStats['assists'] += curStats['assists']
                                curTypeStats['deaths'] += curStats['deaths']
                                curTypeStats['headshots'] += curStats['headshots']
                                curTypeStats['bodyshots'] += curStats['bodyshots']
                                curTypeStats['legshots'] += curStats['legshots']

                                return (
                                    <Match match={curMatch} matchType={matchtype}/>
                                    );
                                })
                            }
                        </>
                    }

                </center>
            </div>  
        </>
    )
}