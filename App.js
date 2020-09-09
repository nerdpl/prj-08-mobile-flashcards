import React, { Component } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Home from './components/Home'
import AddDeck from './components/AddDeck'
import ViewDeck from './components/ViewDeck'
import { colors } from './utils/colors'
import { View, StatusBar } from 'react-native'
import Constants from 'expo-constants'

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={ backgroundColor } { ...props } />
    </View>
  )
}

const Tab = createBottomTabNavigator()

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
            <Tab.Screen name='Decks' component={ Home } />
            <Tab.Screen name='View' component={ ViewDeck } />
            <Tab.Screen name='Add Deck' component={ AddDeck } />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}