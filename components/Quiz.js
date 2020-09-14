import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { colors } from '../utils/colors'
import { connect } from 'react-redux'

class Quiz extends Component {
  state = {
    questionsAmount: 0,
    currentQuestion: 0,
    correctAnswers: 0,
    side: 'Q',
  }

  componentDidMount() {
    this.setState({ questionsAmount: this.props.data[this.props.route.params.deckKey].questions.length })
  }

  answerCorrect = (deck)=> {
    const { correctAnswers, currentQuestion, questionsAmount } = this.state

    this.setState({ correctAnswers: correctAnswers + 1, side: 'Q' })
    if (currentQuestion + 1 === questionsAmount) {
      const score = 'Your score is ' + correctAnswers + '/' + questionsAmount + '!'
      this.setState({ correctAnswers: 0, currentQuestion: 0 })
      this.props.navigation.navigate('ViewQuizResults', { score: score, deckKey: deck.title })
    }
    else this.setState({ currentQuestion: currentQuestion + 1 })
  }

  answerIncorrect = (deck)=> {
    const { correctAnswers, currentQuestion, questionsAmount } = this.state

    this.setState({ side: 'Q' })
    if (currentQuestion + 1 === questionsAmount) {
      const score = 'Your score is ' + correctAnswers + '/' + questionsAmount + '!'
      this.setState({ correctAnswers: 0, currentQuestion: 0 })
      this.props.navigation.navigate('ViewQuizResults', { score: score, deckKey: deck.title })
    }
    else this.setState({ currentQuestion: currentQuestion + 1 })
  }

  render() {
    const { deckKey } = this.props.route.params
    const { data } = this.props
    const deck = data[deckKey]

    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>{ deck.title }</Text>
        <Text style={ styles.title }>Question { this.state.currentQuestion + 1 } out of { deck.questions.length }:</Text>
        <View style={ [styles.decks, { marginBottom: 20 }] }>
          <Text style={ styles.question }>{ (this.state.side === 'Q') 
            ? deck.questions[this.state.currentQuestion].question 
            : deck.questions[this.state.currentQuestion].answer }
          </Text>
        </View>
        <TouchableOpacity 
          style={ Platform.OS === 'ios' ? styles.iosAddBtn : styles.androidAddBtn }
          onPress={ ()=> { (this.state.side === 'Q')
            ? this.setState({ side: 'A' }) 
            : this.setState({ side: 'Q' })
          }}>
          <Text style={ styles.submitBtnText }>FLIP CARD</Text>
        </TouchableOpacity>
        <View style={ styles.answer }>
          <TouchableOpacity 
            style={ Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.androidCorrectBtn }
            onPress={ ()=> this.answerCorrect(deck) }>
            <Text style={ styles.submitBtnText }>CORRECT</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={ Platform.OS === 'ios' ? styles.iosIncorrectBtn : styles.androidIncorrectBtn }
            onPress={ ()=> this.answerIncorrect(deck) }>
            <Text style={ styles.submitBtnText }>INCORRECT</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },
  question: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
  iosAddBtn: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 10,
    marginBottom: 30,
    width: 350,
  },
  androidAddBtn: {
    backgroundColor: colors.orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10,
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
  answer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  iosCorrectBtn: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 10,
    marginBottom: 30,
    width: 165,
  },
  androidCorrectBtn: {
    backgroundColor: colors.green,
    padding: 10,
    margin: 10,
    marginBottom: 30,
    height: 45,
    width: 150,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosIncorrectBtn: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 10,
    marginBottom: 30,
    width: 165,
  },
  androidIncorrectBtn: {
    backgroundColor: colors.red,
    padding: 10,
    margin: 10,
    marginBottom: 30,
    height: 45,
    width: 150,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function mapStateToProps(state) {
  return {
    data: state,
  }
}

export default connect(mapStateToProps)(Quiz)