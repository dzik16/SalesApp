import { GET_ORDER_LIST_FAILED, GET_ORDER_LIST_SUCCESS } from '../types';
import { getListOrderApi } from '../../service/api';
import { setLoginLoading } from './loading';

export const successGetOrderList = (value) => ({
  type: GET_ORDER_LIST_SUCCESS,
  payload: value,
});

export const failedGetOrderList = (err) => ({
  type: GET_ORDER_LIST_FAILED,
  payload: err
});

export const getDataOrderLits = () => async (dispatch) => {
  dispatch(setLoginLoading(true))
  await getListOrderApi()
    .then((value) => {
      dispatch(successGetOrderList(value.data));
      dispatch(setLoginLoading(false))
    })
    .catch((err) => {
      dispatch(failedGetOrderList(err.response));
      if (err.response?.data && err.response?.data.Message === "Authorization has been denied for this request.") {
        dispatch(getToken(config.bodyGetToken))
        dispatch(setLoginLoading(false))
      }
      dispatch(setLoginLoading(false))
    });
};
