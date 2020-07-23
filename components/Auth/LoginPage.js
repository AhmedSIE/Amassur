import React, { useRef } from 'react'
import { View,ScrollView, StyleSheet,Image, TextInput} from 'react-native';
import {Container, Text, Card} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppLoading from './../AppLoading'
class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            loading: false,
        }
    }
 
    sendCode = async() => {
        if (this.state.phone.length >= 9) {
            const tel = this.state.phone;
            this.setState({ loading: true })
            await fetch('http://192.168.1.125:8000/api/auth/login',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({"telephone" : tel})
            }).then(res=>res.json())
            .then((resData) => {
                console.log(resData.otp)
                this.setState({ loading: false })
                let otp = resData.otp;
                let tel = this.state.phone;
                this.props.navigation.navigate("Verify", { verificationOtp: otp, tel:tel });
            })
            .catch((e) => console.log(e));
        } else {
            alert("Numéro invalide");
        }
    };

    onChangeText(input) {
        this.setState({ phone: input })
    }
    register=()=>{
        this.props.navigation.navigate('Register');
    }
    emailConnexion=()=>{
        this.props.navigation.navigate('LoginEmail');
    }
    render() {
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ?(
                        <AppLoading titreMessage={'En cours de traitemenet ...'} />
                    ):(
                        <ScrollView>
                            <Container style={styles.container}>
                                <Image style={styles.authimage} source={require("./../../assets/images/logo2.png")} />
                                <Card style={styles.card}>
                                    <Text style={styles.title}>
                                        Connectez vous avec votre numéro de téléphone
                                    </Text>
                                    <TextInput
                                        onChangeText={(text) => this.onChangeText(text)}
                                        // value={this.state.phone}
                                        keyboardType="phone-pad"

                                        placeholder="Numéro de téléphone"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                    />
                                    <TouchableOpacity onPress={() => this.sendCode()} style={styles.button}>
                                        {/* {this.state.loading ? (
                                            <ActivityIndicator color="#87c965" />
                                        ) : ( */}
                                                <Text style={styles.textButton}>Se connecter</Text>
                                            {/* )} */}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.emailConnexion()}>
                                        <Text style={styles.button2}>Connexion par Email</Text>
                                    </TouchableOpacity>
                                </Card>
                            
                                <TouchableOpacity onPress={()=>this.register()}>
                                    <Text style={styles.textButton2}>Créer un compte</Text>
                                </TouchableOpacity>
                            
                                <Text style={styles.title2}>Copyright @ 2020 par Switch Maker</Text>
                            </Container>

                        </ScrollView>
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
        padding: 30,
  
    },
    card:{
        borderRadius:15,
        alignItems: "center",
        color:'white'

    },
    tit: {
        textAlign: "left",
        marginTop: 10,
        width: "90%",
        fontSize: 25,
        fontWeight:'bold',
        color: "black",
        fontFamily: "muli",
        
    },
    title: {
        textAlign: "center",
        marginTop: 10,
        width: "90%",
        fontSize: 15,
        marginBottom: 20,
        color: "black",
        fontFamily: "muli",
        
    },
    title2: {
        textAlign: "center",
        width: "100%",
        fontSize: 11,
        marginTop: 20,
        marginBottom: 5,
        color: "black",
        fontFamily: "muli",
    },
    input: {
        width: "90%",
        color: "black",
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: "white",
        fontFamily: "muli",
        marginBottom: 20,
        backgroundColor:'#cccccc35',
        
    },
    button: {
        width: 250,
        backgroundColor: "#2E3682",
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        marginBottom:20,
        height:50
    },
    button2: {
        width: 250,
        backgroundColor: "#E01D41",
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        marginBottom:20,
        height:50,
        textAlign:'center'
    },
    textButton: {
        fontFamily: "muli",
        color: "white",
        textAlign: "center",

    },
    textButton2: {
        marginTop:20,
        fontFamily: "muli",
        color: "#2E3682",
        textAlign: "center",

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
        marginBottom:10,
        marginLeft:'10%',
        height:85,
        width:'85%'
    },
    text4:{
        marginBottom:20,
    }
});