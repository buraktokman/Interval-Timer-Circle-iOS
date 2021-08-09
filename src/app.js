import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  YellowBox,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import StopWatchScreen from '../screens/StopWatchScreen';
import TimerScreen from '../screens/TimerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SubscribeScreen from '../screens/SubscribeScreen';
import NotifyScreen from '../screens/NotifyScreen';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackSettings() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Subscribe" component={SubscribeScreen} />
      <Stack.Screen name="Notifications" component={NotifyScreen} />
    </Stack.Navigator>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBar}>
            {route.name === 'Timer' && (
              <Icon
                name="ios-notifications"
                size={24}
                color={isFocused ? '#43B207' : '#FFF'}
              />
            )}
            {route.name === 'StopWatch' && (
              <Entypo
                name="stopwatch"
                size={24}
                color={isFocused ? '#43B207' : '#FFF'}
              />
            )}
            {route.name === 'Settings' && (
              <Icon
                name="ios-settings"
                size={24}
                color={isFocused ? '#43B207' : '#FFF'}
              />
            )}
            <Text
              style={[
                styles.tabBarText,
                {color: isFocused ? '#43B207' : '#FFF'},
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  console.log('App.js > initiated');

  // ------

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Timer"
        tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="StopWatch" component={StopWatchScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Settings" component={StackSettings} />
      </Tab.Navigator>
      <SafeAreaView style={{backgroundColor: 'black'}} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  tabBarText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '400',
    // textTransform: 'uppercase',
  },
  tabBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    // height: 60,
    backgroundColor: 'black',
    // position: 'absolute',
    // bottom: 0,
  },
});

// Hide Warnings
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Switch',
]);
