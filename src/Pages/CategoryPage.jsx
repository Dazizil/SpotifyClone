import React from 'react';
import Aside from "../components/Aside/Aside.jsx";
import NewReleases from "../components/NewReleases.jsx";

const CategoryPage = () => {

    return (
        <div className={'Library'}>
            <Aside/>
            <div className={'albums-container'}>
                <NewReleases numberOfItems={50}/>
            </div>
        </div>
    );
};

export default CategoryPage;