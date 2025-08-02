import React from 'react';
import './Loader.css'; // Лучше создать отдельный CSS файл для этого компонента

const Loader = () => {
    const mopData = [
        {id:'1'},
        {id:'2'},
        {id:'3'},
        {id:'4'},
        {id:'5'},
        {id:'6'},
    ]

    return (
        <div style={{overflowY: 'hidden'}} className="categories-container">
            {mopData.map((album) => (
                <div key={album.id} className="mop-info">
                    <div className="mop-cover"></div>
                    <div className="mop-album-name"></div>
                    <div className="mop-name"></div>
                </div>
            ))}
        </div>
    );
};

export default Loader;