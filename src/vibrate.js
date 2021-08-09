/*
react-native-haptic-feedback
https://github.com/milk-and-cookies-io/react-native-haptic-feedback

expo-haptics
https://www.npmjs.com/package/expo-haptics
*/

// import * as Haptics from 'expo-haptics';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

function haptic(type) {
  console.log('vibrate > ' + type);
  ReactNativeHapticFeedback.trigger('impactLight', options);
}

// function expoHaptic (type) {
//   console.log('vibrate > ' + type);
//   Vibration.vibrate([1000, 2500, 1000, 2500]);
//   if (type == 'focus') {
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//   } else if (type == 'restLong') {
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//   } else if (type == 'restShort') {
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//   }
// };

export default haptic;
