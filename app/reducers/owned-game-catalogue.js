import {
  combineReducers,
} from 'redux'

const initialState = {
  ownedGames: [{
    id: 3666,
    platforms: [
      {
        id: 52,
        isOwned: true,
      },
    ],
  }, {
    id: 6718,
    platforms: [
      {
        id: 36,
        isOwned: true,
      },
    ],
  }],
}

function ownedGames(
  state = initialState.ownedGames,
  action
) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  ownedGames,
})
