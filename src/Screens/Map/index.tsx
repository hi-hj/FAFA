import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';


import SearchInput from '~/Components/SearchInput';
import SerchButton from '~/Components/SearchButton';
import SearchButton from '~/Components/SearchButton';
import { add } from 'react-native-reanimated';

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
  const [currentLocation, setcurrentLocation] = useState<ILocation | undefined>(undefined);
  const [homeLocation, sethomeLocation] = useState<ILocation>();
  const [companyLocation, setcompanyLocation] = useState<ILocation>();
  const [change, setchange] = useState<boolean>(true);

  const _logout = () => {
      AsyncStorage.removeItem('key');
      AsyncStorage.clear();
      navigation.navigate('LoginNavigator');
  }

    
  

  useEffect(() => {

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setcurrentLocation({
          latitude,
          longitude,
        })
        console.log(currentLocation);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    navigation.setParams({
      logout: _logout,
    });


  }, [change]);

  return (
    <Container>
    { currentLocation && (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <Marker
            title= "current"
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
          />
          {
            homeLocation && (
              <Marker
              title= "Home"
              coordinate={{
              latitude: homeLocation.latitude,
              longitude: homeLocation.longitude,
            }}
          />
            )
          }
          {
            companyLocation && (
              <Marker
              title= "Company"
              coordinate={{
              latitude: companyLocation.latitude,
              longitude: companyLocation.longitude,
            }}
          />
            )
          }
      </MapView>
    )}
    <SearchStyle>
    <SearchButton
    label="Home"
    onPress={() => {
    const home  = {
      latitude: 37.5628379,
      longitude: 127.0449174,
    }
    sethomeLocation(home);
    setchange(!change);
    
    }}
    />
    <SearchButton 
    label="Company"
    style={{marginLeft: 5}}
    onPress={() => {
      const company  = {
        latitude: 37.5628375,
        longitude: 127.0383513,
      }
      setcompanyLocation(company);
      setchange(!change);
      
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



/* console.log('fetch start!');
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
}); */