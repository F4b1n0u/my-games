import { createSelector } from 'reselect'

export const getGames = (state) => state.list || []

export const getGamesStatus = (state) => state.listStatus
