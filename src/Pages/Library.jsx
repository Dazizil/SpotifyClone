import React from 'react';
import '/src/App.css';
import Aside from "../components/Aside/Aside.jsx";
import NewReleases from "../components/NewReleases.jsx";
import Categories from "../components/Categories.jsx";
import SearchResult from "../components/SearchResult.jsx";

const Library = () => {
    return (
        <div className={'Library'}>
            <Aside/>
            <div className={'albums-container'}>
                <SearchResult/>
                <Categories/>
                <NewReleases numberOfItems={18}/>
            </div>
        </div>
    );
};

export default Library;