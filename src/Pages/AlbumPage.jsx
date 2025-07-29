import {useLocation} from 'react-router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../UI/Loader/Loader.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchToken} from "../Slices/authSlice.js";
import TrackList from "../components/TrackList.jsx";
import Aside from "../components/Aside/Aside.jsx";

const AlbumPage = () => {
    const { state } = useLocation();
    const album = state?.albumData;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [albumTracks, setAlbumTracks] = useState([]);

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);



    useEffect(() => {
        if (!token) dispatch(fetchToken());

        const getAlbumTracks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        limit: 50,
                        offset: 0
                    }
                });
                console.log(response.data.items);
                setAlbumTracks(response.data.items);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        // Добавляем задержку для избежания частых запросов
        const timer = setTimeout(() => {
            getAlbumTracks();
        }, 300);

        return () => clearTimeout(timer);
    }, [token]);

    if (!album) return <div>Album not found</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (loading) return <Loader/>;

    return (
        <div className={'Library'}>
            <Aside/>
            <div className={'albums-container'}>
            <div className={'albumPage-header-container'}>
                <div className={'albumPage-header-img-container'}>
                    <img className={'albumPage-header-img'} src={album.images[0].url} alt="album" />
                </div>
                    <div className={'albumPage-header-info-container'}>
                        <div>{album.type}</div>
                        <div className={'albumPage-album-name-font'}>{album.name}</div>
                        <div className={'albumPage-artist-container'}>{album.description}
                        {album.artists.map(artist => (
                           <div key={artist.id}>{artist.name} •</div>))}
                            <div className={'albumPage-track-info'}>{album.total_tracks} songs • {album.release_date}</div>
                        </div>
                    </div>
            </div>
            <TrackList tracks={albumTracks} />
            </div>
        </div>
    );
};

export default AlbumPage;