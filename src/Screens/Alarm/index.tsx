import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ActivityIndicator } from 'react-native';
import Styled from 'styled-components/native';

import Button from '~/Components/Button';
import AlertButton from '~/Components/AlertButton';

const Container = Styled.View`
    flex: 1;
    align-items: center;
    background-color: #faf9f5;
`;

const FormContainer = Styled.View`
  margin-top : 10px;
  width: 100%;
`;



const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;

const Icon = Styled.Image`
`;

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

interface INaviProps {
    navigation: NavigationScreenProp<NavigationState>;
  }

  interface AlarmD {
    alertType : number;
    timeStamp : string;
    user : string;
  }

  
const Alarm =  ({ navigation }: Props) => {
    const [alarmData, setalarmData] = useState<Array<AlarmD>|undefined>(undefined);
  
    const _logout = () => {
        navigation.navigate('Landing');
    }

    const _alert = (data:any) => {
        if(data==0){
            return "아이가 찾고 있어요";
        }else{
            return "아이가 집에 도착했어요";
        }
    };

    const _time = (data:any) => {
        const MonthDay = data.substring(5,10)
        const time = data.substring(11,16)
        return MonthDay+"  "+time;
    }

    

    useEffect(() => {
       
        navigation.setParams({
          logout: _logout,
        });   

        fetch('http://fafa-dev.ap-northeast-2.elasticbeanstalk.com/alert/')
        .then(res => {
            // response 처리
            // 응답을 JSON 형태로 파싱
            return res.json();
         })
        .then(data => {
          const newData = data.slice(-10)
          setalarmData(newData.reverse());
        })
        .catch(err => {
            // error 처리
             console.log('Fetch Error', err);
        });
        
      }, []);

    return (
        <Container>
        { alarmData && (
            <FormContainer>
            { alarmData.map((alarm:AlarmD, index:number) => (
                
            <AlertButton
            key={`alarm-${index}`}
            label1 = {_alert(alarm.alertType)}
            label2 = {_time(alarm.timeStamp)}
            />
             ))}
        </FormContainer>
        )}     
      </Container>
    );
};

Alarm.navigationOptions = ({ navigation }: INaviProps ) => {
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
  
export default Alarm;