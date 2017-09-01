

// await Font.loadAsync({
//   'florentia-extralight': require('../../assets/fonts/florentia.extralight.ttf'),
//   'arista-pro-extralight': require('../../assets/fonts/arista-pro-extralight.ttf'),
//   'let-that-be-enough-regular': require('../../assets/fonts/let-that-be-enough.regular.ttf'),
// })


import {
  combineReducers,
} from 'redux'

// import _ from 'lodash'

import {
  START_LOAD,
  END_LOAD_SUCCESS,
  END_LOAD_FAILURE,
} from '@actions/app'

const initialState = {
  isFontLoaded: false,
  isLoaded: false,
  status: {
    isLoading: false,
  },
}

function isLoaded(
  state = initialState.isLoaded,
  action
) {
  switch (action.type) {
    case END_LOAD_SUCCESS:
      return true
    case END_LOAD_FAILURE:
      return false
    default:
      return state
  }
}

function status(
  state = initialState.status,
  action
) {
  switch (action.type) {
    case START_LOAD:
      return {
        pending: true,
        error: null,
      }
    case END_LOAD_SUCCESS:
      return initialState.status
    case END_LOAD_FAILURE:
      return {
        pending: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default combineReducers({
  isLoaded,
  status,
})
