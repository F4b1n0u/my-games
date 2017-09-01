import _ from 'lodash'
import {
  combineReducers,
} from 'redux'

import {
  TOGGLE_PLATFORM_OWNERSHIP,
} from '@actions/owned-game-catalogue'

const initialState = {
  ownedGames: [],
}

function ownedGames(
  state = initialState.ownedGames,
  action
) {
  let nextState = _.merge(
    [],
    state
  )

  let gameAlreadyOwned
  let platformAlreadyOwned
  let nextPlatforms
  // TODO simplify the state
  // like :
  // {
  //   GAME_ID: [OWNED_PLATFORM_ID, OWNED_PLATFORM_ID]
  // }
  switch (action.type) {
    case TOGGLE_PLATFORM_OWNERSHIP: {
      gameAlreadyOwned = _.find(
        nextState,
        game => game.id === action.game.id
      )

      if (gameAlreadyOwned) {
        // the game is already owned

        // the game is owned regardless on which platorm
        platformAlreadyOwned = _.find(
          gameAlreadyOwned.platforms,
          platform => platform.id === action.platform.id
        )
        if (platformAlreadyOwned) {
          // the platform is already owned
          if (platformAlreadyOwned.id === action.platform.id) {
            // the very platform is already owned
            // so we toggle it by removing it
            nextPlatforms = _.filter(
              gameAlreadyOwned.platforms,
              platform => platform.id !== action.platform.id
            )
            if (_.isEmpty(nextPlatforms)) {
              // no platforn left
              // so we remove the game as well
              nextState = _.filter(
                nextState,
                game => game.id !== gameAlreadyOwned.id
              )
            } else {
              gameAlreadyOwned.platforms = nextPlatforms
            }
          } else {
            // the game is owned on at least one other platform
            // so we add the platform to the actual list
            gameAlreadyOwned.platforms = _.concat(gameAlreadyOwned.platforms, _.merge(
              {},
              action.platform,
              {
                isOwned: true,
              }
            ))
          }
        } else {
          // a platform is already owned, but not the one selected
          // so we need to add it
          gameAlreadyOwned.platforms = _.concat(gameAlreadyOwned.platforms, _.merge(
            {},
            action.platform,
            {
              isOwned: true,
            }
          ))
        }
      } else {
        // the game is not owned yet on any platform
        // the game and platform need to be added
        nextState = _.concat(
          nextState,
          _.merge(
            {},
            _.omit(action.game, 'platforms'),
            {
              platforms: [_.merge(
                {},
                action.platform,
                {
                  isOwned: true,
                }
              )],
            }
          )
        )
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
