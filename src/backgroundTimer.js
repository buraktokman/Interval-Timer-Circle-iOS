/*
React Native Background Timer
https://github.com/ocetnik/react-native-background-timer

*/
import React, {Component} from 'react';
import {
  Text,
  Button,
  StyleSheet,
  View,
  Aler,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundTimer from 'react-native-background-timer';

// import BackgroundTimer from './bgTimer';

const EventEmitter = Platform.select({
  ios: () => NativeAppEventEmitter,
  android: () => DeviceEventEmitter,
})();

export default function backgroundTimer(props) {
  console.log('background > configuring');

  // Stop active bg tasks
  console.log('background > stop previous task');
  // BackgroundTimer.stop();

  // Start
  console.log('background > starting new');
  BackgroundTimer.start();

  // start interval loop
  let i = 0;
  //   const timer = BackgroundTimer.setInterval(() => {
  //     {
  //       i++;
  //       console.log('timer is now at increment ' + i);

  //       // Do Background Task
  //       _bgTask();

  //       // Manually stop the process after one minute
  //       if (i === 20) {
  //         BackgroundTimer.stop();
  //         // BackgroundTimer.stopBackgroundTimer();
  //       }
  //     }
  //   }, 3000);

  // listen for event
  EventEmitter.addListener('backgroundTimer', () => {
    i++;
    const timer = setInterval(() => {
        console.log('timer is now at increment ' + i);
      // Do Background Task
      _bgTask();
      // this will be executed once after 5 seconds
      console.log('toe');
    }, 5000);
  });

  // BackgroundTimer.clearInterval(timer);

  // Background Function
  const _bgTask = async () => {
    try {
      const lastState = await AsyncStorage.getItem('state');
      let lastStateParsed = JSON.parse(lastState);
      console.log(
        `background > app state > ${JSON.stringify(lastStateParsed)}`,
      );
      // Add Notifications
      if (lastState !== null && lastStateParsed.timerRunning === true) {
        console.log('background > re-scheduling notications');
        //
        //
        //
      } else {
        console.log('background > stop notifications');
        // BackgroundTimer.stop();
      }
    } catch (error) {
      console.warn('ERROR > background > storage > ' + error);
    }
  };

  return;
}
