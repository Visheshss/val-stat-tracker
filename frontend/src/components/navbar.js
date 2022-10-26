import React, { Component, useState } from 'react';
import { MiniSearchBar } from './minisearchbar';

export const NavBar = () => {

    return (
        <>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="">Login</a></li>
                <li><a href="">Placeholder</a></li>
                <li><a href="">Placeholder</a></li>
                <MiniSearchBar/>
            </ul>
        </>
    )
}
