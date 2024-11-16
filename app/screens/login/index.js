import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';  // Importando o AsyncStorage
import styles from './styles';



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
            const player_id = data.player_id;

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userId', player_id);

            navigation.navigate('Home');


        } catch (error) {
            setError(error.message);
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./images/image.png')} style={styles.background} resizeMode="cover">
                <Image source={require('./images/logo.png')} style={styles.logo} resizeMode="contain" />

                <Text style={styles.text_login}>Login</Text>

                {isLoading && <Text>Loading...</Text>}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço de E-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#D3D3D3"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholderTextColor="#D3D3D3"
                    />
                </View>

                {error && <Text style={styles.error}>{error}</Text>}

                <View style={styles.rememberContainer}>

                    <TouchableOpacity onPress={() => navigation.navigate('PasswordRecovery')}>
                        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.registerPrompt}>
                    Ainda não possui conta? <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>Criar conta</Text>
                </Text>
            </ImageBackground>
        </View>
    );
}


export default LoginScreen;
