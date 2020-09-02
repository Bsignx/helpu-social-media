import {createStore, combineReducers, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { useReducer } from 'react'

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
})

const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware),
  composeEnhancers|| compose && composeEnhancers() || compose
))

export default store
