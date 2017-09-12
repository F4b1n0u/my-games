import _ from 'lodash'
import { persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import devStoreConfigure from '#store/store-configure.dev'
import prodStoreConfigure from '#store/store-configure.prod'

export default (initialState) => {
  const store = (process.env.NODE_ENV === 'production') ?
    prodStoreConfigure(initialState) :
    devStoreConfigure(initialState)

  const persistedStore = persistStore(
    store,
    {
      storage: AsyncStorage,
      whitelist: ['ownedGameCatalogue'],
    }
  )

  return {
    store,
    persistedStore
  }
}
