import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST
} from './types';

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

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    await axios.post(`/api/posts/like/${id}`);
    dispatch(getPosts());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    await axios.post(`/api/posts/unlike/${id}`);
    dispatch(getPosts());
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
