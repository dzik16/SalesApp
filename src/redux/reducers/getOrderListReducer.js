import { GET_ORDER_LIST_FAILED, GET_ORDER_LIST_SUCCESS } from "../types";

const initialState = {
  listOrderReducer: [],
};

const orderListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        listOrderReducer: action.payload
      };
    case GET_ORDER_LIST_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}


export default orderListReducer