import _ from 'lodash'

export const getOwnedGames = state => state.ownedGames

export const getOwnedPlatforms = (state, game) => (_.find(state.ownedGames, { id: game.id }) || {}).platforms || []

export const hasOwnedGame = state => !_.isEmpty(state.ownedGames)
