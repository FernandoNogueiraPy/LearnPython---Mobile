
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    logo: {
        width: '70%', height: '30%', marginTop: -180
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#000',  // Cor do texto
        placeholderTextColor: '#FFF', // Cor do texto do placeholder
        fontFamily: 'Roboto',  // Fonte personalizada (certifique-se de ter a fonte)
        fontSize: 16,  // Tamanho da fonte
        fontWeight: 'bold',  // Peso da fonte
        backgroundColor: '#F5F5F5', // Cor de fundo
    },
    button: {

        backgroundColor: '#4285F4',
        padding: 10,
        borderRadius: 5,
        width: '80%',

    },
    text_login: {
        fontSize: 20,
        marginBottom: 10,
        marginRight: 250,
        fontWeight: 'semibold',
        fontSize: 25,
        color: '#F8F8FF'
    },
    text_senha: {
        fontSize: 20,
        marginBottom: 10,
        marginRight: 250,
        fontWeight: 'semibold',
        fontSize: 25,
        color: '#F8F8FF'

    }
}); 