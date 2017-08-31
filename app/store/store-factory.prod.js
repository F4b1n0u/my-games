import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootEpic from '@epics'
import rootReducer from '@reducers'

export default function configureStore(initialState) {
  const epicMiddleware = createEpicMiddleware(rootEpic)

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(epicMiddleware)
  )

  return store
}