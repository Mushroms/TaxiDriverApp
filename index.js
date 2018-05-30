import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import TaxiDriverApp from './imports/app';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('TaxiDriverApp', () => TaxiDriverApp);
