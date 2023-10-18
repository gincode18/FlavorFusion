import { Drawer } from 'expo-router/drawer';
import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';

export default function Layout() {
  return <Stack>
    <Stack.Screen name='index' options={{
      headerTransparent: true,
      title:""
    }} ></Stack.Screen>
  </Stack>
}
