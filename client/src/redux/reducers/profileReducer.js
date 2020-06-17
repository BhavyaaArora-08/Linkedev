import {
  CREATE_PROFILE,
  PROFILE_LOADED,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from "../actions/types";
const initialState = {
  userProfile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE: {
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
    }

    case PROFILE_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case CLEAR_PROFILE: {
      return {
        ...state,
        userProfile: null,
        repos: [],
        loading: false,
      };
    }
    case CREATE_PROFILE: {
      console.log(action.payload);
      return {
        userProfile: action.payload,
        profileExists: true,
        profileLoaded: true,
      };
    }
    default:
      return state;
  }
};

/**
 * types.js
 * action generator with interaction with api and also dispatch action object
 * reducer
 * component me integration
 */
