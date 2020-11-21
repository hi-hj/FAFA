import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const Container = Styled.View`
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
      <MapView style={{flex: 1}} provider={PROVIDER_GOOGLE} 
      />
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