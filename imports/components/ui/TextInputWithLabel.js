import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

export default class TextInputWithLabel extends React.Component {
  render() {
    const componentContainer = this.props.containerStyles;
    const labelContainer = this.props.labelContainer;
    const labelText = this.props.labelText;

    return (
      <View style={componentContainer}>
        <View style={labelContainer}>
          <Text>{labelText}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}
