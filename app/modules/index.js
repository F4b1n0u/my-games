import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import app from '#modules/app'
import searchEngine from '#modules/search-engine'
import gameCatalogue from '#modules/game-catalogue'
import gameExplorer from '#modules/game-explorer'
import ownedGameCatalogue from '#modules/owned-game-catalogue'

import { epic as appEpic } from '#modules/app'
import { epic as searchEngineEpic } from '#modules/search-engine'
import { epic as gameCatalogueEpic } from '#modules/game-catalogue'
import { epic as gameExplorerEpic } from '#modules/game-explorer'
import { epic as ownedGameCatalogueEpic } from '#modules/owned-game-catalogue'

// Reducers
export default combineReducers({
  app,
  searchEngine,
  gameCatalogue,
  gameExplorer,
  ownedGameCatalogue,
})


// Epics
export const epic = combineEpics(
  appEpic,
  searchEngineEpic,
  gameCatalogueEpic,
  gameExplorerEpic,
  ownedGameCatalogueEpic
)
