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
import AsyncStorage from '@react-native-community/async-storage';
import {
  check,
  request,
  checkMultiple,
  checkNotifications,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Modal from 'react-native-modal';

import Timer from '../components/Timer';
import * as notify from '../src/notification';
import BackgroundTask from '../src/BackgroundTask';

import Header from '../shared/Header';

export default class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionNotify: null,
      userSubscribed: false,
      timerRunning: false,
    };
  }

  // ------ STORAGE ---------------------

  _saveData = async () => {
    try {
      // console.log(`state saving > ${JSON.stringify(this.state)}`);
      AsyncStorage.setItem('stateTimerScreen', JSON.stringify(this.state));
      // console.log('storage > state saved');
    } catch (error) {
      console.warn('ERROR > storage > saveData > ' + error);
    }
  };

  _getData = async () => {
    try {
      const lastState = await AsyncStorage.getItem('stateTimerScreen');
      let lastStateParsed = JSON.parse(lastState);

      if (lastState !== null) {
        await Object.keys(this.state).map((key) => {
          this.setState({[key]: lastStateParsed[key]});
        });
        // console.log(`state after > ${JSON.stringify(this.state)}`);
      }
    } catch (error) {
      console.warn('ERROR > storage > getData > ' + error);
    }
  };

  // Use MobX
  _getTimerState = async () => {
    try {
      const lastState = await AsyncStorage.getItem('state');
      let lastStateParsed = JSON.parse(lastState);

      if (lastState !== null) {
        this.setState({timerRunning: lastStateParsed.timerRunning});
      }
    } catch (error) {
      console.warn('ERROR > storage > getData > ' + error);
    }
  };

  // ----- IN APP SUBSCRIPTION ----
  checkSubscription = () => {
    console.log('checking user subscription...');
    this.setState({userSubscribed: false});
  };

  // ------- NOTIFICATIONS --------
  requestPermission = () => {
    request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
      // …
      console.log(result);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('features unavailable on this device');
          break;
        case RESULTS.DENIED:
          console.log('permission denied by user');
          break;
        case RESULTS.GRANTED:
          console.log('user granted permission');
          break;
        case RESULTS.BLOCKED:
          console.log('permission blocked. cannot request again');
          break;
      }
    });
  };

  handlerNotifications = () => {
    checkNotifications().then(({status, settings}) => {});

    requestNotifications(['alert', 'sound']).then(({status, settings}) => {
      // …
      console.log(`timerScreen > notifications > status: ${status}`);
      this.setState({permissionNotify: settings.notificationCenter});
      if (settings.notificationCenter === false) {
        console.warn('CAUTION > Notification blocked');
        Alert.alert(
          'Hello 🙂',
          'Please enable notifications for best user experience',
          [
            {
              text: 'Enable',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'No',
              onPress: () =>
                console.warn('Using App with Notifications disabled'),
              style: 'destructive',
            },
          ],
          {cancelable: true},
        );
      } else {
        notify.configNotify();
      }
    });
  };

  // ------- LFIE -----------------

  componentDidMount() {
    // Check Notifications
    this.handlerNotifications();
    // Check User Subscription
    BackgroundTask();
  }

  render() {
    console.log('screen > timer > initiated');
    return (
      <View style={styles.container}>
        <Header title="Interval Timer" active={this.state.timerRunning} />
        <Modal
          isVisible={this.state.userSubscribed}
          animationIn="slideInUp"
          coverScreen={true}
          animationInTiming={1000}>
          <View style={styles.modal}>
            <Text>Hello, Hope you liked free trial of Whiterose!</Text>
            <Text>
              Unlimited version is only $0.99 monthly. Cancel anytime you want!
            </Text>
            <Button
              title="subscribe"
              onPress={() => this.setState({userSubscribed: true})}
            />
          </View>
        </Modal>
        <Timer />
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  modal: {
    flex: 1,
    borderRadius: 8,
    width: '100%',
    height: '80%',
    position: 'absolute',
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
