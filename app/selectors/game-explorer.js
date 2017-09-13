import _ from 'lodash'

import { STATE_KEY as GAME_EXPLORER_KEY } from '#modules/game-explorer'

export const getDetailedGameId = state => state[GAME_EXPLORER_KEY].detailedGameId

export const hasDetailedGame = state => !_.isNull(state[GAME_EXPLORER_KEY].detailedGameId)
