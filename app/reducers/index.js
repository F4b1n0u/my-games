import { combineReducers } from 'redux'

import app from '@reducers/app'
import searchEngine from '@reducers/search-engine'
import gameCatalogue from '@reducers/game-catalogue'
import gameExplorer from '@reducers/game-explorer'
import ownedGameCatalogue from '@reducers/owned-game-catalogue'

export default combineReducers({
  app,
  searchEngine,
  gameCatalogue,
  gameExplorer,
  ownedGameCatalogue,
})
