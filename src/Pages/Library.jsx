import React from 'react';
import '/src/App.css';
import '/src/Album.css'
import Aside from "../components/Aside/Aside.jsx";
import SearchResult from "../components/SearchResult.jsx";
import Categories from "../components/Categories.jsx";
import NewReleases from "../components/NewReleases.jsx";

const Library = () => {
    return (
        <div className={'Library'}>
            <Aside/>
            <div className={'albums-container'}>
                <SearchResult/>
                <Categories/>
                <NewReleases/>
            </div>
        </div>
    );
};

export default Library;