export const RECEIVE_DATA = 'RECEIVE_DATA'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveData (data) {
  return {
    type: RECEIVE_DATA,
    data,
  }
}

export function addDeck (newDeck) {
  return {
    type: ADD_DECK,
    newDeck,
  }
}

export function addCard (newCard) {
  return {
    type: ADD_CARD,
    newCard,
  }
}

export function removeDeck (deckName) {
  return {
    type: DELETE_DECK,
    deckName,
  }
}