import { AsyncStorage } from 'react-native'

const STORAGE_KEY = '7dhhhdasshfdhshgdfg'

export async function fetchData() {
  let data = await AsyncStorage.getItem(STORAGE_KEY)
  console.log('fetch: ', data)
  return data
}

export function submitDeck(deck) {
  console.log('!!!: ', deck)
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
}

/*export function deleteDeck(deck) {
  AsyncStorage.getItem(STORAGE_KEY)
    .then((results)=> {
      const data = JSON.parse(results)
      data[deck] = undefined
      delete data[deck]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}

export function submitCard({ card }) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ card }))
}
*/