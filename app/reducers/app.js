import {
  combineReducers,
} from 'redux'

import {
  START_LOAD,
  END_LOAD_SUCCESS,
  END_LOAD_FAILURE,
  TOGGLE_ABOUT_DISPLAY,
} from '@actions/app'

const initialState = {
  isFontLoaded: false,
  isLoaded: false,
  status: {
    isLoading: false,
  },
  isAboutVisible: false,
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

function isAboutVisible(
  state = initialState.isAboutVisible,
  action
) {
  switch (action.type) {
    case TOGGLE_ABOUT_DISPLAY:
      return !state
    default:
      return state
  }
}

export default combineReducers({
  isLoaded,
  status,
  isAboutVisible,
})
