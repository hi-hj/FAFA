import React from 'react';
import Styled from 'styled-components/native';

const StyleButton = Styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  border-color: #e8eaed;
  flexDirection: row
  margin-left : 30px;
  margin-top : 5px;
`;
const Label = Styled.Text`
  color: #000000;
  font-size : 15px;
`;

const Time = Styled.Text`
color: #b3b0ad;
font-size : 10px;
margin-top : 3px;
`;

const Content = Styled.View`
margin-left : 10px;
background-color: #ffecba;
height: 35px;
width: 180px;
justifyContent: center;
border-radius : 10px;
padding-left : 10px;
`;

const TimeView = Styled.View`
justifyContent: flex-end;
margin-bottom: 26px;
margin-left: 4px;
`;



const Icon = Styled.Image`
`;

interface Props {
  type: number;
  label1: string;
  label2: string;
  style?: Object;
  onPress?: () => void;
}


const AlertButton = ({type,label1, label2,style, onPress}: Props) => {

  return (
    <StyleButton style={style} onPress={onPress}>
    <Icon source={(type==1)?require('~/Assets/Images/comehome.png'):require('~/Assets/Images/search.png')} />
    <Content><Label>{label1}</Label></Content> 
    <TimeView><Time>{label2}</Time></TimeView>
    </StyleButton>
  );
};


export default AlertButton;