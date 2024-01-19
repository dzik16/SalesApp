import { ADD_ITEM_LIST_FAILED, ADD_ITEM_LIST_SUCCESS } from '../types';
import { addListItemApi } from '../../service/api';

export const successAddItemList = (value) => ({
  type: ADD_ITEM_LIST_SUCCESS,
  payload: value,
});

export const failedAddItemList = (err) => ({
  type: ADD_ITEM_LIST_FAILED,
  payload: err
});

export const addDataItemLits = (value) => async (dispatch) => {
  await addListItemApi(value)
    .then((value) => {
      dispatch(successAddItemList(value.data));
    })
    .catch((err) => {
      dispatch(failedAddItemList(err.response?.message));
      if (err.response?.data.Message === "Authorization has been denied for this request.") {
        dispatch(getToken(config.bodyGetToken))
      }
    });
};
