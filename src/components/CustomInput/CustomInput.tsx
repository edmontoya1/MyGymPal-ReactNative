import { View, Text, TextInput } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";

interface ICustomInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  secureTextEntry: boolean;
}

export default function CustomInput({
  value,
  setValue,
  placeholder,
  secureTextEntry,
}: ICustomInput) {
  return (
    <View style={tw`w-full border-2 rounded-md h-8`}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
