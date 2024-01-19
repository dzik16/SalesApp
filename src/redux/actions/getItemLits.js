import { GET_ITEM_LIST_SUCCESS, GET_ITEM_LIST_FAILED, CLEAR_ITEM_LIST } from '../types';
import { getListItemApi } from '../../service/api';
import { getToken } from './getToken';
import config from '../../config'
import { setLoginLoading } from './loading';

export const successGetItemList = (value) => ({
  type: GET_ITEM_LIST_SUCCESS,
  payload: value,
});

export const failedGetItemList = (err) => ({
  type: GET_ITEM_LIST_FAILED,
  payload: err
});

export const clearItemList = () => ({
  type: CLEAR_ITEM_LIST
})

export const getDataItemLits = () => async (dispatch) => {
  dispatch(setLoginLoading(true))
  await getListItemApi()
    .then((value) => {
      dispatch(successGetItemList(value.data));
      dispatch(setLoginLoading(false))
    })
    .catch((err) => {
      dispatch(failedGetItemList(err.response));
      if (err.response?.data && err.response?.data.Message === "Authorization has been denied for this request.") {
        dispatch(getToken(config.bodyGetToken))
      }
      if (err.response?.status === 404) {
        dispatch(clearItemList())
        dispatch(setLoginLoading(false))
      }
      dispatch(setLoginLoading(false))
    });
};

