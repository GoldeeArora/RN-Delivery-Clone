// Learn react native navigation
// useNavigation is the hook used by react native navigation
import {
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import sanityClient from "../sanity";
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  UserIcon,
  SearchIcon,
} from "react-native-heroicons/outline";
import Categories from "../Components/Categories";
import FeaturedRow from "../Components/FeaturedRow";
// import { ScrollView } from "react-native-web";
export default function HomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  // whenever screen reloads or any dependecies provided inside of the 2nd array parameter changes it fires off.
  // -------------------------------------------------------->learn the difference b/w useEffect and useLayoutEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  //-->SafeAreaView works for ios apps not for android apps so to work on safearea(below the status bar we use padding with the help of statusbar system values)
  // useEffect=> it runs when the functional component loads
  useEffect(() => {
    const fetchData = async () => {
      const data = await sanityClient.fetch(
        `*[_type=="featured"]
  {
    ...,
    restaurant[]->{
      ...,
      dishes[]->
    }
  }`
      );
      setFeaturedCategories(data);
    };
    fetchData().catch(console.error);
  }, []);
  // console.log(featuredCategories);
  // console.log(featuredCategories[0].name);
  // console.log(featuredCategories ? featuredCategories[0].name : "Hello");
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom: Platform.OS === "android" ? 117 : 0,
      }}
    >
      <View className="flex-row pb-3 items-stretch mx-4 space-x-4">
        <Image
          source={{ uri: "http://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full mt-2"
        />
        <View className="flex-1 ">
          <Text className="font-bold text-xs text-gray-400">Deliver Now!</Text>

          <View className="flex-row ">
            <View>
              <Text className="font-bold text-xl">Current Location</Text>
            </View>
            <View className="mt-2">
              <ChevronDownIcon size={20} color="#00CCBB" />
            </View>
          </View>
        </View>
        <View className="mt-2">
          <UserIcon size={35} color="#00CCBB" />
        </View>
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-2">
          <SearchIcon color="grey" />
          <TextInput
            placeholder="Restaurant and Cousins"
            keyboardType="default"
          />
        </View>
        <View className="mt-1">
          <AdjustmentsIcon size={35} color="#00CCBB" />
        </View>
      </View>

      {/* Body */}
      <ScrollView>
        <Categories />
        {featuredCategories.length > 0 &&
          featuredCategories.map((c) => {
            return (
              <FeaturedRow
                key={c._id}
                id={c._id}
                title={c.name}
                description={c.short_description}
              />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}
