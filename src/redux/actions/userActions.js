import axios from 'axios';
import api from './api'
import { 
    SET_USER, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_UNAUTHENTICATED, 
    DELETE_USER, 
    FILTER_BY_NAME 
} from '../types';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    api.postResult().login(userData)
        .then(res =>{
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const signupUser = (data, onSuccess, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    api.postResult().create(data)
        .then(res =>{
            // setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/')
            onSuccess()
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.data
            })
        })
}

export const updateUser = (id, data, onSuccess, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    api.postResult().update(id, data)
        .then(res => {
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/')
            onSuccess()
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            })
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('MDBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: SET_UNAUTHENTICATED
    });
}


export const getUserData = () => dispatch => {
    api.postResult().fetchAll()
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const Delete = (id, onSuccess) => dispatch => {
    api.postResult().delete(id)
        .then(res => {
            dispatch({
                type: DELETE_USER,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const filterByName = payload => ({
    type: FILTER_BY_NAME,
    payload: payload
})


const setAuthorizationHeader = (token) => {
    const MDBIdToken = `Bearer ${token}`;
    localStorage.setItem('MDBIdToken', MDBIdToken);
    axios.defaults.headers.common['Authorization'] = MDBIdToken;
}