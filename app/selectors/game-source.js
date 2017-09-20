import {
  SEARCHTEXT_SOURCE,
  GAMES_SOURCE,
  STATE_KEY as GAME_SOURCE_KEY,
} from '#modules/game-source'

export const getActiveSourceType = state => state[GAME_SOURCE_KEY].activeSourceType
export const getActiveSource = (state) => {
  switch (getActiveSourceType(state)) {
    case SEARCHTEXT_SOURCE:
      return state[GAME_SOURCE_KEY][SEARCHTEXT_SOURCE]
    case GAMES_SOURCE:
      return state[GAME_SOURCE_KEY][GAMES_SOURCE]
    default:
      return null
  }
}
