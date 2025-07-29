import React from 'react';
import {NavLink} from "react-router";

const AlbumList = (props) => {
    return (
        <div className='categories-container'>
            {props.albums.map((album) => (
                <NavLink style={{height:'300px'}}
                    to="/AlbumPage"
                    state={{ albumData: album }}
                >
                    <div key={album.id} className="album-info">
                        {album.images.length > 0 && (
                            <img className='album-cover' src={album.images[0].url} alt={album.name} />
                        )}
                        <h2>{album.name}</h2>
                        <p>{album.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                </NavLink>
            ))}
        </div>
    );
};

export default AlbumList;