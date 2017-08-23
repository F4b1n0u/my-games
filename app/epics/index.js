import { combineEpics } from 'redux-observable';

import {
  default as searchEngineEpic,
 } from '@epics/search-engine';

 import {
  default as gameCatalogueEpic,
 } from '@epics/game-catalogue';

export default combineEpics(
  searchEngineEpic,
  gameCatalogueEpic,
);
