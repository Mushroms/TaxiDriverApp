import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class QueuePage extends React.Component{
  constructor(props) {
    super(props)
      this.state ={
        onPressButton: 'Вы вышли из очереди',
      };

    this.onPress = this.onPress.bind(this)
  }

   onPress(){
     console.log(this.state.onPressButton);
   }

  static navigationOptions = {
    title: 'Очередь',
  }


  getStyles(){
    return{
      queuePageWrapper:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      positionWrapper:{
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      },

      positionText:{
        textAlign: 'center',
        marginTop: 50,
        lineHeight: 40,
        height: 40,
        textAlignVertical: 'center',
      },

      queueButton:{
        backgroundColor: '#84bae0',
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0,
        marginTop: 50,
      },

    }
  }

render(){
  const styles = this.getStyles();
  return(
    <View style={styles.positionWrapper}>
      <Text style={styles.positionText}>
        Ваша текущая позиция в очереди - 4
      </Text>

      <Button
        activeOpacity={1}
        style={styles.queueButton}
        onPress={()=> this.onPress()}
        title= 'Выйти из очереди'
      >
      </Button>
    </View>
  )
}

}
