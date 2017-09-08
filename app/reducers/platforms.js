
import _ from 'lodash'
import { RECEIVE_GAME_COMPLETION_SUCCESS } from '@actions/game-catalogue'

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
    default:
      return state
  }
}
