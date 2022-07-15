import { TouchableOpacity, Text, Image } from "react-native";
import React from "react";
// import { TouchableOpacity } from "react-native-web";

export default function CategoryCard({ imgURL, title }) {
  return (
    <TouchableOpacity className=" relative mr-2">
      <Image
        source={{ uri: imgURL }}
        // style={{ width: 40, height: 40 }}
        className="h-20 w-20 rounded"
      />
      <Text className="absolute bottom-1 left-1 text-white">{title}</Text>
      {/* <Image source={{ uri: { imgURL } }} /> */}
    </TouchableOpacity>
  );
}
