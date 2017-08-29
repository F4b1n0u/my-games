import { combineReducers } from 'redux'

import searchEngine from '@reducers/search-engine'
import gameCatalogue from '@reducers/game-catalogue'
import app from '@reducers/app'

export default combineReducers({
  searchEngine,
  gameCatalogue,
  app,
})
