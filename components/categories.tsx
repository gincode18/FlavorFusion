import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {categoryData} from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helper/image';

export default function Categories({categories, activeCategory, handleChangeCategory}:any) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            categories.map((cat:any, index:any)=>{
                let isActive = cat.strCategory==activeCategory;
                let activeButtonClass = isActive? 'bg-primary': ' bg-accent';
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={()=> handleChangeCategory(cat.strCategory)}
                        className="flex items-center space-y-1"
                    >
                        <View className={"rounded-full p-[6px] "+activeButtonClass}>
                            <CachedImage
                                uri={cat.strCategoryThumb}
                                style={{width: hp(6), height: hp(6)}}
                                className="rounded-full"
                            />
                        </View>
                        <Text className={isActive?" text-primary font-extrabold":" text-secondary"} style={{fontSize: hp(1.6)}}>
                            {cat.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </Animated.View>
  )
}
