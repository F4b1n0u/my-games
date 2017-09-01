export const START_LOAD = 'my-games/app/START_LOAD'
export const END_LOAD_SUCCESS = 'my-games/app/END_LOAD_SUCCESS'
export const END_LOAD_FAILURE = 'my-games/app/END_LOAD_FAILURE'

export const startLoad = () => ({
  type: START_LOAD,
})
export const endLoad = () => ({
  type: END_LOAD_SUCCESS,
})
export const endLoadFailure = () => ({
  type: END_LOAD_FAILURE,
})
