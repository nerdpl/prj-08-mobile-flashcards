import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { colors } from '../utils/colors'
import { connect } from 'react-redux'

class ViewQuizResults extends Component {
  render() {
    const { score, deckKey } = this.props.route.params

    return (
      <View style={ styles.center }>
        <Text style={ styles.title }>{ score }</Text>
        <TouchableOpacity 
          style={ Platform.OS === 'ios' ? styles.iosQuizBtn : styles.androidQuizBtn }
          onPress={ ()=> { this.props.navigation.navigate('Quiz', { deckKey: deckKey }) } }>
          <Text style={ styles.submitBtnText }>START OVER</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={ Platform.OS === 'ios' ? styles.iosAddBtn : styles.androidAddBtn }
          onPress={ ()=> { this.props.navigation.navigate('Home') } }>
          <Text style={ styles.submitBtnText }>HOME</Text>
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
  title: {
    color: 'black',
    fontSize: 30,
    marginBottom: 100,
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
  submitBtnText: {
    color: colors.white,
    fontSize: 22,
    textAlign: 'center',
  },
})

export default connect()(ViewQuizResults)