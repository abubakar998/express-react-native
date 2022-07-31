import React, {useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from "./src/screens/home";
import SignIn from "./src/screens/signIn";
import SignUp from "./src/screens/signUp";
import Axios from 'axios';
import Cookies from 'js-cookie'


export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const accessToken = Cookies.get('accessToken')
  
  const API_CALL_ASYNC_AWAIT = async () => {
    try {
      const response = await fetch('http://192.168.40.15:5000/users');
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    API_CALL_ASYNC_AWAIT();
    console.log("######## Bakar")
  }, []);



  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home}  options={{ tabBarLabel: 'Home!' }}/>
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="SignUp" component={SignUp} />
        {/* <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Home" component={HomeScreen} /> */}

      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
