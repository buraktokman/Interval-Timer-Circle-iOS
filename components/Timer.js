import React, {Component} from 'react';
import {Text, Button, StyleSheet, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as notify from '../src/notification';
import haptic from '../src/vibrate';

import DurationPicker from '../components/DurationPicker';
import CircleProgress from '../components/CircleProgress';
import CustomButton from '../components/CustomButton';
import BarInfoTimer from '../components/BarInfoTimer';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    // Timer
    this.state = {
      timeStart: 0,
      timeNow: 0,
      timerRunning: false,
      timePassed: 0,
      timerInterval: 60000, // miliSeconds
      roundCounter: 0,
      lastDivisible: 0,
    };
    //
    // this.subscriptionUser = {
    //     dateAppInstalled: new Date(),
    // };
  }

  // ------ HANDLER ---------------------

  handlerIntervalPick = (val) => {
    console.log(`ping interval set to: ${val}`);
    this.setState({timerInterval: val});
  };

  // ------ STORAGE ---------------------

  _saveData = async () => {
    try {
      // console.log(`state saving > ${JSON.stringify(this.state)}`);
      AsyncStorage.setItem('state', JSON.stringify(this.state));
      // console.log('storage > state saved');
    } catch (error) {
      console.warn('ERROR > storage > saveData > ' + error);
    }
  };

  _getData = async () => {
    try {
      const lastState = await AsyncStorage.getItem('state');
      let lastStateParsed = JSON.parse(lastState);

      // console.log(`state init > ${JSON.stringify(this.state)}`);
      // console.log(`state from storage > ${JSON.stringify(lastStateParsed)}`);

      if (lastState !== null) {
        await Object.keys(this.state).map((key) => {
          this.setState({[key]: lastStateParsed[key]});
        });
        // console.log(`state after > ${JSON.stringify(this.state)}`);
      }

      // Start Timer
      if (this.state.timerRunning === true) {
        console.log('_getData > resuming timer');
        this.resumeOnStart();
      }
    } catch (error) {
      console.warn('ERROR > storage > getData > ' + error);
    }
  };

  // ------ NOTIFICATIONS ---------------

  airNotifications = () => {
    console.log('re-scheduling all notifications');
    const {timerInterval, roundCounter} = this.state;
    // Reset
    // notify.cancelAllNotify();

    // Get All Notify
    notify.scheduleAllNotify(timerInterval);

    // Add New
    // for (let i = 2; i < 10; i++) {
    //   notify.addNotifySchedule(
    //     'Timer',
    //     `Round ${roundCounter + i}`,
    //     new Date(Date.now() + timerInterval * i),
    //     'time',
    //   );
    // }
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
      console.log(`timer > ping! ${this.state.lastDivisible}`);
      // Notify Now
      if (roundCounter === 0) {
        notify.addNow('Timer', `Round ${roundCounter + 1}`);
      }
      // Schedule
      this.airNotifications();
      // Vibrate
      haptic('focus');
    }
  };

  start = async () => {
    if (this.state.timerInterval === 0) {
      console.warn('CAUTION > Ping interval cannot be Zero!');
      Alert.alert(
        'Ouch 😅',
        'Ping interval cannot be Zero!',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      return;
    }
    console.log('timer started');
    const timeNow = new Date().getTime();
    // const {timeStart} = this.state;
    await this.setState({
      timerRunning: true,
      timeStart: timeNow,
      timePassed: 0,
      timeNow,
      roundCounter: 0,
    });
    // Save to disk
    this._saveData();
    // Place Notifications
    // this.airNotifications()
    // Start Timer
    this.timer = setInterval(() => {
      // Update State
      this.setState({
        timeNow: new Date().getTime(),
        timePassed: new Date().getTime() - timeNow,
      });
      // Save
      this._saveData();
      // Ping
      this.intervalCheck();
    }, 100);
  };

  stop = async () => {
    console.log('timer > stop');
    clearInterval(this.timer);
    await this.setState({
      timerRunning: false,
      timeStart: 0,
      timeNow: 0,
      timePassed: 0,
      roundCounter: 0,
      lastDivisible: 0,
    });
    // Save to disk
    this._saveData();
    // Kill Notifications
    notify.cancelAllNotify();
  };

  pause = async () => {
    console.log('timer > pause');
    clearInterval(this.timer);
    await this.setState({
      timerRunning: false,
    });
    // Save to disk
    this._saveData();
    // Kill Notifications
    notify.cancelAllNotify();
  };

  resume = async () => {
    console.log('timer > resume');
    const {timePassed} = this.state;
    const timeNow = new Date().getTime();
    await this.setState({
      // timeStart: timeNow,
      timeNow,
      timerRunning: true,
    });
    this.timer = setInterval(() => {
      // Update State
      this.setState({
        timeNow: new Date().getTime(),
        timePassed: new Date().getTime() - timeNow + timePassed,
      });
      // Save
      this._saveData();
      // Ping
      this.intervalCheck();
    }, 100);
  };

  // Resume function - Use on Start
  resumeOnStart = async () => {
    console.log('timer > resumeAuto');
    const {timePassed, timeStart} = this.state;

    this.timer = setInterval(() => {
      // Update State
      this.setState({
        timeNow: new Date().getTime(),
        timePassed: new Date().getTime() - timeStart, // + timePassed,
      });
      // Save
      this._saveData();
      // Ping
      this.intervalCheck();
    }, 100);
  };

  // ------ CALCULATE ------------------

  timeSinceLastRound = () => {
    const {timePassed, timerInterval} = this.state;
    return timePassed % timerInterval;
  };

  getProgress = () => {
    const {timerInterval} = this.state;
    return this.timeSinceLastRound() / timerInterval; // * 100;
  };

  // ------ LIFE -----------------------

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
    const {
      timeNow,
      timeStart,
      timePassed,
      roundCounter,
      timerInterval,
      timerRunning,
    } = this.state;
    // const timer = timeNow - timeStart;

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {timerRunning || timePassed > 0 ? (
            <CircleProgress
              progress={this.getProgress()}
              roundCounter={roundCounter}
              timeSinceLastRound={this.timeSinceLastRound()}
              timePassed={timePassed}
              timerInterval={timerInterval}
            />
          ) : (
            <DurationPicker handlerIntervalPick={this.handlerIntervalPick} />
          )}
        </View>

        <View style={{marginTop: 0}}>
          <BarInfoTimer
            timePassed={timePassed}
            timerInterval={timerInterval}
            rounderCounter={roundCounter}
          />
        </View>

        <View style={styles.midContainer}>
          <View style={styles.buttonContainer}>
            <CustomButton
              type="stop"
              title="Stop"
              onPress={this.stop}
              enabled={timerRunning}
            />
            {timerRunning && (
              <CustomButton
                type="pause"
                title="Pause"
                onPress={this.pause}
                enabled={timerRunning}
              />
            )}
            {!timerRunning && timePassed === 0 ? (
              <CustomButton
                type="start"
                title="Start"
                onPress={this.start}
                enabled={!timerRunning}
              />
            ) : null}
            {!timerRunning && timePassed > 0 ? (
              <CustomButton
                type="resume"
                title="Resume"
                onPress={this.resume}
                enabled={!timerRunning}
              />
            ) : null}
          </View>
        </View>

        {/* <View style={{backgroundColor: 'darkgrey'}}>
          <Text>timeStart: {timeStart}</Text>
          <Text>TOTAL ELAPSED {timePassed / 1000}</Text>
          <Text>ROUNDS: {Math.floor(timePassed / timerInterval)}</Text>
          <Text>ELAPSED: {this.timeSinceLastRound() / 1000}</Text>
          <Text>INTERVAL: {timerInterval / 1000} seconds</Text>
           <Button title="kill notifs" onPress={notify.cancelAllNotify} />
          <Button
            title="show notifs"
            onPress={() => notify.scheduleAllNotify(timerInterval)}
          /> 
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  topContainer: {
    height: 370,
    width: '100%',
  },
  midContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignContent: 'center',
    // marginTop: 35,
    paddingHorizontal: 20,
    // paddingVertical: 15,
    // marginTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#333',
  },
});
