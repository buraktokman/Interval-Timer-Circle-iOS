import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import moment from 'moment';

const formatTime = (interval) => {
  // const pad = (n) => (n < 10 ? '0' + n : n);
  // Return Hourly format if time is at least 1 hour
  return interval >= 60 * 60 * 1000
    ? moment.utc(interval).format('HH:mm:ss')
    : moment.utc(interval).format('mm:ss');
};

export default function BarInfoTimer({
  timePassed,
  rounderCounter,
  timerInterval,
}) {
  return (
    <View style={styles.settingsContainer}>
      <View style={[styles.columnContainer, styles.columnContainerRound]}>
        <Text style={[styles.textMain, styles.textHead]}>ROUND</Text>
        <Text style={[styles.textMain, styles.text]}>{rounderCounter}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={[styles.textMain, styles.textHead]}>ELAPSED</Text>
        <Text style={[styles.textMain, styles.text]}>
          {formatTime(timePassed)}
        </Text>
      </View>
      <View style={styles.columnContainer}>
        <View >
          <Text style={[styles.textMain, styles.textHead]}>INTERVAL</Text>
        </View>
        <Text style={[styles.textMain, styles.text]}>
          {formatTime(timerInterval)}
        </Text>
      </View>
    </View>
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
  columnContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    height: 60,
    width: 110,
    shadowColor: '#1C1C1E',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.94,
    shadowRadius: 4.0,
    elevation: 10,
  },
  settingsContainer: {
    // flex:1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%',
    padding: 15,
    // marginTop: 40,
  },
  textMain: {
    color: '#FEFEFD',
  },
  textSec: {color: '#98989F'},
  text: {
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
    // position: 'absolute',
    //   fontFamily: ,
    fontSize: 18,
    //   fontWeight:,
  },
  textHead: {
    color: '#5A5B60',
    textAlign: 'center',
    fontWeight: '400',
    fontVariant: ['tabular-nums'],
  },
});
