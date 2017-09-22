import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import appReducer, {
  STATE_KEY as APP_KEY,
  epic as appEpic,
} from '#modules/app'
import gameCatalogueReducer, {
  STATE_KEY as GAME_CATALOGUE_KEY,
  epic as gameCatalogueEpic,
} from '#modules/game-catalogue'
import gameExplorerRecucer, {
  STATE_KEY as GAME_EXPLORER_KEY,
  epic as gameExplorerEpic,
} from '#modules/game-explorer'
import gameSourceReducer, {
  STATE_KEY as GAME_SOURCE_KEY,
  epic as gameSourceEpic,
} from '#modules/game-source'
import ownedGameCatalogueReducer, {
  STATE_KEY as OWNED_GAME_CATALOGUE_KEY,
  epic as ownedGameCatalogueEpic,
} from '#modules/owned-game-catalogue'
import searchEngineReducer, {
  STATE_KEY as SEARCH_ENGINE_KEY,
  epic as searchEngineEpic,
} from '#modules/search-engine'
import walkthroughReducer, {
  STATE_KEY as WALKTHROUGH_KEY,
  epic as walkthroughEpic,
} from '#modules/walkthrough'

// Reducers
export default combineReducers({
  [APP_KEY]: appReducer,
  [GAME_CATALOGUE_KEY]: gameCatalogueReducer,
  [GAME_EXPLORER_KEY]: gameExplorerRecucer,
  [GAME_SOURCE_KEY]: gameSourceReducer,
  [OWNED_GAME_CATALOGUE_KEY]: ownedGameCatalogueReducer,
  [SEARCH_ENGINE_KEY]: searchEngineReducer,
  [WALKTHROUGH_KEY]: walkthroughReducer,
})

// Epics
export const epic = combineEpics(
  appEpic,
  gameCatalogueEpic,
  gameExplorerEpic,
  gameSourceEpic,
  ownedGameCatalogueEpic,
  searchEngineEpic
)
