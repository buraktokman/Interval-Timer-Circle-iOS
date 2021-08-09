import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

import haptic from '../src/vibrate';

const ButtonPause = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #62d424;
  box-shadow: inset 8px 8px 16px #53b41f;
  box-shadow: inset -8px -8px 16px #71f429;
`;
const ButtonStart = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #62d424;
  box-shadow: 20px 20px 50px #3d8;
  box-shadow: -2px -2px 5px #fff;
`;
const ButtonStop = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: linear-gradient(145deg, #69e327, #58bf20);
  box-shadow: 8px 8px 16px #53b41f;
  box-shadow: -8px -8px 16px #71f429;
`;

export default function CustomButton({title, onPress, type, active}) {
  const buttonStyle =
    type === 'start'
      ? styles.startButton
      : type === 'pause'
      ? styles.pauseButton
      : type === 'stop'
      ? styles.stopButtonActive
      : type === 'resume'
      ? styles.resumeButton
      : styles.button;
  const textStyle =
    type === 'start'
      ? styles.startText
      : type === 'pause'
      ? styles.pauseText
      : type === 'stop'
      ? styles.stopTextActive
      : type === 'resume'
      ? styles.resumeText
      : styles.text;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        haptic('focus');
      }}
      style={[styles.button, buttonStyle]}>
      {/* <ButtonStart>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </ButtonStart> */}
      <View style={styles.borderButton}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  borderButton: {
    // position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 2,
    borderColor: 'black',
    //flex: 1,
  },
  stopButtonActive: {
    backgroundColor: '#323334',
    shadowColor: '#323334',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.94,
    shadowRadius: 4.0,
    elevation: 10,
  },
  stopButtonDisable: {
    backgroundColor: '#1C1C1C1E',
    shadowColor: '#489dcf',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.94,
    shadowRadius: 4.0,
    elevation: 10,
  },
  stopTextActive: {
    color: '#FEFFFF',
  },
  stopTextDisable: {
    color: '#98989F',
  },
  pauseButton: {
    backgroundColor: '#CB064A',
    shadowColor: '#CB064A',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.94,
    shadowRadius: 4.0,
    elevation: 10,
  },
  pauseText: {
    color: 'white',
  },
  resumeButton: {
    backgroundColor: '#55b9f3',
    shadowColor: '#489dcf',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.94,
    shadowRadius: 4.0,
    elevation: 10,
  },
  resumeText: {
    color: 'black',
  },
  startButton: {
    backgroundColor: '#43B207',
    shadowColor: '#43B207',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.94,
    shadowRadius: 4.0,
    elevation: 10,
  },
  startText: {
    position: 'absolute',
    color: 'black',
  },
  text: {
    // color: 'white',
    // position: 'absolute',
    //   fontFamily: ,
    fontSize: 18,
    fontWeight: '400',
  },
});
