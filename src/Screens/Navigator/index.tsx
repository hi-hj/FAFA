import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import App from '~/App';

import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import Map from '~/Screens/Map';

const LoginNavigator = createStackNavigator(
  {
  Login,
  },
  {
  defaultNavigationOptions: {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#faf8f7',
    },
    headerTransparent: true,
    headerTintColor: '#000000',
  },
}
);

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