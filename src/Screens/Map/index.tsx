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
  name: string;
}

const Map = ({ navigation }:Props) => {
  const [locations, setLocation] = useState<Array<ILocation>>([]);

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
        const name = "now";
        setLocation([...locations,{
          latitude,
          longitude,
          name
        }]);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [locations]);

  return (
    <Container>
    {locations.length > 0 && (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: locations[0].latitude,
          longitude: locations[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
          }}
          title= {locations[0].name}
        />
      </MapView>
    )}
    <SearchStyle>
    <SearchInput style={{marginBottom: 16,
    marginLeft: 7
    }} />
    <SearchButton 
    label="Check"
    style={{marginLeft: 5}}
    onPress={() => {
      console.log('fetch start!');
      fetch('http://nugu-play-fafa.eba-tsuiq7em.us-west-2.elasticbeanstalk.com/location/', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: "hi", geoX:"1", geoY:"2" }),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
      
    }}
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