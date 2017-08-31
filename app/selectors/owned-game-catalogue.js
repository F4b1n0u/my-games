import _ from 'lodash'

export const getOwnedPlatforms = (state, game) => (_.find(state.ownedGames, { id: game.id }) || {}).platforms || []
