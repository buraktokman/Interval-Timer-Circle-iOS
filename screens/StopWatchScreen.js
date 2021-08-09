import React, {Component} from 'react';
import {Text, Button, StyleSheet, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import CircleProgressStopWatch from '../components/CircleProgressStopWatch';
import CustomButton from '../components/CustomButton';
import BarInfoStopWatch from '../components/BarInfoStopWatch';
import Header from '../shared/Header';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    // Timer
    this.state = {
      timeStart: 0,
      timeNow: 0,
      timerRunning: false,
      timePassed: 0,
    };
  }

  // ------ STORAGE ---------------------

  _saveData = async () => {
    try {
      // console.log(`state saving > ${JSON.stringify(this.state)}`);
      AsyncStorage.setItem('stateStopWatch', JSON.stringify(this.state));
      // console.log('storage > state saved');
    } catch (error) {
      console.warn('ERROR > storage > saveData > ' + error);
    }
  };

  _getData = async () => {
    try {
      const lastState = await AsyncStorage.getItem('stateStopWatch');
      let lastStateParsed = JSON.parse(lastState);

      if (lastState !== null) {
        await Object.keys(this.state).map((key) => {
          this.setState({[key]: lastStateParsed[key]});
        });
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

  // ------ TIMER -----------------------

  start = async () => {
    console.log('timer started');
    const timeNow = new Date().getTime();
    // const {timeStart} = this.state;
    await this.setState({
      timerRunning: true,
      timeStart: timeNow,
      timePassed: 0,
      timeNow,
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
    });
    // Save to disk
    this._saveData();
  };

  pause = async () => {
    console.log('timer > pause');
    clearInterval(this.timer);
    await this.setState({
      timerRunning: false,
    });
    // Save to disk
    this._saveData();
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
    }, 100);
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
      timerRunning,
    } = this.state;
    // const timer = timeNow - timeStart;

    return (
      <View style={styles.container}>
        <Header title="Stop Watch" active={this.state.timerRunning} />
        <View style={styles.topContainer}>
          <CircleProgressStopWatch
            progress={1.0}
            timePassed={timePassed}
            timerRunning={timerRunning}
          />
        </View>
        <View style={{marginTop: 0}}>
          <BarInfoStopWatch
            timePassed={timePassed}
            timeStart={timeStart}
            timerInterval={0}
            rounderCounter={0}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  topContainer: {
    height: 370,
    width: '100%',
  },
  midContainer: {
    flex: 1,
    // justifyContent:'center',
    alignContent:'center',
    paddingHorizontal: 20,
    // paddingVertical: 15,
    // marginTop: 35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#333',
  },
});
