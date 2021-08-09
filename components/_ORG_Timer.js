import React, {Component} from 'react';
import {Text, Button, StyleSheet, View} from 'react-native';
import moment from 'moment';

// import * as storage from '../src/storage';
import AsyncStorage from '@react-native-community/async-storage';

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

export default class Timer extends Component {
  constructor(props) {
    super(props);
    // Timer
    this.state = {
      timeStart: 0,
      timerRunning: false,
      timerInterval: 4000, // miliSeconds
      roundCounter: 0,
      lastDivisible: 0,
    };
    //
    // this.subscriptionUser = {
    //     dateAppInstalled: new Date(),
    // };
  }

  // ------ STORAGE ---------------------

  _saveData = async () => {
    try {
      console.log(`state saving > ${JSON.stringify(this.state)}`);
      AsyncStorage.setItem('state', JSON.stringify(this.state));
      console.log('storage > state saved');
    } catch (error) {
      console.warn('ERROR > storage > saveData > ' + error);
    }
  };

  _getData = async () => {
    try {
      const lastState = await AsyncStorage.getItem('state');
      let lastStateParsed = JSON.parse(lastState);

      console.log(`state init > ${JSON.stringify(this.state)}`);
      console.log(`state from storage > ${JSON.stringify(lastStateParsed)}`);

      if (lastState !== null) {
        Object.keys(this.state).map((key) => {
          var data = lastStateParsed[key];
          console.log(key + ' >> ' + data);
          this.setState({[key]: data});
        });
      }
      console.log(`state after > ${JSON.stringify(this.state)}`);

      // Start Timer
      if (this.state.timerRunning === true) {
        console.log('_getData > resuming timer');
        // this.resume();
      }
    } catch (error) {
      console.warn('ERROR > storage > getData > ' + error);
    }
  };

  // ------ TIMER -----------------------

  intervalCheck = () => {
    const {timePassed, timerInterval, roundCounter, lastDivisible} = this.state;

    const [timePassedFloor, timerIntervalFloor] = [
      Math.floor(timePassed / 1000),
      Math.floor(timerInterval / 1000),
    ];

    if (
      timePassedFloor % timerIntervalFloor === 0 &&
      lastDivisible !== timePassedFloor
    ) {
      this.setState({
        roundCounter: roundCounter + 1,
        lastDivisible: Math.floor(timePassed / 1000),
      });
      console.log('timer > ping!');
    }
  };

  start = async () => {
    console.log('timer started');
    const timeNow = new Date().getTime();
    // const {timeStart} = this.state;
    await this.setState({
      timeStart: timeNow,
      timeNow,
      roundCounter: 0,
      timerRunning: true,
    });
    // Save to disk
    this._saveData();
    this.timer = setInterval(() => {
      // Update State
      this.setState({
        timeNow: new Date().getTime(),
      });
      // Ping
      // this.intervalCheck();
    }, 100);
  };

  stop = async () => {
    clearInterval(this.timer);
    await this.setState({
      timerRunning: false,
      timeStart: 0,
      timeNow: 0,
      roundCounter: 0,
    });
    // Save to disk
    this._saveData();
    console.log('timer > stop');
  };

  pause = async () => {
    clearInterval(this.timer);
    await this.setState({
      timerRunning: false,
    });
    // Save to disk
    this._saveData();
    console.log('timer > pause');
  };

  resume = async () => {
    console.log('log > resume');
    const timeNow = new Date().getTime();
    await this.setState({
      timeStart: timeNow,
      timeNow,
      timerRunning: true,
    });
    // Save to disk
    this._saveData();
    this.timer = setInterval(() => {
      // Update State
      this.setState({
        timeNow: new Date().getTime(),
      });
      // Ping
      // this.intervalCheck();
    }, 100);
  };

  // ----------------------------------

  // Load
  componentDidMount() {
    console.log('timer > loading last state');
    this._getData();
  }

  // Release allocated resources
  componentWillUnmount() {
    clearInterval(this.timer);
    // Save before exit
    this._saveData();
  }

  render() {
    const {timeNow, timeStart, roundCounter} = this.state;
    const timer = timeNow - timeStart;

    return (
      <View>
        <Text> Timer will earn ~$50 </Text>
        {/* <Timer interval={timer} /> */}
        <Text>timer: {timer / 1000}</Text>
        <Text>timeStart: {timeStart}</Text>
        <Text>roundCounter: {roundCounter}</Text>
        <Button title="start" onPress={this.start} />
        <Button title="pause" onPress={this.pause} />
        <Button title="resume" onPress={this.resume} />
        <Button title="stop" onPress={this.stop} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  timerContainer: {
    height: 20,
    backgroundColor: 'red',
  },
});
