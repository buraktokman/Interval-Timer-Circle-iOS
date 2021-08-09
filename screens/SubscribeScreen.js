import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Alert,
  StatusBar,
  Linking,
  Button,
} from 'react-native';

export default class SubscribeScreen extends Component {
  constructor({props, navigation}) {
    super({props, navigation});
    this.state = {};
    this.navigation = navigation;
  }

  // ------- LFIE -----------------

  componentDidMount() {}

  render() {
    console.log('screen > setings > initiated');
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <Text>SubscribeScreen</Text>
        <Button
          title="go details"
          onPress={() =>
            this.navigation.navigate('Settings', {
              itemId: 86,
              arrival: 'Oct 2020',
              airport: 'Bangkok Suvarnabhumi',
            })
          }
        />
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  modal: {
    flex: 1,
    borderRadius: 8,
    width: '100%',
    height: '80%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
