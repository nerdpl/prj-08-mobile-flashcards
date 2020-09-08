import React, { Component } from 'react'
import { View, Text, Platform, FontAwesome } from 'react-native'
import { colors } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchData } from '../utils/api'
import { receiveData } from '../actions'

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchData()
      .then((data)=> dispatch(receiveData(data)))
  }
  
  render() {
    const { data } = this.props

    return (
      <View>
        <Text>Home { JSON.stringify(data) }</Text>
      </View>
    )
  }
}

function mapStateToProps(data) {
  return {
    data
  }
}

export default connect(mapStateToProps)(Home)