import { hasFranchises } from '#selectors/search-engine'
import { hasGames } from '#selectors/game-catalogue'
import { hasDetailedGame } from '#selectors/game-explorer'

import { STATE_KEY as WALKTHROUGH_KEY } from '#modules/walkthrough'

export const isFirstLaunchNeeded = state => !state[WALKTHROUGH_KEY].hadDoneFirstLaunch
export const isFirstFranchiseNeeded = state => !state[WALKTHROUGH_KEY].hasDoneFirstFranchise && hasFranchises(state)
export const isFirstGameNeeded = state => !state[WALKTHROUGH_KEY].hasDoneFirstGame && hasGames(state)
export const isFirstDetailedGameNeeded = state => !state[WALKTHROUGH_KEY].hasDoneFirstDetailedGame && hasDetailedGame(state)
export const isWalkthroughNeeded = state => isFirstLaunchNeeded(state) || isFirstFranchiseNeeded(state) || isFirstGameNeeded(state) || isFirstDetailedGameNeeded(state)
