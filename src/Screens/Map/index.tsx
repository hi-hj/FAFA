import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';


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

interface ILocation {
  latitude: number;
  longitude: number;
}

const Map = ({ navigation }:Props) => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);

  useEffect(() => {
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

  const _logout = () => {
      AsyncStorage.removeItem('key');
      navigation.navigate('LoginNavigator');
  }
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