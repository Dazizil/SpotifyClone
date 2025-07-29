import React, {useEffect, useState} from 'react';
import '/src/App.css'
import axios from "axios";
import Loader from "../UI/Loader/Loader.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchToken, setError, setLoading} from "../Slices/authSlice.js";
import AlbumList from "./AlbumList.jsx";

const NewReleases = (props) => {
    const [albumsData, setAlbumsData] = useState([]);
    const dispatch = useDispatch();
    const { token, loading, error } = useSelector(state => state.auth);

    useEffect(() => {
        if(!token) dispatch(fetchToken());
        setLoading(true);

        axios.get('https://api.spotify.com/v1/browse/new-releases',{
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                limit: props.numberOfItems,
                offset: 0,
                country: 'RU'
            }
        }).then((response)=>{
            setAlbumsData(response.data.albums.items);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        })
    },[token]);

    if (loading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <span className={'section-naming'}>New Releases</span>
            <AlbumList albums={albumsData} dispatch={dispatch} />
        </div>
    );
};

export default NewReleases;