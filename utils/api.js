import { AsyncStorage } from 'react-native'

const STORAGE_KEY = '12s34shj5dj4'

export function fetchData() {
  return AsyncStorage.getItem(STORAGE_KEY)
}

export function submitDeck({ deck }) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    deck
  }))
}