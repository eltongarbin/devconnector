import axios from 'axios';

import { ADD_POST, GET_ERRORS, POST_LOADING, GET_POSTS } from './types';

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

export const addPost = (postData) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/posts', postData);
    dispatch({ type: ADD_POST, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getPosts = () => async (dispatch) => {
  dispatch(setPostLoading());

  try {
    const { data } = await axios.get('/api/posts');
    dispatch({ type: GET_POSTS, payload: data });
  } catch (error) {
    dispatch({ type: GET_POSTS, payload: null });
  }
};
