import axios from 'axios';

import history from '../utils/history';
import {
  GET_PROFILE,
  GET_PROFILES,
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

export const getProfileByHandle = (handle) => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    const { data } = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILE, payload: null });
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

export const addExperience = (expData) => async (dispatch) => {
  try {
    await axios.post('/api/profile/experience', expData);
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const addEducation = (eduData) => async (dispatch) => {
  try {
    await axios.post('/api/profile/education', eduData);
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/profile/education/${id}`);
    dispatch({ type: GET_PROFILE, payload: data });
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

export const getProfiles = () => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    const { data } = await axios.get('/api/profile/all');
    dispatch({ type: GET_PROFILES, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILES, payload: null });
  }
};
