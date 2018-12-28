import axios from 'axios';

import { ADD_POST, GET_ERRORS } from './types';

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
