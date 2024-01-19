import { UPDATE_ITEM_LIST_FAILED, UPDATE_ITEM_LIST_SUCCESS } from '../types';
import { updateListItemApi } from '../../service/api';
import { setLoginLoading } from './loading';

export const successUpdateItemList = (value) => ({
  type: UPDATE_ITEM_LIST_SUCCESS,
  payload: value,
});

export const failedUpdateItemList = (err) => ({
  type: UPDATE_ITEM_LIST_FAILED,
  payload: err
});

export const updateDataItemList = (value) => async (dispatch) => {
  await updateListItemApi(value)
    .then((value) => {
      dispatch(successUpdateItemList(value.data));
    })
    .catch((err) => {
      dispatch(failedUpdateItemList(err.response.message));
      if (err.response?.data && err.response?.data.Message === "Authorization has been denied for this request.") {
        dispatch(getToken(config.bodyGetToken))
      }
    });
};
