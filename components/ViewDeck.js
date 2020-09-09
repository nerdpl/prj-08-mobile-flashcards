import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { colors } from '../utils/colors'

class ViewDeck extends Component {
  render() {
    return (
      <View>
        <Text>View Deck{ JSON.stringify(this.props) }</Text>
      </View>
    )
  }
}

export default ViewDeck