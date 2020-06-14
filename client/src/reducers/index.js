import { combineReducers } from 'redux'

import ui from './ui-reducer'
import general from './general-reducer'

const allReducers = combineReducers({
  ui,
  general,
})

export default allReducers