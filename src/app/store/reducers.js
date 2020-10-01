import { combineReducers } from 'redux'

import {
  SET_CITY
} from './actions'

function city(state = null, action) {
  switch (action.type) {
    case SET_CITY:
      return action.city
    default:
      return state
  }
}

const searchApp = combineReducers({
  city
})

export default searchApp
