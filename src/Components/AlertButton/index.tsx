import React from 'react';
import Styled from 'styled-components/native';

const StyleButton = Styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  border: 1px;
  border-color: #e8eaed;
`;
const Label = Styled.Text`
  color: #000000;
  font-size : 18px;
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
    <Label>{label1}</Label>
    <Label>{label2}</Label>
    </StyleButton>
  );
};


export default AlertButton;