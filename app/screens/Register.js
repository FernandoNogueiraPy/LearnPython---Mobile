import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importando o AsyncStorage


export default function RegisterScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://service-learn-python-main-910287767384.southamerica-east1.run.app/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    username: username,
                    password: password,
                    email: email,
                    full_name: fullName

                })
            });

            if (!response.ok) {
                throw new Error('Não foi possível criar a conta');
            }

            const data = await response.json();
            const token = data.access_token;
            await AsyncStorage.setItem('userToken', token);
            navigation.navigate('Home');


        } catch (error) {
            setError(error.message);
            console.error(' failed:', error);
        } finally {
            setIsLoading(false);


        };
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./images/image.png')} style={styles.background} resizeMode="cover">
                <Text style={styles.text_signup}>Criar Conta</Text>


                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome de Usuário</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome de Usuário"
                        value={fullName}
                        onChangeText={setFullName}
                        autoCapitalize="none"
                        placeholderTextColor="#D3D3D3"
                    />
                </View>

                <View style={styles.inputNickNameContainer}>
                    <Text style={styles.label}>Apelido de Jogo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="NickName"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        placeholderTextColor="#D3D3D3"
                    />
                </View>

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

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirmar senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={true}
                        placeholderTextColor="#D3D3D3"
                    />
                </View>

                {error && <Text style={styles.error}>{error}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Criar</Text>
                </TouchableOpacity>

                <Text style={styles.loginPrompt}>
                    Já possui uma conta? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Login</Text>
                </Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text_signup: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    inputNickNameContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#00CED1',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginPrompt: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
    },
    loginLink: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
});
