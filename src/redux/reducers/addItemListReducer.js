import { ADD_ITEM_LIST_FAILED, ADD_ITEM_LIST_SUCCESS } from "../types";

const initialState = {
  addDataItemLits: {},
};

const addItemListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_LIST_SUCCESS:
      return {
        ...state,
        addDataItemLits: action.payload
      };
    case ADD_ITEM_LIST_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}


export default addItemListReducer