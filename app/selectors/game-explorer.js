import _ from 'lodash'

export const getDetailedGameId = state => state.gameExplorer.detailedGameId

export const hasDetailedGame = state => !_.isNull(state.gameExplorer.detailedGameId)
