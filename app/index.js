
import Expo from 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './epics';
import rootReducer from './reducers'

import App from './components/app'

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

Expo.registerRootComponent(Index);
