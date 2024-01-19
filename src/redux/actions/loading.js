import { SET_LOADING } from "../types";

export const setLoginLoading = data => ({
  type: SET_LOADING,
  payload: data,
});