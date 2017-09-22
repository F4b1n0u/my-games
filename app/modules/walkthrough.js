import 'rxjs'
import _ from 'lodash'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import { markIsDisplayingAnyGames } from '#modules/game-explorer'
import { getOwnedGameList, isGameOwned } from '#selectors/owned-game-catalogue'

// state key
export const STATE_KEY = 'walkthrough'


// State
const initialState = {
  hadDoneFirstLaunch: false,
  hasDoneFirstFranchise: false,
  hasDoneFirstGame: false,
  hasDoneFirstDetailedGame: false,
}


// Actions
export const PASS_FIRST_LAUNCH = `my-games/${STATE_KEY}/PASSED_FIRST_LAUNCH`
export const PASS_FIRST_FRANCHISE = `my-games/${STATE_KEY}/PASS_FIRST_FRANCHISE`
export const PASS_FIRST_GAME = `my-games/${STATE_KEY}/PASS_FIRST_GAME`
export const PASS_FIRST_DETAILED_GAME = `my-games/${STATE_KEY}/PASS_FIRST_DETAILED_GAME`


// Reducers
function hadDoneFirstLaunchReducer(state = initialState.hadDoneFirstLaunch, action) {
  switch (action.type) {
    case PASS_FIRST_LAUNCH:
      return true
    default:
      return state
  }
}

function hasDoneFirstFranchiseReducer(state = initialState.hasDoneFirstFranchise, action) {
  switch (action.type) {
    case PASS_FIRST_FRANCHISE:
      return true
    default:
      return state
  }
}

function hasDoneFirstGameReducer(state = initialState.hasDoneFirstGame, action) {
  switch (action.type) {
    case PASS_FIRST_GAME:
      return true
    default:
      return state
  }
}

function hasDoneFirstDetailedGameReducer(state = initialState.hasDoneFirstDetailedGame, action) {
  switch (action.type) {
    case PASS_FIRST_DETAILED_GAME:
      return true
    default:
      return state
  }
}


export default combineReducers({
  hadDoneFirstLaunch: hadDoneFirstLaunchReducer,
  hasDoneFirstFranchise: hasDoneFirstFranchiseReducer,
  hasDoneFirstGame: hasDoneFirstGameReducer,
  hasDoneFirstDetailedGame: hasDoneFirstDetailedGameReducer,
})


// Action Creators
export const passFirstLaunch = () => ({
  type: PASS_FIRST_LAUNCH,
})

export const passFirstFranchise = () => ({
  type: PASS_FIRST_FRANCHISE,
})

export const passFirstGame = () => ({
  type: PASS_FIRST_GAME,
})

export const passFirstDetailedGame = () => ({
  type: PASS_FIRST_DETAILED_GAME,
})

// Epics
export const epic = combineEpics()
