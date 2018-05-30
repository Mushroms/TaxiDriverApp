// import React, { Component } from 'react';
// import {
//   Text,
//   View,
// } from 'react-native';
//
//
// export default class OrderResults extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { }
//   }
//
//   static navigationOptions = {
//     title: 'Заказ такси',
//   }
//
//   getStyles() {
//     return {
//       mainHeader: {
//         fontSize: 25,
//         margin: 10,
//       },
//       textInput: {
//         height: 40,
//       },
//       resultContainer: {
//         marginLeft: 10,
//         marginRight: 10,
//       },
//     }
//   }
//
//   renderOrderData() {
//     let result = [];
//     const { orderData } = this.props.navigation.state.params;
//
//     Object.keys(orderData).forEach((key, index) => {
//       result.push(
//         <Text key={index}>
//           {key}: {orderData[key]}
//         </Text>
//       )
//     });
//
//
//     return result;
//   }
//
//   render () {
//     const styles = this.getStyles();
//     const { navigate } = this.props.navigation;
//
//     return (
//       <View>
//         <Text
//           style={styles.mainHeader}
//         >
//           Ваш заказ принят
//         </Text>
//
//         <View style={styles.resultContainer}>
//           {this.renderOrderData()}
//         </View>
//       </View>
//     )
//   }
//
// }
