const showBlockedMessage = ({ navigation }) => {
    Alert.alert(
        'Mapa',
        'A vizualização está em desenvolvimento e ficara disponível em breve',
        [{ text: 'OK' }]
    );
};

const MapScreen = () => (


    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Map Screen</Text>
    </View>
);

export { showBlockedMessage };
export default MapScreen;