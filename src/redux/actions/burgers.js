import axios from 'axios';

export const setLoaded = (payload) => ({
    type: 'SET_LOADED',
    payload,
});

export const fetchBurgers = (sortBy, category) => (dispatch) => {
    dispatch({
        type: 'SET_LOADED',
        payload: false,
    });

    axios
        .get(
            `/burgers?${
                category !== null ? `category=${category}` : ''
            }&_sort=${sortBy.type}&_order=${sortBy.order}`
        )
        .then(({ data }) => {
            dispatch(setBurgers(data));
        });
};

export const setBurgers = (items) => ({
    type: 'SET_BURGER',
    payload: items,
});
