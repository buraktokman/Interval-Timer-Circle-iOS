/*
Schedule Notif.
 https://medium.com/better-programming/react-native-local-scheduled-push-notification-with-firebase-8c775b71c35c

 https://github.com/react-native-community/push-notification-ios
 https://github.com/zo0r/react-native-push-notification
*/

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

// --------- SCHEDULE ALL NOTIFICATIONS -

export const scheduleAllNotify = (timerInterval) => {
  console.log('notify > scheduling 64 notifications (iOS limit)');
  PushNotificationIOS.getScheduledLocalNotifications(async (callback) => {
    // console.log(callback);

    // Create empty array if callback empty
    const notifications =
      (await callback.length) === 0
        ? [
            {
              alertBody: 'Round 0',
              fireDate: new Date(Date.now()),
            },
          ]
        : callback;
    const roundLast = parseInt(
      notifications[notifications.length - 1].alertBody.split(' ')[1],
    );
    const fireDateLast = new Date(
      notifications[notifications.length - 1].fireDate,
    );

    // Add Missing Notifys
    for (let i = 1; i < 65 - notifications.length; i++) {
      console.log(`adding missing notif: ${65 - i}`);

      // Add New
      addNotifySchedule(
        'Timer',
        `Round ${roundLast + i}`,
        new Date(fireDateLast.getTime() + timerInterval * i),
        'time',
      );
    }
  });
};

// --------- GET ALL NOTIF --------------

export const getScheduledNotify = () => {
  console.log('notify > listing scheduled notifications');
  PushNotificationIOS.getScheduledLocalNotifications((callback) => {
    console.log(callback);
    // callback.map((notification) => {
    //   console.log(`Round: ${parseInt(notification.alertBody.split(' ')[1])}`);
    //   console.log(`notification.fireDate: ${notification.fireDate}`);
    // });
  });
};

// --------- CANCEL ALL NOTIF --------------

export const cancelAllNotify = () => {
  PushNotification.cancelAllLocalNotifications();
  console.log('notify > all notifications canceled');
};

// --------- ADD NOTIF SCHEDULE  --------------
export const addNotifySchedule = (title, message, time, repeatType) => {
  console.log(`notify > scheduling > ${time}`);

  // Schedule Notification
  PushNotification.localNotificationSchedule({
    message: message, // (required)
    // title: title,
    // date: new Date(Date.now() + 3 * 1000), // in 60 secs
    date: time,
    playSound: true,
    soundName: 'ping.mp3', // 'default',
  });
  // PushNotificationIOS.getScheduledLocalNotifications((callback) => {
  //   // console.log(callback);
  //   callback.map((val) => {
  //     console.log(val);
  //   })
  // });
};

// --------- ADD NOTIF NOW  --------------
export const addNow = (title, message) => {
  console.log('notify > now!');

  // Schedule Notification
  PushNotification.localNotificationSchedule({
    message: message, // (required)
    // title: title,
    date: new Date(Date.now()),
    playSound: true,
    soundName: 'ping.mp3', // 'default',
  });

  // PushNotificationIOS.getScheduledLocalNotifications((callback) => {
  //   callback.map((val) => {
  //     console.log(val);
  //   });
  // });
};

// --------- CONFIGURE NOTIFS ----------

export const configNotify = () => {
  console.log('notify > configuring');
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    // Should the initial notification be popped automatically
    popInitialNotification: true,

    requestPermissions: true,
  });
};
