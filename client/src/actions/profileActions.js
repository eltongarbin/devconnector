import axios from 'axios';

import history from '../utils/history';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

export const getCurrentProfile = () => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    const { data } = await axios.get('/api/profile');
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILE, payload: {} });
  }
};

export const createProfile = (profileData) => async (dispatch) => {
  try {
    await axios.post('/api/profile', profileData);
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');
      dispatch({ type: SET_CURRENT_USER, payload: {} });
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
