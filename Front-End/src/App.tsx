import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {StatusBar} from 'react-native';
import Navigator from '~/Screens/Navigator';
import Geolocation from 'react-native-geolocation-service';

interface Props {}

const App = ({ }: Props) => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Navigator />
    </>
  );
};
export default App;