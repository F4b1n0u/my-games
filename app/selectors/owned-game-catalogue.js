import _ from 'lodash'

export const getOwnedGames = state => state.ownedGames

export const getOwnedPlatforms = (state, game) => (_.find(state.ownedGames, { id: game.id }) || {}).platforms || []
