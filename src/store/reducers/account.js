import { LOGIN, LOGOUT } from '../actions/account';

const initialState = {
  loading: true,
  user: null
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload;
      return {
        loading: false,
        user: user
      };
    }
    case LOGOUT: {
      return {
        loading: false,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
