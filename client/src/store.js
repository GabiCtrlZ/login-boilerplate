import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import allReducers from './reducers'
import api from './middleware/api'
import { REACT_APP_ENV } from './consts'

let enhancer
const middleware = []

middleware.push(thunk)

middleware.push(api)

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (REACT_APP_ENV === 'development') ?
enhancer = compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()):
enhancer = compose(applyMiddleware(...middleware))

const store = createStore(
  allReducers,
  {},
  enhancer
)

export default store