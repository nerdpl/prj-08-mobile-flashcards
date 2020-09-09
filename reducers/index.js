import { RECEIVE_DATA, ADD_DECK, ADD_CARD, DELETE_DECK } from '../actions'

const test2 = {}
const test = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function data (state = test, action) {
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
      return {
        ...state,
        ...action.newCard,
      }
    case DELETE_DECK :
      let newState = state
      delete newState[action.deckName]
      return {
        ...newState,
      }
    default :
      return state
  }
}

export default data