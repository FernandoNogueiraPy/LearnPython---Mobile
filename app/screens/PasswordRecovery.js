import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importando o AsyncStorage

export default function PasswordRecoveryScreen({ navigation }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeText = (text, index) => {
        const updatedCode = code.split(''); // Transforma o código atual em um array
        updatedCode[index] = text; // Substitui o caractere na posição correta
        setCode(updatedCode.join('')); // Atualiza o estado com o código atualizado
    };


    const handleSendEmail = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                email: email
            });

            const response = await fetch(`https://service-learn-python-main-910287767384.southamerica-east1.run.app/request-password-reset?${params.toString()}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao enviar código de verificação');
            }

            setStep(2);

        } catch (error) {
            setError(error.message);
            console.error('Falha ao enviar código de verificação');
        } finally {
            setIsLoading(false);
        };
    };

    const handleVerifyCode = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                email: email,
                code: code
            });

            const response = await fetch(`https://service-learn-python-main-910287767384.southamerica-east1.run.app/verify-code?${params.toString()}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Falha na verificação do código');
            }

            setStep(3);

        } catch (error) {
            setError(error.message);
            console.error('Falha na verificação do código');
        } finally {
            setIsLoading(false);
        };

    };

    const handleResetPassword = async () => {
        try {
            const params = new URLSearchParams({
                email: email,
                new_password: newPassword
            });

            const response = await fetch(`https://service-learn-python-main-910287767384.southamerica-east1.run.app/change_password?${params.toString()}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log(response);

            if (!response.ok) {
                throw new Error('Falha ao salvar nova senha');
            }

            navigation.navigate('Login');

        } catch (error) {
            setError(error.message);
            console.error('Falha ao salvar nova senha');
        } finally {
            setIsLoading(false);
        };


    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./images/image.png')} style={styles.background} resizeMode="cover">

                {/* Step 1: Solicitar o e-mail */}
                {step === 1 && (
                    <>
                        <Text style={styles.title}>Restaurar Senha</Text>
                        <Text style={styles.subtitle}>Insira o e-mail onde serão enviadas as instruções</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Endereço de E-mail"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#D3D3D3"
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                    </>
                )}

                {/* Step 2: Inserir o código de verificação */}
                {step === 2 && (
                    <>
                        <Text style={styles.title}>Verifique seu e-mail</Text>
                        <Text style={styles.subtitle}>Insira o código de 6 dígitos enviado ao seu e-mail</Text>

                        {/* Aviso sobre o tempo de chegada do código */}
                        <Text style={styles.infoText}>O código pode levar até 1 minuto para chegar.</Text>

                        <View style={styles.codeContainer}>
                            {[...Array(6)].map((_, index) => (
                                <TextInput
                                    key={index}
                                    style={styles.codeInput}
                                    maxLength={1}
                                    keyboardType="default"
                                    onChangeText={(text) => handleChangeText(text, index)} // Atualiza o código com o valor correto
                                    value={code[index] || ''} // Exibe o valor digitado
                                />
                            ))}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
                            <Text style={styles.buttonText}>Enviar Código</Text>
                        </TouchableOpacity>
                    </>
                )}

                {/* Step 3: Redefinir senha */}
                {step === 3 && (
                    <>
                        <Text style={styles.title}>Nova Senha</Text>
                        <Text style={styles.subtitle}>Digite sua nova senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nova senha"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}
                            placeholderTextColor="#D3D3D3"
                        />
                        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    </>
                )}

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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '100%',
        marginBottom: 20,
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
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
    codeInput: {
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
        width: 50,
    },
    infoText: {
        color: '#FFFFFF',
        fontSize: 15,
        marginTop: 5,
        textAlign: 'center',
        marginBottom: 20,
    },

});
