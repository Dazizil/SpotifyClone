import React from 'react';
import {toggleTrack} from "../Slices/likedTracksSlice.js";
import {useDispatch, useSelector} from "react-redux";
import CheckIcon from '../assets/svg/CheckIcon.svg'
import PlusIcon from '../assets/svg/PlusIcon.svg'

const TrackList = (props) => {
    const { tracks: likedTracks } = useSelector(state => state.likedTracks);
    const dispatch = useDispatch(); // ✅ Получаем dispatch

    return (
        <div className={'albumPage-content-container'}>
            {props.tracks.map((track, index) => {
                const isLiked = likedTracks.some(t => t.id === track.id); // ✅ Используем some

                return (
                    <div key={track.id} className="track-item">
                        <div className={'track-number'}>{index + 1}</div>
                        <div className="track-artists">
                            <div
                                onClick={() => window.open(`https://open.spotify.com/track/${track.id}`, '_blank')}
                                className="track-name"
                                style={{ cursor: 'pointer' }}
                            >
                                {track.name}
                            </div>
                            <div className={'artists-container'}>
                                {track.artists.map(artist => (
                                    <div key={artist.id} className="artist-name">
                                        {artist.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className={'add-to-favourite-button'}
                            onClick={() => dispatch(toggleTrack(track))} // ✅ Вызываем dispatch
                        >
                            {isLiked ?
                                <img src={CheckIcon}/>
                                :
                                <img src={PlusIcon}/>
                            }
                        </button>

                        <div className={'track-duration'}>
                            {formatDuration(track.duration_ms)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
}

export default TrackList;