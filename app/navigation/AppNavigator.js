import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import RegisterScreen from '../screens/Register';
import PasswordRecoveryScreen from '../screens/PasswordRecovery';
import LoginScreen from '../screens/login';
import SplashScreen from '../screens/splash';
import GameScreen from '../screens/Game';
import MapScreen from '../screens/Map';
import StatsScreen from '../screens/Stats';
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

    return (
        <>
            <StatusBar hidden={false} />
            <MainStack.Navigator screenOptions={{ headerShown: false }}>
                <MainStack.Screen name="Login" component={LoginScreen} />
                <MainStack.Screen name="Register" component={RegisterScreen} />
                <MainStack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
                <MainStack.Screen name="Home" component={HomeScreen} />
                <MainStack.Screen name="Game" component={GameScreen} />
                <MainStack.Screen name="Profile" component={ProfileScreen} />
                <MainStack.Screen name="Map" component={MapScreen} />
                <MainStack.Screen name="Stats" component={StatsScreen} />
            </MainStack.Navigator>
        </>
    );
};

export default AppNavigator;
