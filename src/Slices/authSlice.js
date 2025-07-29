import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        loading: false,
        error: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setToken, setLoading, setError } = authSlice.actions;

// Thunk для получения токена
export const fetchToken = () => async (dispatch) => {
    const client_id = '06b3e604f526405c860f3003d0b033e4';
    const client_secret = '5cdae29f6db64361a4255f1c932e0ff1';

    dispatch(setLoading(true));

    try {
        const apiUrl = 'https://accounts.spotify.com/api/token';
        const data = new URLSearchParams();
        data.append('grant_type', 'client_credentials');

        const config = {
            headers: {
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const response = await axios.post(apiUrl, data, config);
        dispatch(setToken(response.data.access_token));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export default authSlice.reducer;