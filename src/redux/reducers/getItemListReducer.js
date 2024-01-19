import { GET_ITEM_LIST_SUCCESS, GET_ITEM_LIST_FAILED, CLEAR_ITEM_LIST } from "../types";

const initialState = {
  listItemReducer: [],
};

const itemListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_LIST_SUCCESS:
      return {
        ...state,
        listItemReducer: action.payload
      };
    case GET_ITEM_LIST_FAILED:
      return {
        ...state
      };
    case CLEAR_ITEM_LIST:
      return {
        listItemReducer: [],
      }
    default:
      return state;
  }
}


export default itemListReducer