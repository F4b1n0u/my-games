import { combineEpics } from 'redux-observable';

import {
  default as searchEngineEpic,
 } from './search-engine';

export default combineEpics(
  searchEngineEpic,
);
