import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, AsyncStorage } from 'react-native';
import {Container, Card} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppLoading } from './../AppLoading';


class LoginVerification extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            code: "",
            loading: false,
        }
        this.verificationOtp = props.route.params.verificationOtp; 
        this.numeroTel = props.route.params.tel; 
    }

    verifyCode = () => {
        this.setState({loading:true})
        if (this.verificationOtp==this.state.code) {
            this.auth();
            this.setState({loading:false})
            this.props.navigation.navigate('Main');

        } else {
            this.setState({loading:false})
            this.props.navigation.navigate('LoginPage');
        }
    };

    auth = async() => {
        const tel =this.numeroTel;
        // this.setState({loading:true})
        await fetch('http://192.168.1.109:8000/api/auth/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"telephone" : tel})
        }).then(res=>res.json())
        .then((resData)=>{
            // this.setState({loading:false})
            let user = {  
                token: resData.access_token,  
                nom:resData.nom,
                prenom:resData.prenom,
                email: resData.email,  
                telephone:resData.telephone,
                photo:resData.photo,
                sessionsexpire:resData.expires_in,
            } 
            AsyncStorage.setItem('user',JSON.stringify(user))
        });
    }
    
    onChangeText(input) {
      this.setState({ code: input })
    }

    render(){
        return(
            <View style={{flex:1}}>
              {
                this.state.loading ? (
                  <AppLoading />
                ):(
                  <Container style={styles.container}>
                    <Image style={styles.authimage} source={require("./../../assets/images/logo2.png")} />
                            <Card style={styles.card}>
                                <Text style={styles.title}>
                                    Entrer le code reçu par sms
                                </Text>
                                <TextInput
                                    placeholder="Code"
                                    placeholderTextColor="silver"
                                    style={styles.input}
                                    onChangeText={(text) => this.onChangeText(text)}
                                    returnKeyType="done"
                                    keyboardType="phone-pad"
                                />
                                <TouchableOpacity onPress={() => this.verifyCode()} style={styles.button}>
                                    <Text style={styles.textButton}>Valider</Text>
                                </TouchableOpacity>
                            </Card>
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
      padding: 30,

  },
  card:{
      borderRadius:15,
      // paddingLeft:'30%',
      // justifyContent: "center",
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
      fontSize: 17,
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
  authimage:{
      marginTop:20,
      marginBottom:40,
      marginLeft:'10%',
      height:85,
      width:'85%'
  },
});

export default LoginVerification;