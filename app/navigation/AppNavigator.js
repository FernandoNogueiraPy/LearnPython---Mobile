import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import LoginScreen from '../screens/login';
import SplashScreen from '../screens/splash';
import { StatusBar } from 'react-native';

const MainStack = createStackNavigator();

const AppNavigator = () => {
    const [loadingSplash, setLoadingSplash] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            setTimeout(async () => {
                setLoadingSplash(false);
            }, 2000);
        };

        checkAuthStatus();
    }, []);

    if (loadingSplash) {
        return <SplashScreen />;
    }

    const StackScreen = () => (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen name="Home" component={HomeScreen} />
        </MainStack.Navigator>
    );

    return (
        <NavigationContainer>
            <StatusBar hidden={true} />
            <StackScreen />
        </NavigationContainer>
    );
};

export default AppNavigator;
