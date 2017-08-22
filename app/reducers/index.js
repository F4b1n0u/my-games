import {
  combineReducers
} from 'redux'

import {
  default as log,
} from './log'

import {
  default as searchEngine,
} from './search-engine'

import {
  default as games,
} from './games'

export default combineReducers({
  searchEngine,
  games,
  log,
})
