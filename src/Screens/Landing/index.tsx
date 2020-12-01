import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ActivityIndicator } from 'react-native';
import Styled from 'styled-components/native';

import Button from '~/Components/Button';

const Container = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const FormContainer = Styled.View`
  width: 100%;
  padding: 40px;
  margin-top : 50px;
`;

const PasswordReset = Styled.Text`
  width: 100%;
  font-size: 12px;
  color: #000000;
  text-align: center;
`;

const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;

const Icon = Styled.Image`
`;

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const Landing =  ({ navigation }: Props) => {
    
    const _logout = () => {
        /* AsyncStorage.removeItem('key');
        AsyncStorage.clear(); */
        navigation.navigate('LoginNavigator');
    }
    useEffect(() => {
       
        navigation.setParams({
          logout: _logout,
        });   
      }, []);

    return (
        <Container>
        <FormContainer>
        <Button
          style={{marginTop: 24}}
          label="알람"
          onPress={() => {
            AsyncStorage.setItem('key', 'JWT_KEY');
            navigation.navigate('Alarm');
          }}
        />
        <Button
          style={{marginTop: 24}}
          label="지도"
          onPress={() => {
            AsyncStorage.setItem('key', 'JWT_KEY');
            navigation.navigate('Map');
          }}
        />
        </FormContainer>
      </Container>
    );
};

interface INaviProps {
    navigation: NavigationScreenProp<NavigationState>;
  }

Landing.navigationOptions = ({ navigation }: INaviProps ) => {
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

export default Landing;
