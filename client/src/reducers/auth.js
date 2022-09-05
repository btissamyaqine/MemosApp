import { AUTH, LOGOUT } from '../constants/actionType';


const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      // localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      // return { ...state, authData: action.data, loading: false, errors: null };
      console.log(action?.data);
    // case LOGOUT:
    //   localStorage.clear();
    return state;

    //   return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;