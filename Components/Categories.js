import { ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { urlFor } from "../sanity";
import sanityClient from "../sanity";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await sanityClient.fetch(`*[_type=="category"]`);
      setCategories(data);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories &&
        categories.map((c) => {
          return (
            <CategoryCard
              key={c._id}
              imgURL={urlFor(c.image).url()}
              title={c.name}
            />
          );
        })}
      {/* <CategoryCard
        imgURL="https://reactnative.dev/img/tiny_logo.png"
        title="Testing"
      />
      <CategoryCard imgURL="http://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgURL="http://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgURL="http://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgURL="http://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgURL="http://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgURL="http://links.papareact.com/gn7" title="Testing" /> */}

      {/* <Text>Categories Changed</Text> */}
    </ScrollView>
  );
}
