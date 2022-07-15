import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import { removeFromBasket, selectBasketItems } from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { selectBasketTotal } from "../features/basketSlice";
export default function BasketScreen() {
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  console.log(restaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  if (items.length === 0) return null; //If we have no items we shouldn't show the basket
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  console.log(groupedItemsInBasket);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom: Platform.OS === "android" ? 117 : 0,
      }}
      className="flex-1 bg-gray-100"
    >
      <View>
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="ml-4 absolute left-2"
          >
            <ArrowLeftIcon size={25} color="#00CCBB" />
          </TouchableOpacity>
          <View className="border-gray-200  border-b-2">
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 border-b-2 border-gray-100">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="w-9 h-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, item]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5 m-2 rounded-xl"
            >
              <Text>{item.length} x</Text>
              <Image
                source={{ uri: urlFor(item[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{item[0]?.name}</Text>
              <Text className="text-gray-600">
                {" \u20B9"}
                {item[0]?.price}
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="p-5 bg-white mt-5 space-y-4 absolute w-full bottom-0">
        <View className="flex-row justify-between">
          <Text className="text-gray-400">SubTotal</Text>
          <Text className="text-gray-400">
            {" \u20B9"}
            {basketTotal}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Delivery Fees</Text>
          <Text className="text-gray-400">
            {" \u20B9"}
            50
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-md">Delivery Fees</Text>
          <Text className="font-extrabold">
            {" \u20B9"}
            {basketTotal + 50}
          </Text>
        </View>
        <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4">
          <Text className="font-bold text-xl text-white text-center">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
