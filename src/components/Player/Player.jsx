import React from 'react';
import classes from "./Player.module.css";

const Player = () => {
    return (
        <div className={classes.playerContainer}>
            <audio className={classes.player} controls></audio>
        </div>
    );
};

export default Player;