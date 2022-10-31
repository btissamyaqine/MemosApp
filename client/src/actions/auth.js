import { AUTH } from '../constants/actionType';
import * as api from '../api/index.js';

export const signin = (form, router) => async (dispatch) => {
  try {
    // signin the user
    
    const { data } = await api.signIn(form);
    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (form, router) => async (dispatch) => {
  try {
    // signup the user

    const { data } = await api.signUp(form);
    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};
