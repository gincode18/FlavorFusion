import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

const router=useRouter()
    useEffect(()=>{
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 100);
        setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5.5)), 300);

        setTimeout(():void=> router.replace('/home'), 2500)
    },[])
  return (
    <View className="flex-1 justify-center items-center space-y-10  bg-primary">
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View className=" bg-secondary rounded-full" style={{padding: ring2padding}}>
        <Animated.View className="  bg-accent rounded-full" style={{padding: ring1padding}}>
            <Image source={require('../assets/images/welcome.png')}
                style={{width: hp(20), height: hp(20)}} />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <Text style={{fontSize: hp(7)}} className="font-bold text-white  tracking-widest">
            Foody
        </Text>
        <Text style={{fontSize: hp(2)}} className="font-medium text-white tracking-widest">
            Food is always right
        </Text>
      </View>
    </View>
  )
}