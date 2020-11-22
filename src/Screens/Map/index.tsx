import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';

import SearchInput from '~/Components/SearchInput';
import SerchButton from '~/Components/SearchButton';
import SearchButton from '~/Components/SearchButton';

const Container = Styled.View`
    flex: 2;
    margin:10px;
`;

const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;

const SearchStyle = Styled.View`
  margin-top: 10px;
  flexDirection: row;
  `;

const Icon = Styled.Image`
`;


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

interface ILocation {
  latitude: number;
  longitude: number;
}

const Map = ({ navigation }:Props) => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);

  const _logout = () => {
      AsyncStorage.removeItem('key');
      navigation.navigate('LoginNavigator');
  }

  useEffect(() => {
    navigation.setParams({
      logout: _logout,
    });
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <Container>
    {location && (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Company"
        />
      </MapView>
    )}
    <SearchStyle>
    <SearchInput style={{marginBottom: 16,
    marginLeft: 7
    }} />
    <SearchButton 
    label="확인"
    style={{marginLeft: 5}}
    />
    </SearchStyle>
  </Container>
  );
};

interface INaviProps {
  navigation: NavigationScreenProp<NavigationState>;
}


Map.navigationOptions = ({ navigation }: INaviProps ) => {
  const logout = navigation.getParam('logout');
  return {
  title: 'NUGU',
  headerTintColor:'#141414',
  headerStyle:{
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
  },
  headerTitleStyle: {
      fontWeight: 'bold',
  },
  headerBackTitle: null,
  headerLeft: (
        <StyleButton
        onPress={()=> {
          if (logout && typeof logout === 'function'){
            logout();
          }
        }}>
        <Icon source={require('~/Assets/Images/ic_logout.png')} />
      </StyleButton>
  ),
};
}; 

export default Map;