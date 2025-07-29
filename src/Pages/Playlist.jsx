import React from 'react';
import '/src/App.css'
import {useDispatch, useSelector} from "react-redux";
import Aside from "../components/Aside/Aside.jsx";
import TrackList from "../components/TrackList.jsx";

const Playlist = () => {
    const dispatch = useDispatch();
    const {tracks} = useSelector(state => state.likedTracks);
    return (
        <div className={'Library'}>
            <Aside/>
            <div className={'albums-container'}>
                <div className={'albumPage-header-container'}>
                    <div className={'albumPage-header-img-container'}>
                        <img className={'albumPage-header-img'} src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg" alt="album" />
                    </div>
                    <div className={'albumPage-header-info-container'}>
                        <div className={'albumPage-album-name-font'}>My playlist</div>
                        <div className={'albumPage-artist-container'}>
                            <div className={'albumPage-track-info'}>{tracks.length} songs</div>
                        </div>
                    </div>
                </div>
                <TrackList tracks={tracks} dispatch={dispatch} />
            </div>
        </div>

    );
};

export default Playlist;