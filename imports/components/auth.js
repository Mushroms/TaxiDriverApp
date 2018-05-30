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
import axios from 'axios';




export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
    }
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
    const config = {
      headers: {'x-api-key': 'xXxsupersecretapikeyxXx'}
    };
    const data = {
      "username": "driver",
      "password": "1234",
    };

    axios.post('https://madcatz.org:3005/api/driver/auth', data, config)
      .then(function(response) {
        if (response.data.success === 1) {
          console.log('we got a success message boyz!');
          navigate('Queue',
            {
              currentDriverId: response.data.uid,
            }
          );
        }
      })
      .catch(function (error) {
        console.log('Here we go and error: ', error);
      });
   }


  renderAuthForm(styles, navigate) {
    return (
      <View style={styles.formContainer}>
        <TextInputWithLabel labelText='Логин:'>
          <TextInput
            style={styles.textInput}
            onChangeText={(name) => this.setState({name})}
            value={this.state.login}
          />
        </TextInputWithLabel>

        <TextInputWithLabel
          labelText='Пароль:'
        >
          <TextInput
            style={styles.textInput}
            onChangeText={(surname) => this.setState({surname})}
            value={this.state.password}
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
        <Text style={styles.mainHeader}>
          Авторизация
        </Text>

        {this.renderAuthForm(styles, navigate)}
      </View>
    )
  }
}
