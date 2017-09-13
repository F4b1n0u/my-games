import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import appReducer, {
  STATE_KEY as APP_KEY,
  epic as appEpic,
} from '#modules/app'
import searchEngineReducer, {
  STATE_KEY as SEARCH_ENGINE_KEY,
  epic as searchEngineEpic,
} from '#modules/search-engine'
import gameCatalogueReducer, {
  STATE_KEY as GAME_CATALOGUE_KEY,
  epic as gameCatalogueEpic,
} from '#modules/game-catalogue'
import gameExplorerRecucer, {
  STATE_KEY as GAME_EXPLORER_KEY,
  epic as gameExplorerEpic,
} from '#modules/game-explorer'
import ownedGameCatalogueReducer, {
  STATE_KEY as OWNED_GAME_CATALOGUE_KEY,
  epic as ownedGameCatalogueEpic,
} from '#modules/owned-game-catalogue'

// Reducers
export default combineReducers({
  [APP_KEY]: appReducer,
  [SEARCH_ENGINE_KEY]: searchEngineReducer,
  [GAME_CATALOGUE_KEY]: gameCatalogueReducer,
  [GAME_EXPLORER_KEY]: gameExplorerRecucer,
  [OWNED_GAME_CATALOGUE_KEY]: ownedGameCatalogueReducer,
})


// Epics
export const epic = combineEpics(
  appEpic,
  searchEngineEpic,
  gameCatalogueEpic,
  gameExplorerEpic,
  ownedGameCatalogueEpic
)
