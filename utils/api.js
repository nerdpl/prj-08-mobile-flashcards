import { AsyncStorage } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'


const STORAGE_KEY = 'MobileFlashCards'
const NOTIFICATIONS_STORAGE_KEY = 'MobileFlashCards:notifications3'

export function fetchData() {
  return AsyncStorage.getItem(STORAGE_KEY)
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
    .then(Notifications.dismissAllNotificationsAsync())
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      console.log('data: ', data)
      if (data === null) {
        Permissions.getAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            console.log('status: ', status)
            if (status === 'granted') {
              Notifications.dismissAllNotificationsAsync()
                .then(()=> {
                  let tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  tomorrow.setHours(17)
                  tomorrow.setMinutes(0)
                  Notifications.scheduleNotificationAsync(
                    {content: {
                      title: 'Study plan',
                      body: "Don't forget to study today!",
                      ios: { sound: true },
                      android: { sound: true, sticky: false },
                    },
                    trigger: { time: tomorrow, repeat: 'day' }
                    }
                  )
                    .then(AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(true)))
                })
              }    
          })
      }
    })
}