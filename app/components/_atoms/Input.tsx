import React from "react";
import { TextInput } from "react-native";

interface Input_Props {
  style: {};
  autoCorrect: boolean;
  onChangeText: (inputText: string) => void;
  value: string;
  placeHolder: string;
}

const Input = ({
  style,
  autoCorrect,
  onChangeText,
  value,
  placeHolder,
}: Input_Props) => {
  return (
    <TextInput
      style={style}
      autoCorrect={autoCorrect}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeHolder}
    />
  );
};

export default Input;
