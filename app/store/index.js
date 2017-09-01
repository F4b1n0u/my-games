import { persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import devStoreFactory from '@store/store-factory.dev'
import prodStoreFactory from '@store/store-factory.prod'

export default (initialState) => {
  const store = (process.env.NODE_ENV === 'production') ?
    prodStoreFactory(initialState) :
    devStoreFactory(initialState)

  persistStore(
    store,
    {
      storage: AsyncStorage,
      whitelist: ['ownedGameCatalogue'],
    }
  )

  return store
}
