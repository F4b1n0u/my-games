
import Expo from 'expo'
import React from 'react'
import Sentry from 'sentry-expo'
import { Provider } from 'react-redux'
import { SENTRY_URI } from 'react-native-dotenv'

import storeConfigure from '@store'

import App from '@containers/app'

const initialState = {}
const store = storeConfigure(initialState)

const Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

Sentry
  .config(SENTRY_URI)
  .install()

Expo.registerRootComponent(Index)
