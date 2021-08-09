/*
Progress Bar Components > react-native-progress
https://github.com/oblador/react-native-progress
*/
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Surface, Shape} from '@react-native-community/art';
import * as Progress from 'react-native-progress';
import moment from 'moment';

export default class CircleProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatTime = (interval) => {
    // const pad = (n) => (n < 10 ? '0' + n : n);
    // Return Hourly format if time is at least 1 hour
    return interval >= 60 * 60 * 1000
      ? moment.utc(interval).format('mm:ss,SS')
      : moment.utc(interval).format('mm:ss,SS');
  };

  getTimeLeftBox = () => {
    return {
      width: 280, // this.state.timerInterval / 1000 > 60 * 60 ? 345 : 260,
    };
  };
  getTimeLeftText = () => {
    return {
      fontSize: 70, // this.state.timerInterval / 1000 > 60 * 60 ? 86 : 100,
    };
  };

  // ------- LIFE ---------

  UNSAFE_componentWillReceiveProps() {
    this.formatTime(this.props.timePassed);
    this.setState({
      progress: this.props.progress === 1 ? 0 : 1 - this.props.progress,
      timerRunning: this.props.timerRunning,
      timePassed: this.props.timePassed,
      // timeSinceLastRound: this.props.timeSinceLastRound,
    });
  }

  // ------- RENDER ---------

  render() {
    const {timePassed, timerRunning} = this.props;

    return (
      <View style={styles.container}>
        <Progress.Circle
          progress={1.0}
          indeterminate={timerRunning}
          indeterminateAnimationDuration={2000}
          style={styles.progress}
          size={360}
          thickness={20}
          borderWidth={0}
          unfilledColor="#25262B"
          color="#FFF" // # FCA00B
          strokeCap="round"
        />
        <View style={styles.innerCircle}>
          <View style={styles.timePassedBox}>
            <Text style={styles.text}>ELAPSED</Text>
            {/* <Text style={styles.text}>{this.formatTime(timePassed)}</Text> */}
          </View>
          <View style={[styles.timeLeftBox, this.getTimeLeftBox()]}>
            <Text style={[styles.timeLeftText, this.getTimeLeftText()]}>
              {this.formatTime(timePassed)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'darkgrey',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  progress: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // margin: 10,
  },
  innerCircle: {
    backgroundColor: 'black',
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 160,
    // paddingVertical: 80,
    height: 320,
    width: 320,
    shadowColor: '#323334',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.94,
    shadowRadius: 8.0,
    elevation: 10,
  },
  infoBar: {
    flex: 1,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#5A5B60',
    fontWeight: '400',
    fontVariant: ['tabular-nums'],
  },
  timeLeftBox: {
    justifyContent: 'center',
    // width: 260,
  },
  timeLeftText: {
    fontVariant: ['tabular-nums'],
    color: 'white',
    // fontSize: 100,
    fontWeight: '200',
  },
  timerIntervalBox: {
    alignItems: 'center',
  },
  timePassedBox: {
    alignItems: 'center', // flex-end
  },
  timeSinceLastRoundBox: {},
  roundCounterBox: {
    alignItems: 'center',
  },
  roundCounterText: {},
  timerContainer: {
    height: 20,
    backgroundColor: 'red',
  },
});
