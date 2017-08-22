import { combineEpics } from 'redux-observable';

import {
  default as searchEngineEpic,
 } from './search-engine';

 import {
  default as gameEpic,
 } from './games';

export default combineEpics(
  searchEngineEpic,
  gameEpic,
);
