/*
Progress Bar Components > react-native-progress
https://github.com/oblador/react-native-progress
*/
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Surface, Shape} from '@react-native-community/art';
import * as Progress from 'react-native-progress';
import moment from 'moment';

function ParseTimer({interval}) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);
  console.log(duration);

  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={[styles.timerContainer, {flexDirection: 'row'}]}>
      <Text>
        {pad(duration.minutes())}:{pad(duration.seconds())}:{pad(centiseconds)}
      </Text>
    </View>
  );
}

export default class CircleProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      roundCounter: 0,
      timeSinceLastRound: 0,
      //timerInterval: 60 * 60,
    };
  }

  formatTime = (interval) => {
    // const pad = (n) => (n < 10 ? '0' + n : n);
    // Return Hourly format if time is at least 1 hour
    return this.props.timerInterval >= 60 * 60 * 1000
      ? moment.utc(interval).format('HH:mm:ss')
      : moment.utc(interval).format('mm:ss');
  };

  getTimeLeftBox = () => {
    return {
      width: this.props.timerInterval / 1000 > 60 * 60 ? 280 : 260,
    };
  };
  getTimeLeftText = () => {
    return {
      fontSize: this.props.timerInterval / 1000 > 60 * 60 ? 70 : 100,
    };
  };

  // ------- LIFE ---------

  UNSAFE_componentWillReceiveProps() {
    this.formatTime(this.props.timePassed);
    this.setState({
      progress: this.props.progress === 1 ? 0 : 1 - this.props.progress,
      roundCounter: this.props.roundCounter,
      // timeSinceLastRound: this.props.timeSinceLastRound,
    });
  }

  // ------- RENDER ---------

  render() {
    const {progress} = this.state;
    const {
      timePassed,
      timeSinceLastRound,
      timerInterval,
      roundCounter,
    } = this.props;

    return (
      <View style={styles.container}>
        <Progress.Circle
          progress={progress}
          // endAngle={0.5}
          // animated={animated}
          style={styles.progress}
          size={360}
          thickness={20}
          // direction="counter-clockwise"
          // borderColor={}
          borderWidth={0}
          unfilledColor="#25262B"
          color="#EFFD0A" // # FCA00B
          strokeCap="round"
          // showsText={true}
          // formatText={(progress) => `~${this.props.timeSinceLastRound/1000}`}
        />
        <View style={styles.innerCircle}>
          <View style={styles.timePassedBox}>
            <Text style={styles.text}>REMAINING</Text>
            {/* <Text style={styles.text}>{this.formatTime(timePassed)}</Text> */}
          </View>
          <View style={[styles.timeLeftBox, this.getTimeLeftBox()]}>
            <Text style={[styles.timeLeftText, this.getTimeLeftText()]}>
              {this.formatTime(timerInterval - timeSinceLastRound)}
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
