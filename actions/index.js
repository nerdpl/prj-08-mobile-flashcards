export const RECEIVE_DATA = 'RECEIVE_DATA'
export const ADD_DECK = 'ADD_DECK'

export function receiveData (data) {
  return {
    type: RECEIVE_DATA,
    data,
  }
}

export function addDeck (deckName) {
  return {
    type: ADD_DECK,
    deckName,
  }
}