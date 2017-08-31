
import _ from 'lodash'
import {
  combineReducers,
} from 'redux'
import {
  RECEIVE_GAME_COMPLETION_SUCCESS,
} from '@actions/game-catalogue'
import {
  MARK_GAME_OWNERSHIP,
} from '@actions/owned-game-catalogue'

const initialState = []

export default (
  state = initialState,
  action
) => {
  let nextState = _.merge(
    [],
    state
  )

  switch (action.type) {
    case RECEIVE_GAME_COMPLETION_SUCCESS:
      if (_.isEmpty(state)) {
        // no platforms yet (completion level < 2)
        nextState = action.completedGame.platforms
      } else {
        // platforms already here (completion level > 1)
        nextState = action.completedGame.platforms.map((platform) => {
          const isOwned = !!_.find(state, (currentPlatform) => {
            const isAlreadyMarked = Object.prototype.hasOwnProperty.call(currentPlatform, 'isOwned')

            let isMatching

            if (currentPlatform.id === platform.id) {
              if (isAlreadyMarked) {
                isMatching = currentPlatform.isOwned
              } else {
                isMatching = false
              }
            }

            return isMatching
          })

          return _.merge(
            {},
            platform,
            {
              isOwned,
            }
          )
        })
      }

      return nextState
    case MARK_GAME_OWNERSHIP:
      if (!_.isEmpty(action.ownedPlatforms)) {
        if (_.isEmpty(state)) {
          // no platforms yet (completion level < 2)
          nextState = _.concat(nextState, action.ownedPlatforms)
        } else {
          // platforms already here (completion level > 1)
          nextState = state.map(platform => _.merge(
            {},
            platform,
            {
              isOwned: !!_.find(action.ownedPlatforms, ownedPlatform => ownedPlatform.id === platform.id),
            }
          ))
        }
      }

      return nextState

    //   let nextState = [...state]

    //   const {
    //     onwedPlatforms,
    //   } = action

    //   if (_.isEmpty(state)) {
    //     nextState = action.onwedPlatforms || []
    //   }

    //   return nextState


    default:
      return state
  }
}
