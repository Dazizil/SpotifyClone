import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchToken, setLoading} from "../Slices/authSlice.js";
import axios from "axios";
import '/src/App.css'
import AlbumList from "../components/AlbumList.jsx";
import Aside from "../components/Aside/Aside.jsx";

const ArtistPage = () => {
    const {state} = useLocation()
    const artist =state?.albumData
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [artistAlbums, setArtistAlbums] = useState([]);
    const {token, error, loading} = useSelector(state => state.auth);

    useEffect(() => {
        if(!token) dispatch(fetchToken());

        setLoading(true);

        axios.get(`https://api.spotify.com/v1/artists/${artist.id}/albums`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                limit: 50,
            }
        })
            .then((res) => {
                setArtistAlbums(res.data.items);
        }) .catch((error)=>{
            console.log(error)
        }).finally(setLoading(false));
    })



    return (
        <div className={'Library'}>
            <Aside/>
        <div className={'albums-container'}>
            <div className={'albumPage-header-container'}>
                <div className={'albumPage-header-img-container'}>
                    <img className={'artistPage-header-img'} src={artist.images[0].url} alt="album" />
                </div>
                <div className={'albumPage-header-info-container'}>
                    <div className={'albumPage-album-name-font'}>{artist.name}</div>
                </div>
            </div>
            <span className={'section-naming'}>Albums</span>
            <AlbumList albums={artistAlbums} dispatch={dispatch} />
        </div>
            </div>
    );
};

export default ArtistPage;