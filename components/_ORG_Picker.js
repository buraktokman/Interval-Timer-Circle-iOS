import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';

// DOCS > https://github.com/mmazzarolo/react-native-modal-datetime-picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function intervalPicker(props) {
  console.log('picker > initiated');

  //   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    props.setDatePickerVisibility(true);
    console.log('picker > visible > ' + true);
  };
  const hideDatePicker = () => {
    props.setDatePickerVisibility(false);
    console.log('picker > visible > ' + false);
  };

  const handleConfirm = (date) => {
    let datePicked = date.getHours() + ':' + date.getMinutes();
    // let dateFuture = date.setMinutes() + 6 * 1000;
    console.warn('picker > EDITED > confirm > ', datePicked);
    console.warn('picker > DEFAULT > confirm > ', date);
    // Hide
    hideDatePicker();
    // Edit Reminders
    props.handleRemindEdit(props.remindIndex, date);
  };

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        locale="en_GB"
        isVisible={props.isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        headerTextIOS="Pick a time"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
