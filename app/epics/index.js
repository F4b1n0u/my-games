import { combineEpics } from 'redux-observable'

import app from '@epics/app'
import searchEngineEpic from '@epics/search-engine'
import gameCatalogueEpic from '@epics/game-catalogue'
import gameExplorerEpic from '@epics/game-explorer'
import ownedGameCatalogue from '@epics/owned-game-catalogue'

export default combineEpics(
  app,
  searchEngineEpic,
  gameCatalogueEpic,
  gameExplorerEpic,
  ownedGameCatalogue
)
