import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
} from "../features/basketSlice";
// import { Button } from "react-native-web";
export default function DishRow({ id, name, description, price, image }) {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const addItemToBasket = () =>
    dispatch(addToBasket({ id, name, description, price, image }));
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

//   console.log(items);
  return (
    <TouchableOpacity
      onPress={() => {
        setIsPressed(!isPressed);
      }}
      className={`${!isPressed && "border-b"} mx-1 border-gray-200`}
    >
      <View className="flex-row items-center bg-white space-x-3 pl-1 ">
        <View className="space-y-1 flex-1">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-400">{description}</Text>
          <Text className="ml-1">
            {" \u20B9"}
            <Text className="text-gray-500 mt-2 font-bold">{price}</Text>
          </Text>
        </View>
        <View className="mr-2">
          <Image
            style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
            source={{ uri: urlFor(image).url() }}
            className="w-20 h-20 bg-gray-300 p-4"
          />
        </View>
      </View>
      {isPressed && (
        <View className="bg-white flex-row space-x-2 items-center">
          <TouchableOpacity
            disabled={items.length <= 0}
            onPress={removeItemFromBasket}
          >
            <MinusCircleIcon
              size={40}
              color={items.length > 0 ? "#00CCBB" : "gray"}
            />
          </TouchableOpacity>
          <Text className="text-lg font-bold">
            {items.length && items.length}
          </Text>
          <TouchableOpacity onPress={addItemToBasket}>
            <PlusCircleIcon size={40} color="#00CCBB" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}
