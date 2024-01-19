import { DELETE_ITEM_LIST_FAILED, DELETE_ITEM_LIST_SUCCESS } from '../types';
import { deleteListItemApi } from '../../service/api';

export const successDeleteItemList = (value) => ({
  type: DELETE_ITEM_LIST_SUCCESS,
  payload: value,
});

export const failedDeleteItemList = (err) => ({
  type: DELETE_ITEM_LIST_FAILED,
  payload: err
});

export const deleteDataItemLits = (value) => async (dispatch) => {
  await deleteListItemApi(value)
    .then((value) => {
      dispatch(successDeleteItemList(value.data.Description));
    })
    .catch((err) => {
      dispatch(failedDeleteItemList(err.response));
      if (err.response?.data && err.response?.data.Message === "Authorization has been denied for this request.") {
        dispatch(getToken(config.bodyGetToken))
      }
    });
};
