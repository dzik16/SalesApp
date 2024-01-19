import React, { useEffect } from "react";
import Router from './router';
import { Persistore, Store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useDispatch, Provider } from 'react-redux';
import { getToken } from "./redux/actions/getToken";
import config from "./config";

const AppStack = () => {
  const dispatch = useDispatch()
  const stores = Store.getState();
  const token = stores.accessToken.tokenReducer

  useEffect(() => {
    if (!token.access_token) {
      dispatch(getToken(config.bodyGetToken))
    }
  }, [dispatch])

  return (
    <>
      <Router />
    </>
  );
}

const App = () => {

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        <AppStack />
      </PersistGate>
    </Provider>
  )
}


export default (App)