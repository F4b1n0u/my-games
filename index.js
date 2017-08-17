
import Expo from 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './src/components/app'

import rootReducer from './src/reducers'

const store = createStore(rootReducer)

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
