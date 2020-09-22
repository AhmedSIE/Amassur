import React, { useRef } from 'react'
import { AsyncStorage, View,ScrollView, StyleSheet,Image, TextInput } from 'react-native';
import {Container, Text, Card,} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppLoading from './../AppLoading'
class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            password: '',
            confirm:'',
            loading: false,
        }
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('user');
    }
 
    sendCode = async() => {
        this.setState({ loading: true })
        if (this.state.nom !='' && this.state.prenom !='' && this.state.email !='' && 
            this.state.telephone !='' && this.state.password !='') {
            if (this.state.password == this.state.confirm) {
                await fetch('http://192.168.1.123:8000/api/auth/register',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        "nom" : this.state.nom,
                        "prenom" : this.state.prenom,
                        "telephone" : this.state.telephone,
                        "email" : this.state.email,
                        "password" : this.state.password,
                    })
                }).then(res=>res.json())
                .then((resData) => {
                    console.log('Ok1')
                    console.log(resData.nom)
                    this.setState({ loading: false })
                    let user ={
                        nom:resData.nom,
                        prenom:resData.prenom,
                        telephone:resData.telephone,
                        email:resData.email,
                        photo:resData.photo,
                        token:resData.access_token,
                    }  
                    AsyncStorage.setItem('user',JSON.stringify(user));
                    this.props.navigation.navigate("Main");
                })
                .catch((e) =>{
                    this.setState({ loading: false })
                    console.log(e)
                    console.log('Ok2')
                });
            } else {
                this.setState({ loading: false })
                alert("Erreur de mot de passe");
            }    
        } else {
            this.setState({ loading: false })
            alert("Tous les champs sont obligatoires");
        }
    };
    
    onChangeNom(input) {
        this.setState({ nom: input })
    }
    onChangePrenom(input) {
        this.setState({ prenom: input })
    }
    onChangeEmail(input) {
        this.setState({ email: input })
    }
    onChangeTel(input) {
        this.setState({ telephone: input })
    }
    onChangePass(input) {
        this.setState({ password: input })
    }
    onChangeConfirm(input) {
        this.setState({ confirm: input })
    }
    connexion=()=>{
        this.props.navigation.navigate('LoginPage');
    }
    render() {
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ?(
                        <AppLoading titreMessage={'Veuillez patienter ...'} />
                    ):(
                        <Container>
                            <Container style={styles.enteim}>
                                <Image style={styles.authimage} source={require("./../../assets/images/logo2.png")} />
                            </Container>
                            <ScrollView style={styles.scrollView}>
                                <Container style={styles.container}>
                                    <Card style={styles.card}>
                                        <Text style={styles.title}>
                                            Renseigner le formulaire
                                        </Text>
                                        <TextInput
                                            onChangeText={(text) => this.onChangeNom(text)}
                                            // value={this.state.phone}
                                            // keyboardType="phone"

                                            placeholder="Nom"
                                            placeholderTextColor="#888"
                                            style={styles.input}
                                            returnKeyType="done"
                                            autoCompleteType="tel"
                                        />
                                        <TextInput
                                            onChangeText={(text) => this.onChangePrenom(text)}
                                            // value={this.state.phone}
                                            keyboardType="phone"

                                            placeholder="Prénom(s)"
                                            placeholderTextColor="#888"
                                            style={styles.input}
                                            returnKeyType="done"
                                            autoCompleteType="tel"
                                        />
                                        <TextInput
                                            onChangeText={(text) => this.onChangeTel(text)}
                                            // value={this.state.phone}
                                            keyboardType="numeric"

                                            placeholder="Téléphone"
                                            placeholderTextColor="#888"
                                            style={styles.input}
                                            returnKeyType="done"
                                            autoCompleteType="tel"
                                        />
                                        <TextInput
                                            onChangeText={text => this.onChangeEmail(text)}
                                            // value={this.state.phone}
                                            // underlineColorAndroid='transparent'
                                            keyboardType="email-address"
                                            placeholder="Email"
                                            placeholderTextColor="#888"
                                            style={styles.input}
                                            returnKeyType="done"
                                            autoCompleteType="tel"
                                        />
                                        <TextInput
                                            onChangeText={(text) => this.onChangePass(text)}
                                            // value={this.state.phone}
                                            
                                            secureTextEntry={true}
                                            placeholder="Mot de passe"
                                            placeholderTextColor="#888"
                                            style={styles.input}
                                            returnKeyType="done"
                                            autoCompleteType="tel"
                                        />
                                        <TextInput
                                            onChangeText={(text) => this.onChangeConfirm(text)}
                                            // value={this.state.phone}
                                            secureTextEntry={true}
                                            placeholder="Confirmation mot de passe"
                                            placeholderTextColor="#888"
                                            style={styles.input}
                                            returnKeyType="done"
                                            autoCompleteType="tel"
                                        />
                                        <TouchableOpacity onPress={() => this.sendCode()} style={styles.button}>
                                            <Text style={styles.textButton}>Inscription</Text>
                                        </TouchableOpacity>
                                    </Card>
                                </Container>
                            </ScrollView>
                            <TouchableOpacity onPress={()=>this.connexion()}>
                                <Text style={styles.textButton2}>Se connecter</Text>
                            </TouchableOpacity>
                        
                            <Text style={styles.title2}>Copyright @ 2020 par Switch Maker</Text>
                        </Container>
                    )
                }
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height:'100%'
  
    },
    scrollView: {
        // height:'100%',
    },
    card:{
        borderRadius:15,
        alignItems: "center",
        color:'white',
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
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom:30,
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
    enteim:{
        alignItems:'center',
        flex:1,
        marginBottom:100
    },
    authimage:{
        marginTop:20,
        marginBottom:40,
        height:65,
        width:'50%'
    },
});

export default RegisterPage;
