import React, { Component } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Home from './components/Home'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import ViewDeck from './components/ViewDeck'
import { colors } from './utils/colors'
import { View, StatusBar } from 'react-native'
import Constants from 'expo-constants'

const Tab = createBottomTabNavigator()

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={ backgroundColor } { ...props } />
    </View>
  )
}

export default class App extends Component {
  render() {
    return (
      <Provider store={ createStore(reducer) }>
        <NavigationContainer>
          <MyStatusBar backgroundColor={ colors.orange } barStyle='light-content' />
          <Tab.Navigator 
            initialRouteName='Decks'
            screenOptions={({ route })=> ({
              tabBarIcon: ()=> {
                if (route.name === 'Decks') return <FontAwesome name='align-justify' size={ 30 } />
                if (route.name === 'Add Deck') return <FontAwesome name='plus-square' size={ 30 } />
              },
            })}
            tabBarOptions={{
              activeBackgroundColor: colors.orange,
              activeTintColor: 'black'
            }}
          >
            <Tab.Screen name='Decks' component={ StackNav } />
            <Tab.Screen name='Add Deck' component={ AddDeck } />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

const Stack = createStackNavigator()

function StackNav() {
  return (
    <Stack.Navigator screenOptions={({ route })=> ({
      headerShown: ()=> {
        if (route.name === 'Home') return false
        if (route.name === 'ViewDeck') return true
        if (route.name === 'AddCard') return true
      }
    })}>
      <Stack.Screen name='Home' component={ Home } />
      <Stack.Screen name='ViewDeck' component={ ViewDeck } />
      <Stack.Screen name='AddCard' component={ AddCard } />
    </Stack.Navigator>
  )
} 