import React from 'react';
import Styled from 'styled-components/native';

const StyleButton = Styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  border-color: #e8eaed;
  justify-content: center;
  flexDirection: row
  margin-left : 30px;
  margin-top : 5px;
`;
const Label = Styled.Text`
  color: #000000;
  font-size : 15px;
`;

const Time = Styled.Text`
color: #C0C0C0;
font-size : 10px;
margin-top : 3px;
`;

const Content = Styled.View`
flex: 2
margin-left : 10px;
`;

const Icon = Styled.Image`
`;

interface Props {
  label1: string;
  label2: string;
  style?: Object;
  onPress?: () => void;
}


const AlertButton = ({label1, label2,style, onPress}: Props) => {

  return (
    <StyleButton style={style} onPress={onPress}>
    <Icon source={require('~/Assets/Images/search.png')} />
    <Content>
    <Label>{label1}</Label>
    <Time>{label2}</Time>
    </Content>
    </StyleButton>
  );
};


export default AlertButton;