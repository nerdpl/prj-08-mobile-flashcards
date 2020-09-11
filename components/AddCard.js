import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { colors } from '../utils/colors'
import { submitCard } from '../utils/api'
import { addCard } from '../actions'

class AddCard extends Component {
  state = {
    inputQ: '',
    inputA: '',
  }

  setTextQ = (text)=> {
    this.setState({ inputQ: text })
  }

  setTextA = (text)=> {
    this.setState({ inputA: text })
  }

  submitCard = (deckKey)=> {
    const { dispatch } = this.props
    const newCard = {
      question: this.state.inputQ,
      answer: this.state.inputA,
    }

    Keyboard.dismiss()
    submitCard(newCard, deckKey)
      .then(()=> dispatch(addCard(newCard, deckKey)))
      .then(()=> {
        this.setState({ inputQ: '' })
        this.setState({ inputA: '' })
      })
      .catch((error)=> {
        console.log("Api call error")
        alert(error.message)
     })
  }

  render() {
    const { data, decks } = this.props
    const { deckKey } = this.props.route.params
    const deck = data[deckKey]

    return (
      <View style={ styles.container }>
        <View style={ [styles.decks, { marginBottom: 30 }] }>
          <Text style={ styles.title }>{ deck.title }</Text>
          <Text style={ styles.numberOfQ }>
            { deck.questions.length } 
            { deck.questions.length === 1 ? ' card' : ' cards' }
          </Text>
        </View>
        <Text style={ styles.title }>QUESTION:</Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={ (text)=> this.setTextQ(text) }
          value={ this.state.inputQ }
        />
        <Text style={ styles.title }>ANSWER:</Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={ (text)=> this.setTextA(text) }
          value={ this.state.inputA }
        />
        <TouchableOpacity 
          style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
          onPress={ ()=> this.submitCard(deckKey) }>
          <Text style={ styles.submitBtnText }>ADD</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
    
  },
  textInput: {
    height: 45,
    width: 350,
    margin: 10,
    borderColor: colors.orange,
    borderWidth: 4,
    borderRadius: 7,
    borderStyle: 'solid',
    marginBottom: 10,
  },
  iosSubmitBtn: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 350,
    margin: 10,
  },
  androidSubmitBtn: {
    backgroundColor: colors.orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    width: 350,
    margin: 10,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  submitBtnText: {
    color: colors.white,
    fontSize: 22,
    textAlign: 'center',
  },
  title: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },
  numberOfQ: {
    color: colors.gray,
    fontSize: 20,
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
})

function mapStateToProps(state) {
  const decks = Object.keys(state)
  
  return {
    data: state,
    decks,
  }
}

export default connect(mapStateToProps)(AddCard)