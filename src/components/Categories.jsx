import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchToken, setError} from "../Slices/authSlice.js";
import axios from "axios";
import {NavLink} from "react-router";
import Loader from '/src/UI/Loader/Loader.jsx'

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const { token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        if (!token) return;

        const getCategories = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`https://api.spotify.com/v1/browse/categories`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        limit: 6
                    }
                });
                setCategoriesData(response.data.categories.items);
            } catch (err) {
                if (err.response?.status === 401) {
                    await dispatch(fetchToken());
                } else {
                    dispatch(setError(err.message));
                }
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, [token, dispatch]);
    if(loading) return <Loader/>
    return (
        <div style={{height:'fit-content'}}>
                <span className={'section-naming'}>Categories</span>
    <div className={'categories-container'}>
            {categoriesData.map((album) => (
                <NavLink className={'NavLink'}
                    to="/CategoryPage"
                    state={{ albumData: album }}
                >
                    <div key={album.id} className="album-info">
                        {album.icons.length > 0 && (
                            <img className='album-cover' src={album.icons[0].url} alt={album.name} />
                        )}
                        <h2 className={'album-name'}>{album.name}</h2>
                    </div>
                </NavLink>
            ))}
        </div>
</div>
    );
};

export default Categories;