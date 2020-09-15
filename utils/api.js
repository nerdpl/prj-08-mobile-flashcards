import { AsyncStorage, Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'


const STORAGE_KEY = 'MobileFlashCards'
const NOTIFICATIONS_STORAGE_KEY = 'MobileFlashCards:notifications'

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
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.getAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
                .then(()=> {
                  Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                      shouldShowAlert: true,
                      shouldPlaySound: true,
                      shouldSetBadge: false,
                    }),
                  })
                  Notifications.scheduleNotificationAsync(
                    {content: {
                      title: 'Mobile Flashcards',
                      body: "Don't forget to study today!",
                    },
                    trigger: null,
                    }
                  )
                    .then(AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(true)))
                    .then(async ()=> {let xxx = await Notifications.getAllScheduledNotificationsAsync()
                    console.log('aaa: ', xxx)})
                })
              }    
          })
      }
    })
}