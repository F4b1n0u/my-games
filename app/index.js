
import Expo from 'expo'
import React from 'react'
import { Provider } from 'react-redux'

import storeFactory from '@store'

import App from '@containers/app'

const initialState = {}
const store = storeFactory(initialState)

const Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

Expo.registerRootComponent(Index)
