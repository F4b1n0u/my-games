import {
  combineReducers
} from 'redux'

import {
  default as searchEngine,
} from './search-engine'

export default combineReducers({
  searchEngine,
})
