import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapScreen from './Map';
import StatsScreen from './Stats';
import ProfileScreen from './Profile';



const Tab = createBottomTabNavigator();


const HomeScreen = ({ navigation }) => (
    <ImageBackground source={require('./images/learn_python.png')} style={styles.background} resizeMode="cover">
        <View style={styles.container}>
            <View style={styles.rectangle}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#007bff', marginTop: 25, marginLeft: 20 }}>
                    Olá,{"\n"}Moltt

                </Text>

            </View>

            <View style={styles.rectangle_principal} >

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 25, marginLeft: 20 }}>
                    Modos de Jogo
                </Text>

                <View style={styles.rectangle_historia}>
                    <View style={styles.lockedBlock}>
                        <Text style={styles.title}>Modo História</Text>
                        <Text style={styles.description}>
                            - O modo História são desafios de perguntas
                            {'\n'}que aumentam progressivamente dificuldade
                            {'\n'}conforme o jogador avançar os mapas.
                        </Text>

                        <Ionicons
                            name="lock-closed-outline"
                            size={30}
                            color="white"
                            style={styles.lockIcon}
                        />
                    </View>
                </View>

                <View style={styles.rectangle_rank}>
                    <Text style={styles.title}>Modo Ranking</Text>
                    <Text style={styles.description}>
                        - O modo ranking são desafios de perguntas
                        {"\n"}que podem variar de grau de dificuldade
                        {"\n"}de 1 a 10

                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Game')}
                        style={styles.buttonJogar}
                    >
                        <Text style={styles.buttonText} >Jogar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ImageBackground >
);



export default function App() {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    // Escolha o ícone com base na rota
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Map') {
                        iconName = focused ? 'map' : 'map-outline';
                    } else if (route.name === 'Stats') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // Retorna o ícone usando Ionicons
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff', // Cor do ícone ativo
                tabBarInactiveTintColor: '#aaa', // Cor do ícone inativo
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    height: 60,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 10 },
                },

            })}
        >

            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity {...props} onPress={() => showBlockedMessage()} />
                    ),
                }}
            />

            <Tab.Screen name="Stats" component={StatsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>

    );
}



const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        marginTop: 40,
        justifyContent: 'flex-start', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        overflow: 'hidden',        // garante que a imagem não saia do container
    },

    rectangle: {
        width: 350, // Largura do retângulo
        height: 100, // Altura do retângulo
        backgroundColor: 'white', // Cor do retângulo
        borderRadius: 10, // Bordas arredondadas (opcional)
    },

    rectangle_historia: {
        backgroundColor: 'gray',
        height: 150,
        width: '90%',
        marginTop: 50,
        marginLeft: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    rectangle_rank: {
        backgroundColor: 'gray',
        height: 150,
        width: '90%',
        marginTop: 50,
        marginLeft: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    rectangle_principal: {
        width: 350,
        height: 520,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 50,
    },

    imagePrincipal: {
        width: '25%',
        height: '25%',
    },
    lockedBlock: {
        backgroundColor: 'gray',
        height: 150,
        width: '90%',
        borderRadius: 10,
        opacity: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    description: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
    },

    lockIcon: {
        position: 'absolute', // Posiciona o ícone sobre o bloco
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonJogar: {
        backgroundColor: '#00CED1', // Cor de fundo do botão
        borderRadius: 5,            // Bordas arredondadas
        paddingVertical: 10,         // Padding em cima e embaixo
        paddingHorizontal: 20,       // Padding nas laterais
        shadowColor: '#000',         // Cor da sombra
        shadowOffset: { width: 0, height: 2 },  // Deslocamento da sombra
        shadowOpacity: 0.25,         // Opacidade da sombra
        shadowRadius: 3.5,           // Raio da sombra
        elevation: 5,                // Elevação para dispositivos Android
    },
    buttonText: {
        color: 'white',  // Cor do texto do botão
        fontSize: 16,    // Tamanho da fonte
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

