import { AsyncStorage } from 'react-native'

const STORAGE_KEY = '123'

export function fetchData() {
  return AsyncStorage.getItem(STORAGE_KEY)
}