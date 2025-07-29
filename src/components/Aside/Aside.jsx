import React from 'react';
import MyButton from "../../UI/MyButton/MyButton.jsx";
import {NavLink} from "react-router";
import classes from "./Aside.module.css";

const Aside = () => {
    return (
            <div className={classes.asideContainer}>
                <NavLink to='/NowPlaying'>
                    {({ isActive }) => (
                        <MyButton active={isActive}>Now playing</MyButton>
                    )}
                </NavLink>
                <NavLink to='/Home'>
                    {({ isActive }) => (
                        <MyButton active={isActive}>Home</MyButton>
                    )}
                </NavLink>
                <NavLink to='/Playlist'>
                    {({ isActive }) => (
                        <MyButton active={isActive}>My Playlist</MyButton>
                    )}
                </NavLink>
            </div>
    );
};
export default Aside;