import React, { useEffect } from 'react';
import { View, Image, ImageBackground } from 'react-native';

const SplashScreen = () => {
    return (
        <ImageBackground
            source={require('./learn_python.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('./logo.png')}
                    style={{ width: '80%', height: '20%' }} // Ajuste o tamanho conforme necessário
                    resizeMode="contain"
                />
            </View>
        </ImageBackground>
    );
};

export default SplashScreen;


