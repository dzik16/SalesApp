import { UPDATE_ITEM_LIST_FAILED, UPDATE_ITEM_LIST_SUCCESS } from "../types";

const initialState = {
  updateDataItemList: {},
};

const updateItemListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ITEM_LIST_SUCCESS:
      return {
        ...state,
        updateDataItemList: action.payload
      };
    case UPDATE_ITEM_LIST_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}


export default updateItemListReducer