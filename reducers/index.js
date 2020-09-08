import { RECEIVE_DATA } from '../actions'

function data (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DATA :
      return {
        ...state,
        ...action.data,
      }
    default :
      return state
  }
}

export default data