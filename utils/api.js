import { AsyncStorage } from 'react-native'

const STORAGE_KEY = '8dsjihag'

export async function fetchData() {
  let data = await AsyncStorage.getItem(STORAGE_KEY)
  return data
}

export function submitDeck(deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
}

export function deleteDeck(deck) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results)=> {
      const data = JSON.parse(results)
      data[deck] = undefined
      delete data[deck]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}

export function submitCard(card, deck) {
  return AsyncStorage.getItem(STORAGE_KEY)
  .then((results)=> {
    const data = JSON.parse(results)
    data[deck].questions.push(card)
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  })
}