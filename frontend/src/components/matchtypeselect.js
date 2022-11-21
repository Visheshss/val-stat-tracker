import React, { Component, useState } from 'react';
import { capitalizeFirstLetter } from './match';

export const MatchTypeSelect = ({matches, onTypeChange}) => {

    const handleSubmit = (e) => {
        const matchType = e.target.value
        onTypeChange(matchType)
    };

    return (
        <>  
            <table id='match-type-select-table'>
                <tr>
                    <td>
                        <input class='match-type-btn' type='button' onClick={handleSubmit} value='All'/>
                    </td>
                    {Object.keys(matches).map((type) => {
                        
                        var type_caps = capitalizeFirstLetter(type)

                        if (type_caps == 'Spikerush') {
                            var type_caps = 'Spike Rush'
                        } 
                        
                        return (
                            <td>
                                <input class='match-type-btn' type='button' onClick={handleSubmit} value={type}></input>
                            </td>
                        );
                    })
                    }
                </tr>
            </table>
        </>
    )
}
