import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import expireReducer from 'redux-persist-expire';
import Reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [
    expireReducer('accessToken', {
      expireSeconds: 1,
      expiredState: {
        tokenReducer: {}
      }
    }),
  ],
};

const configPersist = persistReducer(persistConfig, Reducers);

export const Store = createStore(
  configPersist,
  applyMiddleware(thunk, logger),
);

export const Persistore = persistStore(Store);
