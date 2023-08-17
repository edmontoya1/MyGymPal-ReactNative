import { View, Text, TextInput } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";

interface ICustomInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  secureTextEntry: boolean;
  field: string;
}

export default function CustomInput({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  field,
}: ICustomInput) {
  return (
    <View>
      <Text style={tw`text-white mb-1`}>{field}</Text>
      <View style={tw`w-65 border-2 justify-center rounded-md h-8 bg-white`}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}
