import React, { useRef } from 'react'
import {  ImageBackground,Text, View, StyleSheet, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import {AsyncStorage} from 'react-native';  
import AppLoading from './../AppLoading'
class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            loading: false,
        }
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('user');
        if(user) {

        }
    }
 
    sendCode = async() => {
        if (this.state.phone.length >= 9) {
            const tel = this.state.phone;
            this.setState({ loading: true })
            await fetch('http://192.168.1.112:8000/api/auth/login',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({"tel" : tel})
            }).then(res=>res.json())
            .then((resData) => {
                console.log(resData.otp)
                this.setState({ loading: false })
                let otp = resData.otp;
                let tel1 =  this.state.phone;
                AsyncStorage.setItem('tel1',tel1);
                this.props.navigation.navigate("verify", { verificationOtp: otp });
            })
            .catch((e) => console.log(e));
        } else {
            alert("Numéro invalide");
        }
    };

    onChangeText(input) {
        this.setState({ phone: input })
    }

    render() {
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ?(
                        <AppLoading titreMessage={'En cours de traitemenet ...'} />
                    ):(
                        <ImageBackground source={require("./../../assets/images/woman_black_businesswomanthe_human.jpg")} style={styles.imagebackground}>
                            <Text style={styles.title}>
                                Connectez vous avec votre numéro de téléphone
                            </Text>
                            <TextInput
                                onChangeText={(text) => this.onChangeText(text)}
                                // value={this.state.phone}
                                keyboardType="phone-pad"

                                placeholder="Numéro de téléphone"
                                placeholderTextColor="white"
                                style={styles.input}
                                returnKeyType="done"
                                autoCompleteType="tel"
                            />
                            <TouchableOpacity onPress={() => this.sendCode()} style={styles.button}>
                                {/* {this.state.loading ? (
                                    <ActivityIndicator color="#87c965" />
                                ) : ( */}
                                        <Text style={styles.textButton}>Connexion</Text>
                                    {/* )} */}
                            </TouchableOpacity>
                        
                            <Image style={styles.authimage} source={require("./../../assets/images/logo.png")} />
                            <Text style={styles.title2}>Copyright @ 2020 par Switch Maker</Text>
                            <Text style={styles.title3}>switch-maker.com</Text>
                        </ImageBackground>
                    )
                }
                
            </View>
        )
    }
}

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "silver",
    },
    title: {
        textAlign: "center",
        marginTop: 200,
        width: "60%",
        fontSize: 17,
        marginBottom: 20,
        color: "white",
        fontFamily: "muli",
    },
    title2: {
        textAlign: "center",
        width: "60%",
        fontSize: 13,
        marginTop: 20,
        marginBottom: 5,
        color: "white",
        fontFamily: "muli",
    },
    title3: {
        textAlign: "center",
        width: "60%",
        fontSize: 12,
        marginBottom: 20,
        color: "white",
        fontFamily: "muli",
    },
    input: {
        width: "60%",
        color: "white",
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: "white",
        fontFamily: "muli",
        marginBottom: 20,
    },
    button: {
        width: "50%",
        backgroundColor: "red",
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
    },
    textButton: {
        fontFamily: "muli",
        color: "white",
    },
    imagebackground:{
        width:"100%",
        height:"100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "silver",
        opacity: 0.7,
        backgroundColor: 'black',
    },
    authimage:{
        marginTop:20,
        // width:'12%',
        // height:'12%',
    },
});