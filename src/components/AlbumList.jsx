import React from 'react';
import {NavLink} from "react-router";
import '/src/App.css'
import '/src/Album.css'
import '/src/Category.css'

const AlbumList = (props) => {
    return (
        <div className='categories-container'>
            {props.albums.map((album) => (
                <NavLink className={'NavLink'}
                    to="/AlbumPage"
                    state={{ albumData: album }}
                >
                    <div key={album.id} className="album-info">
                        {album.images.length > 0 && (
                            <img className='album-cover' src={album.images[0].url} alt={album.name} />
                        )}
                        <h2 className={'album-name'}>{album.name}</h2>
                        <p className={'artist-name'}>{album.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                </NavLink>
            ))}
        </div>
    );
};

export default AlbumList;