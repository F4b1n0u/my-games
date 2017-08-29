
import Expo from 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux'

import storeFactory from '@store'

import App from '@components/app'

const initialState = {}
const store = storeFactory(initialState)

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

Expo.registerRootComponent(Index)
