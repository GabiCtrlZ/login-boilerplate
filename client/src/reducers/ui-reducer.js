import Immutable from 'seamless-immutable'
import { uiTypes as types } from '../actions/types'

const initialState = Immutable({
  isLoggedIn: false,
  loginError: false,
})

export default function uiReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.FAILED_LOGIN:
      return {
        ...state,
        isLoggedIn: false,
        loginError: true
      }
    case types.FAILED_LOGIN2:
      return {
        ...state,
        isLoggedIn: false,
      }
    case types.RESET_LOGIN:
      return {
        ...state,
        loginError: false
      }
    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      }
    case types.SUCCESS_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      }
    default:
      return state
  }
}