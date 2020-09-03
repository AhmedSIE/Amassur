import React, { useState, useCallback, useEffect } from 'react';
import  {StyleSheet, Image,View,Text,TextInput, AsyncStorage, Keyboard,Button } from 'react-native';
import HeaderNavigator from "../../navigation/MonHeader";
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, ScrollView, FlatList } from "react-native-gesture-handler";
import { Right, Left } from 'native-base';
import {LocalNotification} from './../../services/LocalPushController';
import RemotePushController from './../../services/RemotePushController';
import Pusher from 'pusher-js/react-native';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

class Messages extends React.Component{
    constructor(props){
        super(props);
        this.state={
            message:'',
            messages:[],
        }        
        this.pusher=null,
        this.scrollView=null,
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',this._keyboardDidShow.bind(this))
    }
    
    handleButtonPress = () => {
        LocalNotification()
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();

    }
    _keyboardDidShow() {
        this.scrollView.scrollToEnd();
    }
    componentDidMount() {
        this.lesmessages();
        var pusher = new Pusher('1692f1e2f1dc6035844e', {cluster: 'us2'});
        var channel = pusher.subscribe('my-channel');
        this.pusher=channel.bind('my-event', function(data) {return JSON.stringify(data);});
        console.log(this.pusher)
    }

    messages = async() => {
        let messages =  await AsyncStorage.getItem('messages');
        let parsed=   JSON.parse(messages);
        this.setState({messages: parsed}); 
 
    }

    messages2 = async()=> {
        let messages = await AsyncStorage.getItem('messages');
        let parsed=   JSON.parse(messages);
        if (parsed) {
            this.setState({messages: parsed});    
        } else {
           alert("Pas d'accès internet");
        }
    }

    lesmessages = async()=>{
        await fetch('http://192.168.11.62:8000/api/messages/message',{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'token' : this.props.users.token})
        }).then(res=>res.json())
        .then((resData) => {
            let messages = resData;
            AsyncStorage.setItem('messages',JSON.stringify(messages));
            this.messages();
        })
        .catch((e) =>{
            console.log(e);
            this.messages2();
        });
    }

    onSend = async() => {
        if (this.state.message!='') {
            await fetch('http://192.168.11.62:8000/api/messages/message/save',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({'token' : this.props.users.token, 'message': this.state.message})
            }).then(res=>res.json())
            .then((resData) => {
                this.setState({ message: '' });
                let messages = resData;
                AsyncStorage.setItem('messages',JSON.stringify(messages));
                this.messages();
            })
            .catch((e) => {
                this.setState({ loading: false })
                console.log(e);
            });
        }
        // for demo purpose
        // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))
    }

    mesmessages=()=> {
        if (this.state.messages.length>0) {
            return <FlatList
                data={this.state.messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={
                    ({item}) =>
                        
                    <View>             
                    {
                        item.statut =='envoyé' ? (
                            <View style={styles.right}>
                                <Right style={styles.textdroit}>
                                    <Text style={styles.textsms}>{item.texte}</Text>    
                                </Right>
                            </View>
                        ):(
                            <View>
                                <Left style={styles.textgauche}>
                                    <Text style={styles.textsms}>{item.texte}</Text>
                                </Left>
                            </View>
                        )
                    }
                    </View>
                }
            />
           
        }else{
            return (
                <View>
                    <Text style={styles.premierpas}>Ceci est le tout début de votre historique des messages directs avec Amassur !</Text>
                </View>
            )
        }
    }
    
    onChangeMessage(text) {
        this.setState({message:text})
    }

    render(){
        let navigation=this.props.navigation
        return (
            <View style={styles.container}>
                <View  style={styles.head}>
                    <HeaderNavigator navigation={navigation} />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.handleButtonPress()}>
                    <Text style={{color:'white'}}>Notification</Text>
                </TouchableOpacity>
                <ScrollView
                    ref={ (ref) => this.scrollView = ref }
                    onContentSizeChange={ () => {        
                        this.scrollView.scrollToEnd( { animated: false } )
                    }}
                    style={styles.scrollView}>
                    {this.mesmessages()} 
                    <View style={styles.marg}>  
                    </View>  
                </ScrollView>
                <View style={styles.corpsms}>
                    <View>
                        <TouchableOpacity >
                                <FontAwesome name='camera' style={styles.messageicon}/>
                        </TouchableOpacity>  
                    </View>
                    <View>
                        <TextInput
                            onChangeText={(text)=>this.onChangeMessage(text)}
                            keyboardType='default'
                            placeholderTextColor="#888"
                            style={styles.input}
                            returnKeyType="done"
                            autoCompleteType="tel"
                            value={this.state.message}
                        />
                    </View>
                    
                    <View>
                        <TouchableOpacity onPress={()=> this.onSend()}>
                                <FontAwesome name='send' style={styles.messageicon}/>
                        </TouchableOpacity>  
                    </View>
                </View>
                <RemotePushController />
            </View>    
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
   },
   head:{
       height:55
   },
    scrollView: {
        height:'100%',
        paddingBottom:100
    },
   corpsms:{
        flex:1,
        flexDirection:'row',
        position:'absolute',
        bottom:5,
   },
   messageicon:{
       fontSize:20,
       margin:12,
   },
   input:{
       minWidth:250,
       height:40,
       backgroundColor:'#fafafa',
       borderRadius:20,
   },
   right:{
    
   },
   textdroit:{
       backgroundColor:'#b5ebf1',
       marginTop:10,
       padding:15,
       borderRadius:10,
       marginRight:0,
       maxWidth:'73%',
       marginRight:'-20%',
   },
   textgauche:{
       backgroundColor:'#e8e3e3',
       marginTop:10,
       padding:15,
       borderRadius:10,
       marginRight:0,
       maxWidth:'73%',
       marginLeft:'-20%',
   },
   textsms:{
    //    padding:10,
   },
   marg:{
        height:80
    },
    premierpas:{
        padding:15,
        backgroundColor:'#fafafa',
        margin:15,
        borderRadius:10,
        fontSize:12
    },
    buttonContainer: { 
        padding:5,
        backgroundColor:'red',
        textAlign:'center',
        alignContent: 'center',
        alignItems:'center',
    } 
});

const mapStatetoProps=(state) => {
    return {
        users:state.users
    }
}
export default connect(mapStatetoProps)(Messages)