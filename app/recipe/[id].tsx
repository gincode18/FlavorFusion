import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../../helper/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../../components/loading";
import YouTubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  router,
} from "expo-router";

export default function RecipeDetailScreen(props: any) {
  interface Meal {
    strYoutube: string;
    strInstructions: string;
    strArea: string;
    strMeal: string;
  }
  const [isFavourite, setIsFavourite] = useState(false);

  const [meal, setMeal] = useState<Meal>({
    strYoutube: "",
    strInstructions: "",
    strArea: "",
    strMeal: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useGlobalSearchParams();
  const item = useLocalSearchParams();
  useEffect(() => {
    getMealData(id);
  }, []);

  const getMealData = async (id: string | string[]) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      //   console.log('got meal data: ',response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err as Error);
    }
  };

  const ingredientsIndexes = (meal: { [x: string]: any } | null) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYoutubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return "";
  };

  return (
    <ScrollView
      className=" bg-base-100 flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />
      {/* recipe image */}
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>

      {/* back button */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center mt-20"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full ml-5  bg-secondary"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#661AE6" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          className="p-2 rounded-full mr-5 bg-secondary"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* meal description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-accent"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1  text-secondary"
            >
              {meal?.strArea}
            </Text>
          </Animated.View>

          {/* misc */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around"
          >
            <View className="flex rounded-full bg-secondary p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-accent rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#661AE6" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-accent"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-accent"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-secondary p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-accent rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#661AE6" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-accent"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-accent"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-secondary p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-accent rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#661AE6" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-accent"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-accent"
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-secondary p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-accent rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#661AE6"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-accent"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-accent"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-accent"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-secondary rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-accent"
                      >
                        {meal ? ["strMeasure" + i] : ""}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium  text-secondary"
                      >
                        {meal ? ["strIngredient" + i] : ""}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>
          {/* instructions */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-accent"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-accent">
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {/* recipe video */}
          {meal?.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-accent"
              >
                Recipe Video
              </Text>
              <View>
                <YouTubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

// import { View, Text } from 'react-native'
// import React from 'react'
// import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'

// const page = () => {
//     const { id} = useGlobalSearchParams();
//     const {idMeal}= useLocalSearchParams()
//   return (
//     <View>
//       <Text>page {id}</Text>
//     </View>
//   )
// }

// export default page
