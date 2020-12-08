import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';


import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import Map from '~/Screens/Map';
import Landing from '~/Screens/Landing';
import Alarm from '~/Screens/Alarm';

const LoginNavigator = createStackNavigator({
  Login,
  });

const MapNavigator = createStackNavigator({
  Map,
});


const LandingNavigator = createStackNavigator({
  Landing,
});

const AlarmNavigator = createStackNavigator({
  Alarm,
});

const AppNavigator = createSwitchNavigator(
  {
    CheckLogin,
    LoginNavigator,
    MapNavigator,
    LandingNavigator,
    AlarmNavigator,
  },
  {
    initialRouteName: 'CheckLogin',
  }  
);

export default createAppContainer(AppNavigator);