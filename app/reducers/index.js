import {
  combineReducers
} from 'redux'

import {
  default as log,
} from '@reducers/log'

import {
  default as searchEngine,
} from '@reducers/search-engine'

import {
  default as games,
} from '@reducers/games'

import {
  default as app,
} from '@reducers/app'

export default combineReducers({
  searchEngine,
  games,
  app,
  log,
})
