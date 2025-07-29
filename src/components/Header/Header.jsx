import React, {useRef} from 'react';
import MyInput from "../../UI/MyInput/MyInput.jsx";
import classes from "./Header.module.css";
import {NavLink} from "react-router";
import AccountImage from "../../assets/svg/AccountImage.svg";

const Header = ({ setSearchValue }) => {
    const search = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (search.current && search.current.value.trim()) {
            setSearchValue(search.current.value.trim());
            search.current.value = '';
        }
    }
    return (
        <div className={classes.headerContainer}>
            <form onSubmit={handleSubmit}>
                <MyInput
                    ref={search}
                    placeholder='search by title'
                />
            </form>
            <NavLink to='/MyProfile'>
                <img src={AccountImage} className='profile-circle'/>
            </NavLink>
        </div>
    );
};

export default Header;