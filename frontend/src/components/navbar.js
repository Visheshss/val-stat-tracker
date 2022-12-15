import React, { Component, useState } from 'react';
import { MiniSearchBar } from './minisearchbar';

export const NavBar = () => {

    return (
        <>
            <ul>
                <li><a href="/">Home</a></li>
                <MiniSearchBar/>
            </ul>
        </>
    )
}
