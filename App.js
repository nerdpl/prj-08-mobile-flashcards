import React, { Component } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Home from './components/Home'
import AddDeck from './components/AddDeck'
import { colors } from './utils/colors'

const Tab = createBottomTabNavigator()

export default class App extends Component {
  render() {
    return (
      <Provider store={ createStore(reducer) }>
        <NavigationContainer>
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
            <Tab.Screen name='Add Deck' component={ AddDeck } />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}