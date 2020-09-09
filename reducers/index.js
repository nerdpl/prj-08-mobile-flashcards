import { RECEIVE_DATA, ADD_DECK } from '../actions'

function data (state = {}, action) {
  let test = {
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

  switch (action.type) {
    case RECEIVE_DATA :
      return {
        ...state,
        ...action.data,
        ...test,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deckName,
      }
    default :
      return state
  }
}

export default data