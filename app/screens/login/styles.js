
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    text_login: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    inputContainer: {
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
    rememberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    checkbox: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    forgotPassword: {
        color: '#1E90FF',
        fontSize: 14,
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
    registerPrompt: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
    },
    registerLink: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
});