import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import Animated from 'react-native-reanimated';

//@ts-ignore
export const CachedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null);
    const { uri } = props;
  
    useEffect(() => {
      const getCachedImage = async () => {
        try {
          const cachedImageData = await AsyncStorage.getItem(uri);
          if (cachedImageData) {
            //@ts-ignore
            setCachedSource({ uri:cachedImageData });
          } else {
            const response = await fetch(uri);
            const imageBlob = await response.blob();
            const base64Data:any = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(imageBlob);
              reader.onloadend = () => {
                resolve(reader.result);
              };
            });
            await AsyncStorage.setItem(uri, base64Data);
            //@ts-ignore
            setCachedSource({ uri: base64Data });
          }
        } catch (error) {
          console.error('Error caching image:', error);
          //@ts-ignore
          setCachedSource({uri});
        }
      };
  
      getCachedImage();
    }, []);
  
    return <Animated.Image source={cachedSource} {...props} className=" rounded-full" />;
  };