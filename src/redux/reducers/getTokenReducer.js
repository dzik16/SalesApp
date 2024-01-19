import { GET_TOKEN_SUCCESS, GET_TOKEN_FAILED, GET_GENERATE_STATE } from "../types";

const initialState = {
  tokenReducer: {},
  generateState: Number
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        tokenReducer: action.payload
      };
    case GET_GENERATE_STATE:
      return {
        ...state,
        generateState: action.payload
      }
    case GET_TOKEN_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}


export default tokenReducer