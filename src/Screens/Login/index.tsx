import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import {Linking} from 'react-native';
import Styled from 'styled-components/native';


import Input from '~/Components/Input';
import Button from '~/Components/Button';
import { Value } from 'react-native-reanimated';

const Nugu = Styled.Image`
  width : 250px;
  height : 100px;
  align-items: center;
  margin-top : 50px;
`;

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
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

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface ILocation {
  latitude: number;
  longitude: number;
  name: String;
}


const Login = ({navigation}: Props) => {
const [username, setName] = useState("")

  return (
    <Container>
      <Nugu source = {require('~/Assets/Images/Nugu.png')} />
      <FormContainer>
        <Input style={{marginBottom: 16}} placeholder="아이디" 
        onChangeText= { text => setName(text)}
        />
        <Input
          style={{marginBottom: 16}}
          placeholder="비밀번호"
          secureTextEntry={true}
        />
        <Button
          style={{marginTop: 24}}
          label="로그인"
          onPress={() => {
            if(username!="father"&& username!="mother"){
              return 0;
            }
            fetch('http://nugu-play-fafa.eba-tsuiq7em.us-west-2.elasticbeanstalk.com/login', {
            method: 'POST', // or 'PUT'
            headers: {
          'Content-Type': 'application/json',
            },
            body: JSON.stringify({username}),   
           })
          .then(response => response.json())
          .then(data => {
            AsyncStorage.setItem('HC', JSON.stringify(data));
            console.log('Success:', data);
           })
      .catch((error) => {
        console.error('Error:', error);
      });
            navigation.navigate('Landing');
          }}
        />
        <PasswordReset
          style={{marginTop: 24}}
          onPress={() => {
            Linking.openURL("https://auth.skt-id.co.kr/auth/authorize.do?client_id=f8f01fc4-dff4-4c47-93de-241619c87e5c&client_secret=eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.453rASFXAeJzzFLSiWaJgBxBTY44vObKKf3Zfs5UwzPjX6ZmuI9h6A.HmuGMMswDAMDe-62._7r4kKAhoSbSmeDhj2HU2pjp0gPBJnCR8G1aMZN20HAwW3iwnNeif8sv8c5gPZCCfEWhHDj4wZbE18cLP6qERr1jKaPZEXoA8NwDDkmqJckakQU.M4h7oIC3LVxcx198F--IXQ&redirect_uri=https://www.nugu.co.kr/tid/tidReturn&scope=openid&response_type=id_token%20token&state=SoxoUmp2NdUCDJ07iHLrusoZ1wPs2HMJ&nonce=9lpR7kSfIwo6dMPYdROPskzYt50Zbypz&client_type=WEB&service_type=14&popup_request_yn=N&chnl_q=aHR0cHM6Ly93d3cubnVndS5jby5rci8");
          }}>
          비밀번호 재설정
        </PasswordReset>
      </FormContainer>
    </Container>
  );
};

Login.navigationOptions = {
  title: "NUGU",
  headerTrasnparent: true,
  headerTintColor: '#171616',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default Login;