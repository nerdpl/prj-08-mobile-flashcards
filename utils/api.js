import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo-notifications'
import * as Permissions from 'expo-permissions'


const STORAGE_KEY = 'MobileFlashCards'
const NOTIFICATIONS_STORAGE_KEY = 'MobileFlashCards:notifications2'

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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.getAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            console.log(status)
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(17)
              tomorrow.setMinutes(0)
              Notifications.scheduleNotificationAsync({
                title: 'Study plan',
                body:
                    "Don't forget to study today!",
                ios: {
                    sound: true,
                },
                android: {
                    sound: true,
                    sticky: false,
                },
              },
              {
                time: tomorrow,
                repeat: 'day',
              }
            )
            AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(true))
            }
          })
      }
    })
}