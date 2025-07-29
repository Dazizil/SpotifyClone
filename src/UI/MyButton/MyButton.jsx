import React from 'react';
import classes from './MyButton.module.css';

const MyButton = (props) => {
    return (
        <button {...props} className={props.active?classes.myButtonActive:classes.myButton} >{props.children}</button>
    );
};

export default MyButton;