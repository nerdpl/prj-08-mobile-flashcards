import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { colors } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchData } from '../utils/api'
import { receiveData } from '../actions'

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchData()
      .then((allData)=> { 
        console.log('aaa: ', allData)
        dispatch(receiveData(allData))
      })
      .then((allData)=> console.log('bbb: ', allData))
  }

  render() {
    const { data, decks } = this.props

    if (!decks) 
      return (
        <View style={ styles.center }>
          <Text style={ styles.title }>There are no created decks.</Text>
        </View>
      )
    else 
      return (
        <ScrollView>
          <View style={ styles.center }>
            { decks.map((deck)=> { return (
              <TouchableOpacity
                key={ deck }
                style={ styles.decks } 
                onPress={ ()=> { this.props.navigation.navigate('ViewDeck', { deckKey: deck }) } }
              >
                <Text style={ styles.title }>{ deck }</Text>
                <Text style={ styles.numberOfQ }>
                  { data[deck].questions.length }
                  { data[deck].questions.length === 1 ? ' card' : ' cards' }
                </Text>
              </TouchableOpacity>
            )})}
          </View>
        </ScrollView>
      )
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

function mapStateToProps(data) {
  const decks = Object.keys(data)
  
  return {
    data,
    decks 
  }
}

export default connect(mapStateToProps)(Home)