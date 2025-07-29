import React, {useState} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router';
import {SearchContext} from '../src/components/SearchContext.jsx';
import Library from './Pages/Library.jsx';
import NowPlaying from './Pages/NowPlaying.jsx';
import Playlist from './Pages/Playlist.jsx';
import AlbumPage from "./Pages/AlbumPage.jsx";
import ArtistPage from "./Pages/ArtistPage.jsx";
import Header from "./components/Header/Header.jsx";
import CategoryPage from "./Pages/CategoryPage.jsx";
import Player from "./components/Player/Player.jsx";
import MyProfile from "./Pages/MyProfile.jsx";

function App() {
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();
    return (
        <SearchContext.Provider value={searchValue}>
                <Header setSearchValue={setSearchValue}/>
            <Player/>
                <Routes>
                    <Route path="/Home" element={<Library />} />
                    <Route path="/NowPlaying" element={<NowPlaying />} />
                    <Route path="/Playlist" element={<Playlist />} />
                    <Route path="/AlbumPage" element={<AlbumPage />} />
                    <Route path="/ArtistPage" element={<ArtistPage />} />
                    <Route path="/" element={<Navigate to="/Home" replace />} />
                    <Route path="/CategoryPage" element={<CategoryPage />} />
                    <Route path="/MyProfile" element={<MyProfile />} />
                </Routes>

        </SearchContext.Provider>
    );
}

export default App;