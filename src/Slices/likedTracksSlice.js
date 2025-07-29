import {createSlice} from "@reduxjs/toolkit";

const likedTracksSlice = createSlice({
    name: 'likedTracks',
    initialState: {
        tracks: [],
    },
    reducers: {
        toggleTrack: (state, action) => {
            const index = state.tracks.findIndex(track => track.id === action.payload.id);
            if (index >= 0) {
                state.tracks.splice(index, 1); // Удаляем если есть
            } else {
                state.tracks.push(action.payload); // Добавляем если нет
            }
        },
    }
});

export const {toggleTrack} = likedTracksSlice.actions;
export default likedTracksSlice.reducer;