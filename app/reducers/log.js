import {
  combineReducers,
} from 'redux'

function log(
  state = {},
  action,
) {
  console.log(action)
  return state
}

export default combineReducers({
  log,
})
