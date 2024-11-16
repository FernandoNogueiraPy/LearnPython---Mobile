import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const requestQuestion = async (navigation, setQuestionData, setIsLoading, setError) => {
    setIsLoading(true);
    setError(null);

    try {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token);

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('https://service-learn-python-main-910287767384.southamerica-east1.run.app/random_challenge', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar desafio');
        }

        const data = await response.json();
        setQuestionData(data);

    } catch (error) {
        setError(error.message);
        console.error('Falha:', error);
    } finally {
        setIsLoading(false);
    }
};

const responseQuestion = async (id_question, response_user_selected, setIsLoading, setError, setReward) => {
    setIsLoading(true);
    setError(null);

    try {
        const token = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        if (!userId) {
            throw new Error('ID do jogador não encontrado. Verifique o login.');
        }

        const params = new URLSearchParams({ history: false });

        const response = await fetch(
            `https://service-learn-python-main-910287767384.southamerica-east1.run.app/response_challenge?${params.toString()}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    id_challenge: id_question,
                    id_player: userId,
                    response_user: response_user_selected,
                }),
            }
        );

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(
                `Erro ao enviar resposta: ${errorMessage || 'Status de resposta não OK.'}`
            );
        }

        const data = await response.json();
        setReward(data.reward); // Define a recompensa
        console.log('Resposta recebida:', data);

    } catch (error) {
        setError(error.message);
        console.error('Erro na requisição:', error);
    } finally {
        setIsLoading(false);
    }
};

const formatText = (text) => {
    if (!text) return '';
    let formattedText = text.trim();
    formattedText = formattedText.replace(/\n+/g, '\n').replace(/\s{2,}/g, ' ');
    return formattedText;
};

const GameScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [questionData, setQuestionData] = useState(null);
    const [reward, setReward] = useState(null);

    useEffect(() => {
        requestQuestion(navigation, setQuestionData, setIsLoading, setError);
    }, []);

    const handleAnswer = async (selectedOption) => {
        setIsLoading(true);
        try {
            await responseQuestion(
                questionData.id,
                selectedOption,
                setIsLoading,
                setError,
                setReward
            );
        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>{'<'} Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.mapName}>{questionData?.mapa || 'Carregando...'}</Text>
                <TouchableOpacity onPress={handleBackToHome}>
                    <Text style={styles.exitButton}>Sair</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#333" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : reward ? (
                <View
                    style={[
                        styles.rewardContainer,
                        reward.complete_challenge ? styles.successContainer : styles.rewardContainerError,
                    ]}
                >
                    <Text
                        style={[
                            styles.icon,
                            reward.complete_challenge ? styles.successIcon : styles.iconError,
                        ]}
                    >
                        {reward.complete_challenge ? '🎉' : '❌'}
                    </Text>
                    <Text
                        style={[
                            styles.rewardTitle,
                            reward.complete_challenge ? styles.successText : styles.errorText,
                        ]}
                    >
                        {reward.complete_challenge ? 'Parabéns, você acertou!' : 'Que pena, você errou!'}
                    </Text>
                    <View style={styles.divider}></View>
                    <Text style={styles.rewardText}>
                        <Text style={[reward.complete_challenge ? styles.highlightedText : styles.highlightedTextError]
                        }>Recompensa: </Text>
                        {reward.name_reward}
                    </Text>
                    <Text style={styles.rewardText}>
                        <Text style={[reward.complete_challenge ? styles.highlightedText : styles.highlightedTextError]
                        }>Descrição: </Text>
                        {reward.description}
                    </Text>
                    <Text style={styles.rewardText}>
                        <Text style={[reward.complete_challenge ? styles.highlightedText : styles.highlightedTextError]
                        }>Pontos: </Text>
                        {reward.points}
                    </Text>
                    <Text style={styles.rewardText}>
                        <Text style={[reward.complete_challenge ? styles.highlightedText : styles.highlightedTextError]
                        }>Experiência: </Text>
                        {reward.exp}
                    </Text>
                </View>
            ) : (
                <>
                    <View style={styles.mapInfo}>
                        <Text style={styles.mapInfoText}>{questionData?.name}</Text>
                    </View>

                    <ScrollView contentContainerStyle={styles.questionContainer}>
                        <Text style={styles.context}>{formatText(questionData?.explication)}</Text>
                        <Text style={styles.question}>{questionData?.description}</Text>
                    </ScrollView>

                    <View style={styles.optionsContainer}>
                        {questionData?.options?.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={() => handleAnswer(option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};


export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f0fa', // Azul claro como fundo da tela
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    backButton: {
        fontSize: 16,
        color: '#1f4e79', // Azul escuro para o botão "Voltar"
    },
    mapName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1c1c1e', // Preto para o nome do mapa
        textAlign: 'center',
        flex: 1,
    },
    exitButton: {
        fontSize: 16,
        color: '#d9534f', // Vermelho para o botão "Sair"
    },
    mapInfo: {
        backgroundColor: '#d0e6fa', // Azul claro para a área de informações do mapa
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    mapInfoText: {
        fontSize: 16,
        color: '#1f4e79', // Azul escuro para o texto das informações do mapa
    },
    questionContainer: {
        flexGrow: 1,
        backgroundColor: '#ffffff', // Branco para o fundo do contêiner de perguntas
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    context: {
        fontSize: 16,
        lineHeight: 24,
        color: '#3a506b', // Azul mais suave para o texto do contexto
        marginBottom: 16,
        textAlign: 'justify',
    },
    question: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: 'bold',
        color: '#1c1c1e', // Preto para o texto da pergunta
        textAlign: 'center',
        marginBottom: 24,
    },
    optionsContainer: {
        marginBottom: 16,
    },
    optionButton: {
        backgroundColor: '#5b92e5', // Azul médio para o botão de opção
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#ffffff', // Branco para o texto das opções
    },
    errorText: {
        color: '#d9534f', // Vermelho para mensagens de erro
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },

    rewardContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e6f7f2', // Fundo suave verde claro
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#28a745', // Verde para borda de destaque
        marginVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    rewardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1b5e20', // Verde escuro para título
        marginBottom: 12,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    rewardText: {
        fontSize: 18,
        color: '#4a4a4a', // Cinza para texto geral
        marginBottom: 8,
        textAlign: 'center',
        lineHeight: 24,
    },
    highlightedText: {
        fontWeight: 'bold',
        color: 'green', // Verde para números ou textos importantes
    },
    highlightedTextError: {
        fontWeight: 'bold',
        color: 'red', // Verde para números ou textos importantes
    },
    divider: {
        height: 1,
        width: '80%',
        backgroundColor: '#d0e0d8',
        marginVertical: 8,
    },
    icon: {
        fontSize: 36,
        color: '#28a745',
        marginBottom: 12,
    },
    rewardContainerError: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8d7da', // Fundo suave vermelho claro
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#dc3545', // Vermelho para borda de erro
        marginVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    rewardTitleError: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#dc3545', // Vermelho para título de erro
        marginBottom: 12,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    rewardTextError: {
        fontSize: 18,
        color: '#4a4a4a', // Cinza para o texto geral
        marginBottom: 8,
        textAlign: 'center',
        lineHeight: 24,
    },
    highlightedTextError: {
        fontWeight: 'bold',
        color: '#dc3545', // Vermelho para números ou textos importantes
    },
    dividerError: {
        height: 1,
        width: '80%',
        backgroundColor: '#f5c6cb', // Cor de fundo mais suave para erro
        marginVertical: 8,
    },
    iconError: {
        fontSize: 36,
        color: '#dc3545', // Ícone vermelho para erro
        marginBottom: 12,
    },

});


