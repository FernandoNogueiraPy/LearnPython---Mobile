import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importando o AsyncStorage
import style from './style';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://service-learn-python-main-910287767384.southamerica-east1.run.app/auth', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username_or_email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Senha ou email inválidos');
            }

            const data = await response.json();
            const token = data.access_token;
            await AsyncStorage.setItem('userToken', token);
            navigation.navigate('Home');


        } catch (error) {
            setError(error.message);
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={style.container}>
            <ImageBackground source={require('./images/image.png')} style={style.background} resizeMode="cover" />
            <Image source={require('./images/logo.png')} style={style.logo} resizeMode="contain" />

            <Text style={style.text_login}>Login</Text>

            {isLoading && <Text>Loading...</Text>}

            <TextInput
                style={style.input}
                placeholder="Email ou nickname"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={style.text_senha}>Senha</Text>
            <TextInput
                style={style.input}
                placeholder="Senha de acesso"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <Button style={style.button} title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
