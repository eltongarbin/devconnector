import axios from 'axios';
import jwt_decode from 'jwt-decode';

import history from '../utils/history';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    await axios.post('/api/users/register', userData);
    history.push('/login');
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Login - Get User Token
export const loginUser = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users/login', userData);

    localStorage.setItem('jwtToken', data.token);
    setAuthToken(data.token);

    const decoded = jwt_decode(data.token);
    dispatch(setCurrentUser(decoded));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
