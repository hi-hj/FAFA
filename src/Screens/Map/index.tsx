import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';

const Container = Styled.ScrollView`
  flex: 1;
`;

const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;
const Icon = Styled.Image`
`;


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const Map = ({ navigation }:Props) => {
  const _logout = () => {
      AsyncStorage.removeItem('key');
      navigation.navigate('LoginNavigator');
  }

  return (
    <Container>
      <StyleButton
        onPress={()=> {
            _logout();
        }
        }>
        <Icon source={require('~/Assets/Images/ic_logout.png')} />
      </StyleButton>
    </Container>
  );
};

Map.navigatonOptions = {
  title: 'FAFA',
  headerTransparent: true,
  headerTintColor: '#ffffff',
  headerTitleStyle: {
      fontWeight: 'bold,'
  },
};

export default Map;