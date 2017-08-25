import { combineReducers } from 'redux'

import log from '@reducers/log'
import searchEngine from '@reducers/search-engine'
import gameCatalogue from '@reducers/game-catalogue'
import app from '@reducers/app'

export default combineReducers({
  searchEngine,
  gameCatalogue,
  app,
  log,
})
