import createSagaMiddleware from 'redux-saga';
import { createStore,applyMiddleware,compose } from 'redux';


import {RootReducer} from './redurces/RootReducer';
//Import saga index
import sagas from './sagas/RootSaga';
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false
      })
    : compose;
//Cài đặt saga
const ConfigStore = () => {
  const middlewares =[sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(RootReducer,composeEnhancers(...enhancers));
  sagaMiddleware.run(sagas);

  return store; 
}  

  
export default ConfigStore;