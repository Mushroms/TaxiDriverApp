import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class TestObject extends React.Component{
  constructor(props){
    super(props);
  }



  getStyles(){
    return {
      positionWrapper:{
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      },

      test_object:{
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
      },

      testObjectText:{
        textAlign: 'center',
        marginTop: 50,
        lineHeight: 40,
        height: 40,
        textAlignVertical: 'center',
      },
    }
  }


  render() {
    const testObject = this.props.ivanProps;

    const styles = this.getStyles();

    return(
      <View style={styles.positionWrapper}>
        <View style={styles.test_object}>
          <Text style={styles.testObjectText}>
            Заголовок: {testObject.title}
          </Text>
          <Text style={styles.testObjectText}>
            Содержимое: {testObject.content}
          </Text>
          <Text style={styles.testObjectText}>
            Данные: {testObject.data.response}
          </Text>
        </View>
      </View>
    )
  }
}
