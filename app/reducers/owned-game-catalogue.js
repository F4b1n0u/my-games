import _ from 'lodash'
import { combineReducers } from 'redux'

import {
  TOGGLE_PLATFORM_OWNERSHIP,
} from '@actions/owned-game-catalogue'

const initialState = {
  ownedGames: {},
}

function ownedGames(
  state = initialState.ownedGames,
  action
) {
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
  ownedGames,
})
