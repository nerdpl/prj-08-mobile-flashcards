import { RECEIVE_DATA, ADD_DECK, ADD_CARD, DELETE_DECK } from '../actions'

function data (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DATA :
      return {
        ...state,
        ...action.data,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.newDeck,
      }
    case ADD_CARD :
      let deck = state[action.deckKey]
      deck.questions.push(action.newCard)
      let newState = state
      delete newState[action.deckKey]
      return {
        ...newState,
        [action.deckKey]: deck,
      }
    case DELETE_DECK :
      let newStateTwo = state
      delete newStateTwo[action.deckName]
      return {
        ...newStateTwo,
      }
    default :
      return state
  }
}

export default data