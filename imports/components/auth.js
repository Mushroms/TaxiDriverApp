import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import TextInputWithLabel from './ui/TextInputWithLabel';
import Sockets from 'react-native-sockets';
import { StackNavigator } from 'react-navigation';



export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { allDrivers: {} }
  }



  static navigationOptions = {
    title: 'Начало работы',
  }


  getStyles() {
    return {
      mainHeader: {
        fontSize: 25,
        margin: 10,
      },
      textInput: {
        height: 40,
      },
      resultContainer: {
        marginLeft: 10,
        marginRight: 10,
      },
      formContainer: {
        marginLeft: 10,
        marginRight: 10,
      },
    }
  }


  handleFormSubmit(navigate) {
    let allDrivers = {};
    let currentDriverId = 1;
    let axios = require('axios')
    let config = {
      headers: {'x-api-key': 'xXxsupersecretapikeyxXx'}
    };
    const data = {
       "username": "driver",
       "password": "1234",
    };

    let params = {
      ID: ''
    };
    axios.post('https://madcatz.org:3005/api/driver/auth', data, config)
      .then(function(response) {
        if (response.data.success === 1) {
          console.log('we got a success message boyz!');
          navigate('Queue',
            {
               currentDriverId: response.data.uid,
               allDrivers: response,
             }
          );
        } else {
          console.log('we are not in dah IF statement bitches');
        }
      })
      .catch(function (error) {
        console.log('Here we go and error: ', error);
      });

    // axios.get('https://madcatz.org:3005/api/drivers/getall', config, params)
    // .then(function(response){
    //   console.log(response);
    // })
    // .catch(function(error){
    //   console.log(error);
    //
    // });
    

   }

    //}


    //let allDrivers = {};

    //This id should be in response on success auth request
    //let currentDriverId = 1;




  renderAuthForm(styles, navigate) {
    return (
      <View style={styles.formContainer}>
        <TextInputWithLabel
          labelText='Логин:'
        >
          <TextInput
            style={styles.textInput}
            onChangeText={(name) => this.setState({name})}
            value={this.state.text}
          />
        </TextInputWithLabel>

        <TextInputWithLabel
          labelText='Пароль:'
        >
          <TextInput
            style={styles.textInput}
            onChangeText={(surname) => this.setState({surname})}
            value={this.state.text}
            secureTextEntry={true}
          />
        </TextInputWithLabel>

        <Button
          onPress={this.handleFormSubmit.bind(this, navigate)}
          title="Войти"
        />
      </View>
    )
  }


  render () {
    const styles = this.getStyles();
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text
          style={styles.mainHeader}
        >
          Авторизация
        </Text>

        {this.renderAuthForm(styles, navigate)}
      </View>
    )
  }
}
