/** @flow */
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as searchReducer, reduxSearch } from '../source/index'
import { reducer as resourceReducer } from './resources'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

export default function createAppStore (): Object {
  const finalCreateStore = composeEnhancers(
    applyMiddleware(thunk),
    reduxSearch({
      resourceIndexes: {
        map: ['name', 'title'],
        immutableMap: ['name', 'title']
      },
      resourceSelector: (resourceName, state) => {
        return state.resources.get(resourceName)
      }
    })
  )(createStore)

  const rootReducer = combineReducers({
    resources: resourceReducer,
    search: searchReducer
  })

  return finalCreateStore(rootReducer)
}
