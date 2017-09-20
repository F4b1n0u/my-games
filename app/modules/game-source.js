import 'rxjs'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

// state key
export const STATE_KEY = 'gameSource'

export const SEARCHTEXT_SOURCE = 'SEARCHTEXT'
export const GAMES_SOURCE = 'GAMES'

// State
const initialState = {
  [SEARCHTEXT_SOURCE]: '',
  [GAMES_SOURCE]: [],
  activeSourceType: SEARCHTEXT_SOURCE,
}


// Actions
export const UPDATE_SOURCE_TYPE = `my-games/${STATE_KEY}/UPDATE_SOURCE_TYPE`
export const UPDATE_SEARCHTEXT = `my-games/${STATE_KEY}/UPDATE_SEARCHTEXT`
export const UPDATE_GAMES = `my-games/${STATE_KEY}/UPDATE_GAMES`


// Reducers
function searchTextReducer(state = initialState[SEARCHTEXT_SOURCE], action) {
  switch (action.type) {
    case UPDATE_SEARCHTEXT:
      return action.searchText
    default:
      return state
  }
}

function gamesReducer(state = initialState[GAMES_SOURCE], action) {
  switch (action.type) {
    case UPDATE_GAMES:
      return action.games
    default:
      return state
  }
}

function activeSourceTypeReducer(state = initialState.activeSourceType, action) {
  switch (action.type) {
    case UPDATE_SOURCE_TYPE:
      return action.sourceType
    default:
      return state
  }
}

export default combineReducers({
  [SEARCHTEXT_SOURCE]: searchTextReducer,
  [GAMES_SOURCE]: gamesReducer,
  activeSourceType: activeSourceTypeReducer,
})


// Action Creators
export const updateActiveSourceType = sourceType => ({
  type: UPDATE_SOURCE_TYPE,
  sourceType,
})

export const updateSearchText = searchText => ({
  type: UPDATE_SEARCHTEXT,
  searchText,
})

export const updateGames = games => ({
  type: UPDATE_GAMES,
  games,
})


// Epics
export const epic = combineEpics()
