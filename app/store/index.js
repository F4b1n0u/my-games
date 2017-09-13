import _ from 'lodash'
import { persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import devStoreConfigure from '#store/store-configure.dev'
import prodStoreConfigure from '#store/store-configure.prod'

import { STATE_KEY as OWNED_GAME_CATALOGUE_KEY } from '#modules/owned-game-catalogue'

export default (initialState) => {
  const store = (process.env.NODE_ENV === 'production') ?
    prodStoreConfigure(initialState) :
    devStoreConfigure(initialState)

  const persistedStore = persistStore(
    store,
    {
      storage: AsyncStorage,
      whitelist: [OWNED_GAME_CATALOGUE_KEY],
    }
  )

  return {
    store,
    persistedStore
  }
}
