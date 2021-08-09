import React from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import haptic from '../src/vibrate';

export default function Header({title, onPress, type, active}) {
  const activeText = active ? 'Running' : 'Waiting your command';
  return (
    <View style={{backgroundColor: 'black'}}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView />
      <View style={styles.containerHeader}>
        <View style={styles.containerText}>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={active ? styles.activeText : styles.deactiveText}>
            {activeText}
          </Text>
        </View>
        {/* <View style={styles.containerOption}>
          <Text style={styles.optionText}>[...]</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  containerText: {},
  headerText: {
    color: 'white',
  },
  activeText: {
    color: '#43B207',
  },
  deactiveText: {
    color: '#CB064A',
  },
  optionText: {color: 'white'},
  containerOption: {
    // right: 0,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    top: 0,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
});
