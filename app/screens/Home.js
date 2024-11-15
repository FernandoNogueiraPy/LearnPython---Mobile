

import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    setToken(storedToken);
                    console.log('Token recuperado:', storedToken);
                } else {
                    console.log('Nenhum token encontrado');
                }
            } catch (error) {
                console.error('Erro ao recuperar o token:', error);
            }
        };

        fetchToken();
    }, []);

    return (
        <View>
            <Text>Tela Inicial</Text>
            <Button
                title="Ir para o Perfil"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
};

export default HomeScreen;

