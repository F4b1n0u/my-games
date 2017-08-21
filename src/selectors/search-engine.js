import { createSelector } from 'reselect'

export const getSearchText = (state) => state.searchText || ''

export const getFranchiseFranchises = (state) => state.franchises.filter(franchise => franchise.resource_type === 'franchise')

export const getFranchisesStatus = (state) => state.franchisesStatus
