import {useLocation} from 'react-router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchToken, setError} from "../Slices/authSlice.js";
import TrackList from "../components/TrackList.jsx";
import '/src/AlbumPage.css'
import LoaderForTracks from "../UI/LoaderForTracks/LoaderForTracks.jsx";
import Aside from "../components/Aside/Aside.jsx";

const AlbumPage = () => {
    const { state } = useLocation();
    const album = state?.albumData;
    const [albumTracks, setAlbumTracks] = useState([]);
    const dispatch = useDispatch();
    const { token, loading: authLoading } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [error, setLocalError] = useState(null);

    useEffect(() => {
        if (!token && !authLoading) {
            dispatch(fetchToken());
        }
    }, [token, authLoading, dispatch]);

    useEffect(() => {
        if (!token || !album) return;

        const getAlbumTracks = async () => {
            try {
                setLoading(true);
                setLocalError(null);
                const response = await axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        limit: 50,
                        offset: 0
                    }
                });
                setAlbumTracks(response.data.items);
            } catch (err) {
                setLocalError(err.message);
                dispatch(setError(err));
            } finally {
                setLoading(false);
            }
        };

        getAlbumTracks();
    }, [token, album, dispatch]);

    if (!album) return <div className="error-message">Album not found</div>;
    if (authLoading || loading) return <LoaderForTracks />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className={'Library'}>
            <Aside/>
            <div className={'albums-container'}>
                <div className={'albumPage-header-container'}>
                    <div className={'albumPage-header-img-container'}>
                        <img
                            className={'albumPage-header-img'}
                            src={album.images[0]?.url}
                            alt="album"
                            onError={(e) => {
                                e.target.src = 'path-to-default-image.jpg';
                            }}
                        />
                    </div>
                    <div className={'albumPage-header-info-container'}>
                        <div className={'type'}>{album.type}</div>
                        <h1 className={'albumPage-album-name-font'}>{album.name}</h1>
                        <div className={'albumPage-artist-container'}>
                            {album.description}
                            {album.artists?.map((artist, index) => (
                                <span key={artist.id}>
                                    {artist.name}
                                    {index < album.artists.length - 1 ? ' • ' : ''}
                                </span>
                            ))}
                            <div className={'albumPage-track-info'}>
                                {album.total_tracks} songs • {album.release_date?.slice(0, 4)}
                            </div>
                        </div>
                    </div>
                </div>
                <TrackList tracks={albumTracks} />
            </div>
        </div>
    );
};

export default AlbumPage;