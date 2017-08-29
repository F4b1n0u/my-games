import { combineReducers } from 'redux'

import searchEngine from '@reducers/search-engine'
import gameCatalogue from '@reducers/game-catalogue'
import gameExplorer from '@reducers/game-explorer'

export default combineReducers({
  searchEngine,
  gameCatalogue,
  gameExplorer,
})
