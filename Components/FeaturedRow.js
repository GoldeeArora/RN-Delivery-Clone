import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";
export default function FeaturedRow({ id, title, description }) {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await sanityClient.fetch(
        `*[_type=="featured" && _id== $id]
        {
          ...,
          restaurant[]->{
            ...,
            dishes[]->,
      
            type->{name}
          },
        }[0]`,
        { id }
      );
      setRestaurants(data?.restaurant);
    };
    fetchData().catch(console.error);
  }, [id]);
  // console.log(restaurants[]);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants &&
          restaurants.map((c) => (
            <RestaurantCard
              key={c._id}
              id={c._id}
              imgURL={c.image}
              title={c.name}
              rating={c.rating}
              genre={c.type?.name}
              address={c.address}
              short_description={c.short_description}
              dishes={c.dishes}
              long={c.long}
              lat={c.long}
            />
          ))}
      </ScrollView>
    </View>
  );
}
