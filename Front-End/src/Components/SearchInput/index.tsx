import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  width: 80%;
  height: 40px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 10px;
  border: 1px;
  border-color: #e8eaed;
  background-color: #ffffff;
`;
const InputField = Styled.TextInput`
  flex: 1;
  color: #000000;
`;

interface Props {
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  style?: Object;
  clearMode?: boolean;
  onChangeText?: (text: string) => void;
}

const SearchInput = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
  clearMode,
  onChangeText,
}: Props) => {
  return (
    <Container style={style}>
      <InputField
        selectionColor="#000000"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        placeholderTextColor="#000000"
        placeholder={placeholder}
        clearButtonMode={clearMode ? 'while-editing' : 'never'}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default SearchInput;