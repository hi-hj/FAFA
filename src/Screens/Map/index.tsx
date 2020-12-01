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

interface HCLocation {
 companyX: number;
 companyY: number;
 homeX: number;
 homeY: number;
}

const Map = ({ navigation }:Props) => {
  const fakedata1 = {
 companyX: 0,
 companyY: 0,
 homeX: 0,
 homeY: 0
  }
  
  const [currentLocation, setcurrentLocation] = useState<ILocation | undefined>(undefined);
  const [HCLocation, setHCLocation] = useState<HCLocation>(fakedata1);
  const [onRoad, setOnRoad] = useState<boolean>(false);

  let _watchId:number;
  

  const _logout = () => {
      /* AsyncStorage.removeItem('key');
      AsyncStorage.clear(); */
      navigation.navigate('Landing');
  }

  const updateKey = async (data: any) => {
    try {
      console.log("HC");
      const list = await AsyncStorage.getItem('HC');
      if (list !== null) {
        await AsyncStorage.mergeItem('HC', data);
      } else{
        await AsyncStorage.setItem('HC', data);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCurrentData = (data: any) => {
    fetch('http://nugu-play-fafa.eba-tsuiq7em.us-west-2.elasticbeanstalk.com/add_location/', {
      method: 'POST', // or 'PUT'
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data),   
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchHCData = (data: any) => {
    fetch('http://nugu-play-fafa.eba-tsuiq7em.us-west-2.elasticbeanstalk.com/set_location/', {
      method: 'POST', // or 'PUT'
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data),   
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };




    
  

  useEffect(() => {
    async function initHC() {
      try {
        console.log("HC");
        const list = await AsyncStorage.getItem('HC');
        if (list !== null) {
          setHCLocation(JSON.parse(list));
        }
      } catch (err) {
        console.log(err)
      }
     }
      initHC();
      _watchId = Geolocation.watchPosition(
      (position) => {
          const { latitude, longitude } = position.coords;
          const data = {
            "geoX": latitude,
            "geoY": longitude,
          };
          /* fetchCurrentData(data); */
          setcurrentLocation({ latitude, longitude });
        },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100,
        interval: 30000,
        fastestInterval: 2000,
      },
    );
    navigation.setParams({
      logout: _logout,
    });   
  }, []);

  useEffect(() => {
    const data = {
      latitude : currentLocation?.latitude,
      longitude : currentLocation?.longitude,
      onRoad : onRoad
    }
    console.log(data);
  }, [currentLocation]);

  useEffect(() => {
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, []);


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
            image={require('~/Assets/Images/current.png')}
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
          />
          {
            HCLocation && (
              <Marker
              title= "Home"
              image={require('~/Assets/Images/home.png')}
              coordinate={{
              latitude: HCLocation.homeX,
              longitude: HCLocation.homeY,
            }}
          />
            )
          }
          {
            HCLocation && (
              <Marker
              title= "Company"
              image={require('~/Assets/Images/business.png')}
              coordinate={{
              latitude: HCLocation.companyX,
              longitude: HCLocation.companyY,
            }}
          />
            )
          }
      </MapView>
    )}
    <SearchStyle>
    { HCLocation && <SearchButton
    label="Home"
    onPress={() => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const data = {
            companyX: HCLocation.companyX,
            companyY: HCLocation.companyY,
            homeX: latitude,
            homeY: longitude,
          }
          const bData = {
            user : "father",
            companyX: HCLocation.companyX,
            companyY: HCLocation.companyY,
            homeX: latitude,
            homeY: longitude,
          };
         /* fetchHCData(bData);*/
          setHCLocation(data);
          updateKey(JSON.stringify(data));
          console.log(data);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );    
    } }
    />}
    { HCLocation && <SearchButton 
    label="Company"
    style={{marginLeft: 5}}
    onPress={() => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const data = {
            companyX: latitude,
            companyY: longitude,
            homeX: HCLocation.homeX,
            homeY: HCLocation.homeY,
          }
          const bData = {
            user : "father",
            companyX: latitude,
            companyY: longitude,
            homeX: HCLocation.homeX,
            homeY: HCLocation.homeY
          };
         /* fetchHCData(bData); */
          setHCLocation(data);
          updateKey(JSON.stringify(data));
          console.log(data);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }}
    />}

  <SearchButton 
    label= {onRoad ? "도착" : "출발"}
    style={{marginLeft: 5}}
    onPress={() => {
      setOnRoad(!onRoad);
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


/*
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