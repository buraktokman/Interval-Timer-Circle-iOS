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

export default function backgroundTimer(props) {
  console.log('background > configuring');

  // Stop active bg tasks
  console.log('background > stop previous task');
  BackgroundTimer.stop();

  // Start
  console.log('background > starting new');

  // start interval loop
  let i = 0;
  BackgroundTimer.runBackgroundTimer(() => {
    i++;
    console.log('timer is now at increment ' + i);

    // Do Background Task
    _bgTask();

    // Manually stop the process after one minute
    if (i === 20) {
      BackgroundTimer.stop();
      BackgroundTimer.stopBackgroundTimer();
    }
  }, 3000);

  //Don't forget to remove Timer
  //rest of code will be performing for iOS on background too
  BackgroundTimer.stopBackgroundTimer();

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
