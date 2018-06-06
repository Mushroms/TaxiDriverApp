import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TextInputWithLabel from './ui/TextInputWithLabel';
import axios from 'axios';


export default class Queue extends React.Component {
  constructor(props) {
    super(props);
    const { allDrivers, driver, currentDriverId } = this.props.navigation.state.params;

    this.state = {
      allDrivers: allDrivers,
      currentDriverId: currentDriverId,
      errorMessage: '',
      driverIsInQueue: false,
      currentDriverData: {},
    };

    this.getDriverData = this.getDriverData.bind(this);
    this.sendQueueSetRequest = this.sendQueueSetRequest.bind(this);
  }

  static navigationOptions = {
    title: 'Встать в очередь',
  };

  componentDidMount() {
    this.getDriverData();
  }


  getStyles() {
    const styles = StyleSheet.create({
      pageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      callTaxiButton: {
        backgroundColor: '#84bae0',
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0,
      },
      taxiButtonText: {
        fontSize: 34,
        color: '#fff',
      },
      errorContainer: {
        backgroundColor: '#eee',
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
      },
      errorText: {
        color: '#000',
        fontSize: 24,
        textAlign: 'center',
      },

    });

    return styles;
  }

  getDriverData() {
    let driverUid = this.state.currentDriverId;
    let currentDriverData = {};

    axios({
      method: 'GET',
      url: 'https://madcatz.org:3005/api/driver/get/' + driverUid,
      headers: {'x-api-key': 'xXxsupersecretapikeyxXx'},
    })
    .then(function(response){
      if (response.data.success === 1) {
        const currentDriverData = response.data.response;
      }
    })
    .catch(function(error){
      console.log('[requestCurrentDriverData] error: ', error);
    })
    .then(() => {
      this.setState({currentDriverData})
    })
  }


  sendQueueSetRequest(navigate) {
    console.log('our driver in state is: ', this.state.currentDriverData);


    axios('https://madcatz.org:3005/api/driver/setqueue', {
      method: 'POST',
      data: {'driverUid': this.state.currentDriverId},
      headers: {'x-api-key': 'xXxsupersecretapikeyxXx'},
    })

      .then(function(response) {
        console.log('[sendQueueSetRequest] we got a response: ', response);
        if (response.data.success === 1) {

          navigate('QueueResults', {
            driver: response.data.response,
          });
        }

      })
      .catch(function(error){
        console.log('[sendQueueSetRequest] error: ', error);
      })

    .then((response) => {
      console.log('response', response)
      if (response.data.success === 1) {
        navigate('QueueResults', {
          driver: this.state.currentDriverData,
        });
          console.log('driver', this.state.currentDriverData);
      }
    })
    .catch((error) => {
      console.log('[sendQueueSetRequest] error: ', error);
    })
  }


  renderButton(styles, navigate) {
    return (
      <TouchableHighlight
        activeOpacity={1}
        style={styles.callTaxiButton}
        onPress={this.sendQueueSetRequest.bind(this, navigate)}
      >
        <Text style={styles.taxiButtonText}>
          Встать в очередь
        </Text>
      </TouchableHighlight>
    );
  }



  renderErrorMessage(styles) {
    if (!this.state.error) return null;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {this.state.error}
        </Text>
      </View>
    );
  }



  render () {
    const { navigate } = this.props.navigation;
    const styles = this.getStyles();


    return (
      <View style={styles.pageWrapper}>
        {this.renderButton(styles, navigate)}

        {this.renderErrorMessage(styles)}
      </View>
    )
  }
}
