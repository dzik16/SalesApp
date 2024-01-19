import { Store } from '../../redux/store';
import axios from '../axios';

export const getListOrderApi = async () => await axios.get('/Order/GetOrderList');

export const getTokenApi = async (body) => await axios.post('/token', body, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export const getListItemApi = async () => {
  const state = Store.getState().generateState.generateState;
  return await axios.get('/Order/GetItems', {
    headers: {
      state: parseInt(state)
    }
  });
};

export const deleteListItemApi = async (value) => {
  const state = Store.getState().generateState.generateState;
  return await axios.post('/Order/DeleteItem', value, {
    headers: {
      state: parseInt(state)
    }
  });
};

export const addListItemApi = async (value) => {
  const state = Store.getState().generateState.generateState;
  return await axios.post('/Order/CreateItem', value, {
    headers: {
      state: parseInt(state)
    }
  });
};

export const updateListItemApi = async (value) => {
  const state = Store.getState().generateState.generateState;
  return await axios.post('/Order/UpdateItem', value, {
    headers: {
      state: parseInt(state)
    }
  });
};