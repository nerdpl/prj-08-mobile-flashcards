import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchData } from '../utils/api'
import { receiveData } from '../actions'
import ViewDeck from './ViewDeck'

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchData()
      .then((data)=> dispatch(receiveData(data)))
  }

  render() {
    const { data, decks } = this.props
    const Stack = createStackNavigator()

    return (
      <ScrollView>
        <Stack.Navigator>
          <Stack.Screen name='ViewDeck' component={ViewDeck} />
        </Stack.Navigator>
        <View style={ styles.center }>
          { decks.map((deck)=> { return (
            <TouchableOpacity 
              style={ styles.decks } 
              onPress={ ()=> { this.props.navigation.navigate('ViewDeck', { deckKey: deck }) } }
            >
              <Text style={ styles.title }>{ deck }</Text>
              <Text style={ styles.numberOfQ }>
                { data[deck].questions.length } { data[deck].questions.length === 1 ? 'card' : 'cards' }
              </Text>
            </TouchableOpacity>
          )})}
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(data) {
  const decks = Object.keys(data)
  
  return {
    data,
    decks 
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decks: {
    width: 350,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.orange,
    borderWidth: 4,
    borderRadius: 10,
    borderStyle: 'solid',
  },
  title: {
    color: 'black',
    fontSize: 30,
  },
  numberOfQ: {
    color: colors.gray,
    fontSize: 20,
  },
})

export default connect(mapStateToProps)(Home)