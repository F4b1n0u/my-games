import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootEpic from '@epics'
import rootReducer from '@reducers'

export default function configureStore(initialState) {
    const epicMiddleware = createEpicMiddleware(rootEpic)
    
    const store = createStore(
      rootReducer,
      applyMiddleware(epicMiddleware)
    )

    return store
}