import {AsyncStorage} from 'react-native';

// SAVE
export const saveStorage = (key, data) => {
  let store = data //{data: data};
  try {
    AsyncStorage.setItem(key, JSON.stringify(store));
    console.log(
      'storage > saved data > ' + key + ' > ' + JSON.stringify(store),
    );
  } catch (error) {
    console.log('ERROR > storage > save > ' + error);
  }
};

// LOAD
export const loadStorage = async key => {
  try {
    let store = await AsyncStorage.getItem(key);
    let parsed = JSON.parse(store);
    console.log('storage > reading > key > ' + key);
    alert(store);
    return parsed.data;
  } catch (error) {
    alert(error);
    console.log('ERROR > storage > read > ' + error);
  }
};

// REMOVE
export const removeStorage = key => {
  try {
    console.log('storage > removing > ' + key);
    AsyncStorage.removeItem(key);
    console.log('storage > removed');
  } catch (error) {
    console.log('ERROR > storage > remove > ' + error);
  }
};

// WIPE ALL
export const wipeStorage = async () => {
  try {
    AsyncStorage.clear();
    console.log('storage > wiped');
    alert('storage wiped!');
  } catch (error) {
    console.log('ERROR > storage > wipe > ' + error);
  }
};

// const storage = {
//   wipteStorage: async () => {
//     console.log('storage > wiped');
//     alert('storage wiped!');
//     AsyncStorage.clear();
//   },
//   helper2: function(param1) {},
//   helper3: function(param1, param2) {},
// };

// export default storage;
