import { combineEpics } from 'redux-observable';

import {
  default as searchEngineEpic,
 } from '@epics/search-engine';

 import {
  default as gameEpic,
 } from '@epics/games';

export default combineEpics(
  searchEngineEpic,
  gameEpic,
);
