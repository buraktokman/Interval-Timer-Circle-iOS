/*
React-native-background-fetch
https://github.com/transistorsoft/react-native-background-fetch

*/
import React, {Component} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import BackgroundFetch from 'react-native-background-fetch';

import * as notify from './notification';

export default function BackgroundTask() {
  // Execute
  console.log('background > imported');

  _bgConfigure();

  async function _bgTask() {
    console.log('background > starting new');
    try {
      const lastState = await AsyncStorage.getItem('state');
      let lastStateParsed = JSON.parse(lastState);
      console.log(
        `background > app state > ${JSON.stringify(lastStateParsed)}`,
      );
      // Add Notifications
      if (lastState !== null && lastStateParsed.timerRunning === true) {
        console.log('background > re-scheduling notications');
        // Get All Notify
        notify.scheduleAllNotify(lastStateParsed.timerInterval);
      } else {
        console.log('background > stop notifications');
        // BackgroundTimer.stop();
      }
    } catch (error) {
      console.warn('ERROR > background > storage > ' + error);
    }
  }

  function _bgConfigure() {
    console.log('background > configuring');

    // Configure it.
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        stopOnTerminate: false,
        forceAlarmManager: true,
        startOnBoot: true,
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      },
      async (taskId) => {
        console.log('background > Received background-fetch event: ', taskId);
        // Run task & give finish signal. if not iOS will kill ur App
        // Use a switch statement to route task-handling.
        console.log(
          'background > task router > Received custom task: ' + taskId,
        );
        switch (taskId) {
          case 'com.transistorsoft.customtask':
            _bgTask();
            break;
          default:
            console.log('Default fetch task');
        }
        // Finish, providing received taskId.
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log(
          'background > RNBackgroundFetch failed to start > ' + error,
        );
      },
    );

    // Step 2:  Schedule a custom "oneshot" task "com.foo.customtask" to execute 5000ms from now.
    console.log('background > scheduling next task');
    BackgroundFetch.scheduleTask({
      taskId: 'com.transistorsoft.customtask',
      forceAlarmManager: true,
      delay: 1000, // <-- milliseconds
    });

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('CAUTION > background > restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('CAUTION > background > denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('background > status > enabled');
          break;
      }
    });
  }
}
