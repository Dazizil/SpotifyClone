import {createRoot} from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router';
import App from './App.jsx';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import authSlice from './Slices/authSlice.js';
import likedTracksSlice from "./Slices/likedTracksSlice.js";
import {persistReducer, persistStore,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';

const rootReducer = combineReducers({
    auth: authSlice,
    likedTracks: likedTracksSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['likedTracks','auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);