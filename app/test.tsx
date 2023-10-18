import { View,Text } from "react-native";
import { Link } from "expo-router";
export default function Page() {
  return (
    <View className=" flex flex-row">
      <Link replace href="/" className=" text-red-500 ml-12">
        Test
      </Link>
      <Text>isudgfud</Text>
    </View>
  );
}
