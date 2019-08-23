import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableHighlight,
    Picker,
    Platform
} from 'react-native';
//import { CheckBox } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import * as Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Modal from "react-native-modal";

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            RecoverEmail: '',
        }
    }
    changeRecoverEmailInput(RecoverEmail) {
        this.setState({ RecoverEmail })
    }
    sendRecoverEmail(){
        alert('Debería enviar un mail')
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Recuperar contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder=" Usuario o Correo electrónico"
                    value={this.state.RecoverEmail}
                    onChangeText={(RecoverEmail) => this.changeRecoverEmailInput(RecoverEmail)}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.sendRecoverEmail()}
                >
                    <Text style={styles.textButton}>Enviar mail de recuperación</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CDCDCD',
        marginTop: 5,
        paddingLeft: 15,
        paddingRight: 15
    },
    containerModal: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 175,
        marginBottom: 175,
        paddingLeft: 15,
        paddingRight: 15
    },
    direc: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 15
    },
    ciudad: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 15
    },
    pais: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 15
    },
    containerButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'left',
        fontSize: 15,
        marginTop: 15,
        marginLeft: 30,
        marginBottom: 15
    },
    button: {
        backgroundColor: '#787FF6',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#787FF6',
        height: 50,
        marginTop: 7,
        padding: 15,
        marginBottom: 7,
    },
    modalText: {
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20,
    },
    button2: {
        backgroundColor: 'blue',
        paddingTop: 5,
        paddingBottom: 5
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 50,
        borderColor: '#CDCDCD',
        backgroundColor: '#787FF6',
        borderRadius: 30,
        marginBottom: 15,
        borderWidth: 2
    },
    textArea: {
        height: 60
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%"
    },
    button2: {
        backgroundColor: 'blue',
        paddingTop: 5,
        paddingBottom: 5,
    },
    button3: {
        backgroundColor: 'grey',
        paddingTop: 5,
        paddingBottom: 5,
        width: '50%',
        height: 30
    },
    button4: {
        backgroundColor: 'green',
        paddingTop: 5,
        paddingBottom: 5,
        width: '50%',
        height: 30
    },
    checkbox: {
        backgroundColor: '#CDCDCD',
        height: 35,
    },
});