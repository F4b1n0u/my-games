import _ from 'lodash'

export const getDetailedGameId = state => state.detailedGameId

export const hasDetailedGame = state => !_.isNull(state.detailedGameId)
