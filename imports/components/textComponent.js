import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';


export default class TextComponent extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Text>
        {this.props.textTitle}: {this.props.textContent}
      </Text>
    )
  }
}
