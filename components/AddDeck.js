import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { colors } from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { submitDeck } from '../utils/api'
import { Keyboard } from 'react-native';

class AddDeck extends Component {
  state = {
    inputText: '',
  }

  setText = (text)=> {
    this.setState({ inputText: text })
  }

  submit = ()=> {
    const { dispatch } = this.props
    const newDeck = {
      [this.state.inputText]: {
        title: this.state.inputText,
        questions: []
      }
    }

    Keyboard.dismiss()
    submitDeck(newDeck)
      .then(()=> dispatch(addDeck(newDeck)))
      .then(()=> this.setState({ inputText: '' }))
      .then(()=> this.props.navigation.navigate('Decks'))
  }

  render() {
    const { value } = this.state
   
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>ADD NEW DECK:</Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={ (text)=> this.setText(text) }
          value={ this.state.inputText }
        />
        <TouchableOpacity 
          style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
          onPress={ this.submit }>
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
    justifyContent: 'center',
  },
  textInput: {
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    borderColor: colors.orange,
    borderWidth: 4,
    borderRadius: 7,
    borderStyle: 'solid',
    marginBottom: 30,
  },
  iosSubmitBtn: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 30,
  },
  androidSubmitBtn: {
    backgroundColor: colors.orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
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
    marginBottom: 30, 
  },
})

export default connect()(AddDeck)