import { combineEpics } from 'redux-observable'

import searchEngineEpic from '@epics/search-engine'
import gameCatalogueEpic from '@epics/game-catalogue'
import gameExplorerEpic from '@epics/game-explorer'
import ownedGameCatalogue from '@epics/owned-game-catalogue'

export default combineEpics(
  searchEngineEpic,
  gameCatalogueEpic,
  gameExplorerEpic,
  ownedGameCatalogue
)
