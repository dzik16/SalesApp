import { DELETE_ITEM_LIST_FAILED, DELETE_ITEM_LIST_SUCCESS } from "../types";

const initialState = {
  deleteItemReducer: String,
};

const deleteItemListReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ITEM_LIST_SUCCESS:
      return {
        ...state,
        deleteItemReducer: action.payload
      };
    case DELETE_ITEM_LIST_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}


export default deleteItemListReducer