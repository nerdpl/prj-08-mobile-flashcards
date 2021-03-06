import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { colors } from '../utils/colors'
import { connect } from 'react-redux'
import { deleteDeck } from '../utils/api'
import { removeDeck } from '../actions'

class ViewDeck extends Component {

  handleDeleteDeck = (deckID)=> {
    deleteDeck(deckID)
      .then(()=> this.props.dispatch(removeDeck(deckID)))
      .then(()=> this.props.navigation.goBack())
      .catch((error)=> {
        console.log("Api call error")
        alert(error.message)
     })
  }

  render() {
    const { data, decks } = this.props
    const { deckKey } = this.props.route.params
    const deck = data[deckKey]

    if (!deck) {
      this.props.navigation.navigate('Decks')
      return null}
    else 
      return (
      <View style={ styles.center }>
        <View style={ [styles.decks, { marginBottom: 100 }] }>
          <Text style={ styles.title }>{ deck.title }</Text>
          <Text style={ styles.numberOfQ }>
            { deck.questions.length } 
            { deck.questions.length === 1 ? ' card' : ' cards' }
          </Text>
        </View>
        <TouchableOpacity 
          style={ Platform.OS === 'ios' ? styles.iosQuizBtn : styles.androidQuizBtn }
          onPress={ ()=> { (deck.questions.length === 0) ? alert('This deck is empty.') : this.props.navigation.navigate('Quiz', { deckKey: deck.title }) } }>
          <Text style={ styles.submitBtnText }>START QUIZ</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={ Platform.OS === 'ios' ? styles.iosAddBtn : styles.androidAddBtn }
          onPress={ ()=> { this.props.navigation.navigate('AddCard', { deckKey: deck.title }) } }>
          <Text style={ styles.submitBtnText }>ADD CARD</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={ Platform.OS === 'ios' ? styles.iosDeleteBtn : styles.androidDeleteBtn }
          onPress={ ()=> this.handleDeleteDeck(deck.title) }>
          <Text style={ styles.submitBtnText }>DELETE DECK</Text>
        </TouchableOpacity>
      </View>
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
  iosQuizBtn: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 30,
    width: 350,
  },
  androidQuizBtn: {
    backgroundColor: colors.green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30,
    height: 45,
    width: 350,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosAddBtn: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 30,
    width: 350,
  },
  androidAddBtn: {
    backgroundColor: colors.orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30,
    height: 45,
    width: 350,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosDeleteBtn: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 30,
    width: 350,
  },
  androidDeleteBtn: {
    backgroundColor: colors.red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30,
    height: 45,
    width: 350,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  submitBtnText: {
    color: colors.white,
    fontSize: 22,
    textAlign: 'center',
  },
})

function mapStateToProps(data) {
  const decks = Object.keys(data)
  
  return {
    data,
    decks,
  }
}

export default connect(mapStateToProps)(ViewDeck)