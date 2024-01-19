import { combineReducers } from "redux";
import orderListReducer from "./getOrderListReducer";
import listItemReducer from "./getItemListReducer";
import deleteItemListReducer from "./deleteItemListReducer";
import addItemListReducer from "./addItemListReducer";
import updateItemListReducer from "./updateItemListReducer";
import tokenReducer from "./getTokenReducer";
import loadingReducer from './loadingReducer'

const AllReducers = combineReducers({
  listOrder: orderListReducer,
  litsItem: listItemReducer,
  deleteLitsItem: deleteItemListReducer,
  addLitsItem: addItemListReducer,
  updateListItem: updateItemListReducer,
  accessToken: tokenReducer,
  generateState: tokenReducer,
  isLoading: loadingReducer
})

export default AllReducers;