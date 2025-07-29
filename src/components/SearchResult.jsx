import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "./SearchContext.jsx";
import axios from "axios";
import Loader from "../UI/Loader/Loader.jsx";
import {NavLink} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchToken, setError, setLoading} from "../Slices/authSlice.js";

const SearchResult = () => {
    const searchValue = useContext(SearchContext);
    const [albumsData, setAlbumsData] = useState([]);
    const [artistsData, setArtistsData] = useState([]);

    const dispatch = useDispatch();
    const {token,loading, error} = useSelector(state => state.auth);

    useEffect(()=>{
        if(!token){
            dispatch(fetchToken())
        }
    }, [token,dispatch])

    useEffect(() => {
        if (!token) return;
        if (!searchValue) {
            setAlbumsData([]);
            setLoading(false);
            return;
        }

        const searchAlbums = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        q: searchValue,
                        type: 'album',
                        limit: 12
                    }
                });
                setAlbumsData(response.data.albums.items);
                console.log(response.data.albums.items);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        const searchArtists = async () => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        q: searchValue,
                        type: 'artist',
                        limit: 12
                    }
                });
                setArtistsData(response.data.artists.items);
            } catch (err){
                setError(err);
            }
        }
            searchArtists()
            searchAlbums();
    }, [token, searchValue]);

    if (error) return <div>Error: {error.message}</div>;
    if (loading) return <Loader/>;
    if(!searchValue) return <></>
    return (
        <div>
            <span className={'section-naming'}>Albums</span>
            <div style={{overflowY: 'hidden'}} className={'categories-container'}>
                {albumsData.map((album) => (
                        <NavLink
                            to="/AlbumPage"
                            state={{ albumData: album }}
                        >
                            <div
                                key={album.id} className="album-info">
                                {album.images.length > 0 && (
                                    <img className='album-cover' src={album.images[0].url} alt={album.name} />
                                )}
                                <h2>{album.name}</h2>
                                <p>{album.artists.map(artist => artist.name).join(', ')}</p>
                            </div>
                        </NavLink>
                    ))
                }
            </div>

            <span className={'section-naming'}>Artists</span>
            <div style={{overflowY: 'hidden'}} className={'categories-container'}>
                {artistsData.length > 0 ? (
                    artistsData.map((artist) => (
                        <NavLink
                            to="/ArtistPage"
                            state={{ albumData: artist }}
                        >
                            <div
                             key={artist.id} className="artist-info">
                                {artist.images.length > 0 && (
                                    <img className='artist-cover' src={artist.images[0].url} alt={artist.name} />
                                )}
                                <h2>{artist.name}</h2>
                            </div>
                        </NavLink>

                    ))
                ) : (
                    <div className="no-results">
                        {searchValue ? 'No albums found' : 'Enter search query to find albums'}
                    </div>
                )}
            </div>
        </div>
    )
}





export default SearchResult;