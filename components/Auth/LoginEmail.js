import React, { useRef } from 'react'
import {  ImageBackground,AsyncStorage, View,ScrollView, StyleSheet,Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import {Container, Text, Title, Card, CardItem,Content, List, ListItem,Body , Left, Right,Icon} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppLoading from './../AppLoading'
class LoginEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
        }
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('user');
        if(user) {

        }
    }
 
    sendCode = async() => {
        this.setState({ loading: true })
        if (this.state.email != '' && this.state.password != '') {
            const email = this.state.email;
            const password = this.state.password;
            await fetch('http://192.168.1.101:8000/api/auth/loginemail',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({'email' : email, 'password':password})
            }).then(res=>res.json())
            .then((resData) => {
                this.setState({ loading: false })
                let user = {  
                    token: resData.access_token,  
                    nom:resData.nom,
                    prenom:resData.prenom,
                    email: resData.email,  
                    telephone:resData.telephone,
                    carte_id:resData.carte_id,
                    photo:resData.photo,
                    sessionsexpire:resData.expires_in,
                } 
                AsyncStorage.setItem('user',JSON.stringify(user))
                this.props.navigation.navigate("Main");
            })
            .catch((e) => {
                this.setState({ loading: false })
                console.log(e);
                alert("Identifiant incorrect !");
            });
        } else {
            this.setState({ loading: false })
            alert("Identifiant incomplet !");
        }
    };

    onChangeText(input) {
        this.setState({ email: input })
    }
    onChangePassword(input) {
        this.setState({ password: input })
    }
    register=()=>{
        this.props.navigation.navigate('Register');
    }
    login=()=>{
        this.props.navigation.navigate('LoginPage');
    }
    render() {
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ?(
                        <AppLoading titreMessage={'Veuillez patienter ...'} />
                    ):(
                        <ScrollView>
                            <Container style={styles.container}>
                                <Image style={styles.authimage} source={require("./../../assets/images/logo2.png")} />
                                <Card style={styles.card}>
                                    <Text style={styles.title}>
                                        Connectez vous avec votre adresse email
                                    </Text>
                                    <TextInput
                                        onChangeText={(text) => this.onChangeText(text)}
                                        keyboardType="email-address"
                                        placeholder="Email"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                    />
                                    <TextInput
                                        onChangeText={(text) => this.onChangePassword(text)}
                                        secureTextEntry={true}
                                        placeholder="Mot de passe"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                    />
                                    <TouchableOpacity onPress={() => this.sendCode()} style={styles.button}>
                                        <Text style={styles.textButton}>Se connecter</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.login()} >
                                        <Text style={styles.button2}>Connexion par Téléphone</Text>
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

export default LoginEmail;

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
        marginTop: 10,
        marginBottom: 5,
        color: "black",
        fontFamily: "muli",
    },
    input: {
        width: "90%",
        color: "black",
        borderRadius: 10,
        padding: 10,
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
        marginTop:10,
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
        marginTop:15,
        marginBottom:10,
        marginLeft:'10%',
        height:85,
        width:'85%'
    },
    text4:{
        marginBottom:20,
    }
});