import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';

export default class DurationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 1,
      seconds: 0,
    };
    this.options = this.createPicker(); //[0, 1, 2];
  }

  // ----- PICKER OPTIONS-------

  createPicker = () => {
    var foo = new Array(60);
    for (var i = 0; i < foo.length; i++) {
      foo[i] = i;
    }
    return foo;
  };

  // ------ STORAGE ---------------------

  _saveData = async () => {
    try {
      AsyncStorage.setItem('statePicker', JSON.stringify(this.state));
    } catch (error) {
      console.warn('ERROR > storage > saveData > ' + error);
    }
  };

  _getData = async () => {
    try {
      const lastState = await AsyncStorage.getItem('statePicker');
      let lastStateParsed = JSON.parse(lastState);
      // console.log(
      //   `statePicker from storage > ${JSON.stringify(lastStateParsed)}`,
      // );

      if (lastState !== null) {
        await Object.keys(this.state).map((key) => {
          this.setState({[key]: lastStateParsed[key]});
        });
      }
    } catch (error) {
      console.warn('ERROR > storage > getData > ' + error);
    }
  };

  // ----- HANDLER-------------

  handleValueChange = () => {
    const {hours, minutes, seconds} = this.state;
    if (hours === 0 && minutes === 0 && seconds === 0) {
      this.setState({seconds: 1});
    }
    this._saveData();
    // const {hours, minutes, seconds} = this.state;
    this.props.handlerIntervalPick(
      (this.state.seconds + minutes * 60 + hours * 60 * 60) * 1000,
    );
  };

  // ----- LIFE ---------------

  componentDidMount() {
    // this.createPicker();
    this._getData();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pickerStack}>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.hours}
            onValueChange={async (val) => {
              await this.setState({hours: val});
              this.handleValueChange();
            }}>
            {this.options.map((val, index) => (
              <Picker.Item key={val} label={String(val)} value={val} />
            ))}
          </Picker>
          <Picker
            style={styles.pickerText}
            itemStyle={styles.pickerItem}
            selectedValue="hours"
            enabled={false}>
            <Picker.Item key="hours" label="hours" value="hours" />
          </Picker>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.minutes}
            onValueChange={async (val) => {
              await this.setState({minutes: val});
              this.handleValueChange();
            }}>
            {this.options.map((val, index) => (
              <Picker.Item key={val} label={String(val)} value={val} />
            ))}
          </Picker>
          <Picker
            style={styles.pickerText}
            itemStyle={styles.pickerItem}
            selectedValue="mins"
            enabled={false}>
            <Picker.Item key="mins" label="mins" value="mins" />
          </Picker>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.seconds}
            onValueChange={async (val) => {
              await this.setState({seconds: val});
              this.handleValueChange();
            }}>
            {this.options.map((val) => (
              <Picker.Item key={val} label={String(val)} value={val} />
            ))}
          </Picker>
          <Picker
            style={styles.pickerText}
            itemStyle={styles.pickerItem}
            selectedValue="secs"
            enabled={false}>
            <Picker.Item key="secs" label="secs" value="secs" />
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 395,
    // backgroundColor: 'black',
    alignSelf: 'center',
  },
  picker: {
    width: 50,
    // backgroundColor:'red'
  },
  pickerText: {
    width: 82,
    // borderWidth: 1,
    // borderColor:'red',
    height: 20,
    // backgroundColor: 'lightgrey',
    // marginLeft: 0,
    marginLeft: -22,
    // alignItems: 'center',
    //paddingRight: 15,
    // justifyContent: 'flex-start',
  },
  pickerItem: {
    color: 'white',
  },
  pickerStack: {
    alignSelf: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '100%',
    // height: 220,
  },
});
