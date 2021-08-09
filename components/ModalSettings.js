import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

import haptic from '../src/vibrate';

export default function ModalSettingsButton({textMain, textSec, onPress}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        haptic('focus');
      }}
      style={styles.settingsContainer}>
      <Text style={[styles.textMain, styles.text]}>{textMain}</Text>
      <Text style={[styles.textSec, styles.text]}>{textSec}</Text>
    </TouchableOpacity>
  );
}

export function ModalSettings() {
  return (
    <View>
      <Text>Modal Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  startText: {
    position: 'absolute',
  },
  settingsContainer: {
    // flex:1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    // height: 60,
    width: '100%',
    padding: 15,
    // marginTop: 40,
  },
  textMain: {
    color: '#FEFEFD',
  },
  textSec: {color: '#98989F'},
  text: {
    // position: 'absolute',
    //   fontFamily: ,
    fontSize: 18,
    //   fontWeight:,
  },
});
