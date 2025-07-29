import React from 'react';
import '/src/App.css'
import Aside from "../components/Aside/Aside.jsx";

const NowPlaying = () => {
    return (
        <div className={'Library'}>
            <Aside/>
            <h1 style={{color:'white'}}>Это страница NowPlaying</h1>
        </div>
    );
};

export default NowPlaying;