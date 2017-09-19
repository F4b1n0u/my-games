import 'rxjs'
import _ from 'lodash'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import { displayAnyGames } from '#modules/game-explorer'
import { getOwnedGameList, isGameOwned } from '#selectors/owned-game-catalogue'

// state key
export const STATE_KEY = 'ownedGameCatalogue'


// State
const initialState = {
  games: {},
  isDisplayingOnlyOwnedGame: true,
}


// Actions
export const TOGGLE_PLATFORM_OWNERSHIP = `my-games/${STATE_KEY}/TOGGLE_PLATFORM_OWNERSHIP`


// Reducers
function gamesReducer(state = initialState.games, action) {
  const nextState = _.merge(
    {},
    state
  )

  switch (action.type) {
    case TOGGLE_PLATFORM_OWNERSHIP: {
      let ownedPlatformIds = nextState[action.game.id]

      if (ownedPlatformIds) {
        // the game is owned regardless of the owned platform
        if (ownedPlatformIds.includes(action.platform.id)) {
          // the platform is already owned
          ownedPlatformIds = _.difference(ownedPlatformIds, [action.platform.id])
        } else {
          // the platform is not owned yet
          ownedPlatformIds = _.concat(ownedPlatformIds, action.platform.id)
        }

        if (_.isEmpty(ownedPlatformIds)) {
          // no platforms owned left
          delete nextState[action.game.id]
        } else {
          nextState[action.game.id] = ownedPlatformIds
        }
      } else {
        // the game is not owned yet
        nextState[action.game.id] = [action.platform.id]
      }

      return nextState
    }
    default:
      return state
  }
}


export default combineReducers({
  games: gamesReducer,
})


// Action Creators
export const togglePlatformOwnership = (game, platform) => ({
  type: TOGGLE_PLATFORM_OWNERSHIP,
  game,
  platform,
})


// Epics
const togglePlatformOwnershipEpic = (action$, store) => action$
  .ofType(TOGGLE_PLATFORM_OWNERSHIP)
  .mergeMap((action) => {
    let sideEffect = Observable.empty()
    const state = store.getState()
    const ownedGameList = getOwnedGameList(state)

    if (!isGameOwned(ownedGameList, action.game)) {
      sideEffect = Observable.of(displayAnyGames())
    }

    return sideEffect
  })

export const epic = combineEpics(
  togglePlatformOwnershipEpic
)
