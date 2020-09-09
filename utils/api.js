import { AsyncStorage } from 'react-native'

const STORAGE_KEY = '1ghsg34shj5dj4'

export function fetchData() {
  return AsyncStorage.getItem(STORAGE_KEY)
}

export function submitDeck({ deck }) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ deck }))
}

export function deleteDeck({ deck }) {
  return AsyncStorage.removeItem(STORAGE_KEY, deck)
}