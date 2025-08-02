import React from 'react';
import classes from './MyInput.module.css';
import SearchSvg from '/src/assets/svg/search-svgrepo-com.svg'

const MyInput = (props) => {
    return (
        <div className={classes.myInputContainer}>
            <img style={{marginLeft:'8px'}} src={SearchSvg} alt={''}/>
            <input {...props} className={classes.myInput}>{props.children}</input>
        </div>
    );
};

export default MyInput;