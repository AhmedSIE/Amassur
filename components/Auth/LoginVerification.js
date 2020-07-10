import React from 'react';
import { ImageBackground,Text, View, StyleSheet, Image, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppLoading } from './../AppLoading';


class LoginVerification extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            code: "",
            phone:'',
            loading: false,
        }

        this.verificationOtp = props.route.params.verificationOtp; 
    }

/*recuperation automatique de SMS*/
    getHash = () =>
        RNOtpVerify.getHash()
        .then(console.log)
        .catch(console.log);

    startListeningForOtp = () =>
        RNOtpVerify.getOtp()
        .then(p => RNOtpVerify.addListener(this.otpHandler))
        .catch(p => console.log(p));

    otpHandler = (message) => {
            const otp = /(\d{6})/g.exec(message)[1];
            this.setState({ otp });
            RNOtpVerify.removeListener();
            Keyboard.dismiss();
    }

    componentWillUnmount() {
        RNOtpVerify.removeListener();
    }
/*fin recuperation automatique de SMS*/



    verifyCode = () => {
        // setLoading(true);
        this.setState({loading:true})
        if (this.verificationOtp==this.state.code) {
            this.tel1();
        } else {
            this.props.navigation.navigate('Main');
        }
    };

    tel1 = ()=>{  
        AsyncStorage.getItem('tel1').then(_tel => {
          this.setState({phone:_tel});  
          this.auth();
        });
    } 

    auth = async() => {
      const tel =this.state.phone;
          await fetch('http://192.168.1.112:8000/api/auth/login',{
              method:'POST',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body: JSON.stringify({"tel" : tel})
          }).then(res=>res.json())
          .then(resData=>{
              let user = {  
                  token: resData.access_token,  
                  nom:resData.name,
                  email: resData.email,  
                  tel:resData.tel,
                  sessionsexpire:resData.expires_in,
              } 
              AsyncStorage.setItem('user',JSON.stringify(user))
              this.props.navigation.navigate('Main');
          });
      }
    
    onChangeText(input) {
      this.setState({ code: input })
    }

    render(){
        return(
            <View style={styles.container}>
              {
                this.state.loading ? (
                  <AppLoading />
                ):(
                  <ImageBackground source={require("./../../assets/images/hand-person-woman.jpg")} style={styles.imagebackground}>                      
                        <Text style={styles.title}>Entrer le code reçu par sms</Text>
                        <TextInput
                            placeholder="Code"
                            placeholderTextColor="white"
                            style={styles.input}
                            onChangeText={(text) => this.onChangeText(text)}
                            returnKeyType="done"
                            keyboardType="phone-pad"
                        />
                        <TouchableOpacity onPress={() => this.verifyCode()} style={styles.button}>
                            <Text style={styles.textButton}>Valider</Text>
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
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#87c965",
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
    authimage:{
      marginTop:20,
      width:'12%',
      height:'12%',
    },
  });
  export default LoginVerification;