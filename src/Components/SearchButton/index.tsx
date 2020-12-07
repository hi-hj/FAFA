import React from 'react';
import Styled from 'styled-components/native';

const StyleButton = Styled.TouchableOpacity`
  width: 23%;
  height: 40px;
  border-radius: 10px;
  border : 1px;
  justify-content: center;
  align-items: center;
  margin : 5px;
  background-color: #FFFFFF;
`;
const Label = Styled.Text`
  color: #000000;
`;

interface Props {
  label: string;
  style?: Object;
  onPress?: () => void;
}

const SearchButton = ({label, style, onPress}: Props) => {
  return (
    <StyleButton style={style} onPress={onPress}>
      <Label>{label}</Label>
    </StyleButton>
  );
};

export default SearchButton;