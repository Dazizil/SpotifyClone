import React from 'react';
import './LoaderForTracks.css';
import Aside from "../../components/Aside/Aside.jsx";

const LoaderForTracks = () => {
    const mopData = [
        {id:'1'},
        {id:'2'},
        {id:'3'},
        {id:'4'},
        {id:'5'},
        {id:'6'},
    ]

    return (
        <div className={'Library'}>
            <Aside/>
        <div className={'mop-albumPage-content-container'}>
            <div className={'albums-container'}>
                <div className={'mop-albumPage-header-container'}>
                    <div className={'mop-albumPage-header-img-container'}>
                    </div>
                    <div className={'mop-albumPage-header-info-container'}>
                        <div className={'mop-type'}></div>
                        <div className={'mop-albumPage-album-name-font'}></div>
                        <div className={'mop-albumPage-artist-container'}>
                                <div></div>
                            <div className={'mop-albumPage-track-info'}></div>
                        </div>
                    </div>
                </div>

            {mopData.map((track) => (
                    <div key={track.id} className="mop-item">
                        <div className={'mop-number'}></div>
                        <div className="mop-artists">
                            <div className={'mop-track'}></div>
                            <div className={'mop-artist'}></div>
                        </div>
                        <div className={'mop-button'}></div>
                        <div className={'mop-track-duration'}></div>
                    </div>
            ))}
        </div>
        </div>
        </div>
    )
            }

export default LoaderForTracks;