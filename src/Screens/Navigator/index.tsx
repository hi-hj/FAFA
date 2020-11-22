import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';


import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import Map from '~/Screens/Map';

const LoginNavigator = createStackNavigator({
  Login,
  });

const MapNavigator = createStackNavigator({
  Map,
})

const AppNavigator = createSwitchNavigator(
  {
    CheckLogin,
    LoginNavigator,
    MapNavigator,
  },
  {
    initialRouteName: 'CheckLogin',
  }  
);

export default createAppContainer(AppNavigator);