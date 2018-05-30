import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';
import TextInputWithLabel from './ui/TextInputWithLabel';


export default class QueueResults extends React.Component {
  constructor(props) {
    super(props)
    const queuePosition = '';
    const { driver } = this.props.navigation.state.params;

    this.state = {
      driver,
      queuePosition,
    }
  }

  static navigationOptions = {
    title: 'Очередь водителей',
  }

  getStyles() {
    return {
      mainHeader: {
        fontSize: 25,
        marginTop: 50,
      },
      textInput: {
        height: 40,
      },
      formContainer: {
        marginLeft: 10,
        marginRight: 10,
      },
      currentQueueText: {
        marginLeft: 10,
        marginRight: 10,
      },
      driverDataContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
      },
      driverDataRow: {
        width: '100%',
      },
      queueDataWrapper: {

        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      },
      queuePositionTextWrapper: {
        textAlign: 'center',
        marginTop: 50,
        lineHeight: 40,
        height: 40,
        textAlignVertical: 'center',
      },
      queuePositionText: {
        fontWeight: 'bold',
        fontSize: 30,
        lineHeight: 40,
        height: 40,
      },
      leaveQueueButton: {
        backgroundColor: '#84bae0',
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0,
        marginTop: 50,
      },
      leaveQueueButtonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
      },
      ordersWrapper: {
        marginLeft: 10,
        marginRight: 10,
      },
    }
  }

  sendQuitQueueRequest(navigate, driver) {
    let axios = require('axios');
    //const currentDriverId = this.state.driver.uid;

    axios('https://madcatz.org:3005/api/driver/unsetqueue', {
      method: 'POST',
      data: {
        'driverUid': '2',
      },
      headers: {
        'x-api-key': 'xXxsupersecretapikeyxXx',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

    })
    .then((response) => {
      //let response = JSON.parse(response._bodyText).success;

      if (response.data.success !== 1 && !this.state.errorMessage) {
        this.setState({errorMessage: 'Сервер не смог убрать вас из очередь'});
      } else {
        error = '';
        navigate('Queue');
      }
    })
    .catch((error) => {
      console.error('Server error: ', error);
      this.setState({errorMessage: error});
    });
  }

  handleQuitQueueClick(navigate) {
    const driver = this.state.driver;
    this.sendQuitQueueRequest(navigate, driver);
  }


  renderCurrentDriverDebug(styles, driverData) {
    if (!driverData) return null;
    let driverFields = [];

    Object.keys(driverData).forEach((key, index) => {
      driverFields.push(
        <View
          key={index}
          style={styles.driverDataRow}
        >
          <Text>{key}: {driverData[key]}</Text>
        </View>
      )
    });

    return (
      <View style={styles.driverDataContainer}>
        <Text style={styles.mainHeader}>Ваши данные:</Text>
        {driverFields}
      </View>
    )
  }


  renderDriverQueueInfo(styles, navigate, queuePosition) {
    return (
      <View style={styles.queueDataWrapper}>
        <Text style={styles.queuePositionTextWrapper}>
          Ваша позиция в очереди:
        </Text>
        <Text style={styles.queuePositionText}>
          {queuePosition}
        </Text>

        <TouchableHighlight
          activeOpacity={1}
          style={styles.leaveQueueButton}
          onPress={this.handleQuitQueueClick.bind(this, navigate)}
        >
          <Text style={styles.leaveQueueButtonText}>
            Уйти из очереди
          </Text>
        </TouchableHighlight>
      </View>
    )
  }


  render () {
    const styles = this.getStyles();
    const { navigate } = this.props.navigation;

    return (
      <View>
        {this.renderDriverQueueInfo(styles, navigate, this.state.queuePosition)}

        <View style={styles.ordersWrapper}>
          <Text style={styles.mainHeader}>Ваши заказы:</Text>
          <Text style={styles.textInput}>в текущий момент заказов нет</Text>
        </View>
      </View>
    )
  }
}
