import React, {useState} from 'react';
import {
  StyleSheet,
  Linking,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {
  ThemeProvider,
  DefaultTheme,
  TableView,
  NavigationRow,
  InfoRow,
  SwitchRow,
  RowItem,
  TextFieldRow,
} from 'react-native-ios-kit';
import color from 'color';

import Header from '../shared/Header';

const theme = {
  ...DefaultTheme,
  primaryColor: '#EFFD0A',
  backgroundColor: 'black',
  textColor: 'white',
  barColor: '#202023',
  footnoteBackgroundColor: '#1C1C1C1E',
  dividerColor: '#444',
  primaryLightColor: color('tomato').lighten(0.2).rgb().string(),
  disabledColor: 'yellow',
};

export default function Settings({navigation, props}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <SafeAreaView style={styles.settingsTable}>
          <ScrollView>
            <TableView
              header="Welcome to Global Settings"
              headerStyle={{alignItems: 'center'}}
              footer="All notifications will be disabled if you toggle this off"
              footerStyle={{alignItems: 'center'}}
              withoutFooter={false}
              withoutHeader={false}>
              <SwitchRow
                theme={theme}
                title="Notifications"
                icon={'ios-notifications-outline'}
                value={isEnabled}
                onValueChange={(value) => setIsEnabled(value)}
              />
            </TableView>
            <TableView withoutFooter={true} withoutHeader={true}>
              <NavigationRow
                title="Recommend this App"
                onPress={() => {
                  console.log('settings > recommend this app');
                  Linking.openUrl(
                    'https://itunes.apple.com/us/app/expo-client/id982107779?mt=8',
                  );
                }}
              />
              <NavigationRow
                title="Rate if you liked"
                onPress={() => {
                  console.log('settings > rate this app');
                  Linking.openUrl(
                    'https://itunes.apple.com/us/app/expo-client/id982107779?mt=8',
                  );
                }}
              />
            </TableView>
            <TableView withoutFooter={true} withoutHeader={false}>
              <NavigationRow
                title="E-mail"
                onPress={() => {
                  console.log('settings > opening send email');
                  Linking.openURL(
                    'mailto:hello@bulrosa.com?subject=Circle Timer App v1.1',
                  ).catch((err) =>
                    console.error('ERROR > cannot open send email', err),
                  );
                }}
                info="hello@bulrosa.com"
              />
              <NavigationRow
                title="Web"
                onPress={() => {
                  console.log('settings > opening webpage'),
                    Linking.openURL('https://www.bulrosa.com').catch((err) =>
                      console.error(
                        'ERROR > settings > cannot open webpage',
                        err,
                      ),
                    );
                }}
                info="Bulrosa.com"
              />
            </TableView>
            <TableView
              footerStyle={{alignItems: 'center'}}
              footer="Developed by Bulrosa with 💕"
              // onFooterPress={() => alert('Hello')}
            >
              <NavigationRow
                title="Terms & Conditions"
                onPress={() => {
                  console.log('settings > opening terms webpage'),
                    Linking.openURL(
                      'https://www.bulrosa.com/terms/terms-of-use.html',
                    ).catch((err) =>
                      console.error(
                        'ERROR > settings > cannot open webpage',
                        err,
                      ),
                    );
                }}
                info=""
              />
              <NavigationRow
                title="Privacy Policy"
                onPress={() => {
                  console.log('settings > opening privacy webpage'),
                    Linking.openURL(
                      'https://www.bulrosa.com/privacy/privacy-policy.html',
                    ).catch((err) =>
                      console.error(
                        'ERROR > settings > cannot open webpage',
                        err,
                      ),
                    );
                }}
                info=""
              />
            </TableView>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // margin: 20,
  },
  settingsRows: {
    marginTop: 20,
  },
  settingsTable: {
    flex: 1,
    backgroundColor: 'black',
  },
});
