import _ from 'lodash'

import {
  RECEIVE_GAME_SUCCESS,
  RECEIVE_GAME_COMPLETION_SUCCESS,
} from '@actions/game-catalogue'
import platformsReducer from '@reducers/platforms'

const initialState = {}

export default (
  state = initialState,
  action
) => {
  const nextState = _.merge(
    {},
    state
  )

  switch (action.type) {
    case RECEIVE_GAME_SUCCESS:
      return action.game
    case RECEIVE_GAME_COMPLETION_SUCCESS:
      if (action.completedGame.id === state.id) {
        _.merge(
          nextState,
          action.completedGame,
          {
            platforms: platformsReducer(nextState.platforms, action),
          }
        )
      }

      return nextState
    default:
      return nextState
  }
}
