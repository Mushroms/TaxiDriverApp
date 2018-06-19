import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Auth from './components/auth';
import Queue from './components/queue';
import QueueResults from './components/queue-results';


const TaxiDriverApp = StackNavigator({
  Auth: {screen: Auth},
  Queue: {screen: Queue},
  QueueResults: {screen: QueueResults},
});

export default TaxiDriverApp;
