import { GET_TOKEN_SUCCESS, GET_TOKEN_FAILED, GET_GENERATE_STATE } from '../types';
import { getTokenApi } from '../../service/api';
import { generateRandomNumber } from '../../config';
import { setLoginLoading } from './loading';

export const successGetToken = (value) => ({
  type: GET_TOKEN_SUCCESS,
  payload: value,
});

export const failedGetToken = (err) => ({
  type: GET_TOKEN_FAILED,
  payload: err
});

export const getGenerateState = (value) => ({
  type: GET_GENERATE_STATE,
  payload: value
})

export const getToken = (body) => async (dispatch) => {
  dispatch(setLoginLoading(true))
  await getTokenApi(body)
    .then((value) => {
      dispatch(successGetToken(value.data));
      dispatch(getGenerateState(generateRandomNumber()))
      dispatch(setLoginLoading(false))
    })
    .catch((err) => {
      dispatch(failedGetToken(err.response));
      dispatch(setLoginLoading(false))
    });
};
