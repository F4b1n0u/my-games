import {
  combineReducers,
} from 'redux'

function log(
  state = {},
  action,
) {
  console.log(action.type)
  return state
}

export default combineReducers({
  log,
})
