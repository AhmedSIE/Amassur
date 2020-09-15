import React, { useState, useCallback, useEffect } from 'react';
import  {StyleSheet, Image,View,Text,TextInput, AsyncStorage, Keyboard,Button, Dimensions, KeyboardAvoidingView } from 'react-native';
import HeaderNavigator from "../../navigation/MonHeader";
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, ScrollView, FlatList } from "react-native-gesture-handler";
import { Right, Left } from 'native-base';
import {LocalNotification} from './../../services/LocalPushController';
import RemotePushController from './../../services/RemotePushController';
import Pusher from 'pusher-js/react-native';
import AppLoading from '../AppLoading';


const { width, height } = Dimensions.get('window');
// Enable pusher logging - don't include this in production
Pusher.logToConsole = false;

class Messages extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: [],
            loading:true,
        };
        this.pusher=null;
        this.send = this.send.bind(this);
        this.reply = this.reply.bind(this);
        this.renderItem   = this._renderItem.bind(this);
        this.scrollView=null,
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',this._keyboardDidShow.bind(this))
        this.lesmessages();
    }

    componentDidMount() {
        var pusher = new Pusher('1692f1e2f1dc6035844e', {cluster: 'us2'});
        var channel = pusher.subscribe('my-channel');
        this.pusher=channel.bind('my-event', function(data) {return JSON.stringify(data);});
        console.log(this.pusher + 'Test');
        channel.bind('client-joined', function(data) {
            console.log(data);
            alert(data.longitude)
        });
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();

    }
    _keyboardDidShow() {
        this.scrollView.scrollToEnd();
    }

    messages = async() => {
        let messages =  await AsyncStorage.getItem('messages');
        let parsed=   JSON.parse(messages);
        this.setState({messages: parsed}); 
        this.setState({loading:false})

    }

    messages2 = async()=> {
        let messages = await AsyncStorage.getItem('messages');
        let parsed=   JSON.parse(messages);
        if (parsed) {
            this.setState({loading:false})
            this.setState({messages: parsed});    
        } else {
           alert("Pas d'accès internet");
        }
    }
    
    lesmessages = async()=>{
        await fetch('http://192.168.1.101:8000/api/messages/message',{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'token' : this.props.users.token})
        }).then(res=>res.json())
        .then((resData) => {
            this.setState({loading:true})
            let messages = resData;
            AsyncStorage.setItem('messages',JSON.stringify(messages));
            this.messages();
        })
        .catch((e) =>{
            this.setState({loading:true})
            console.log(e);
            this.messages2();
        });
    }

    reply() {
        var messages = this.state.messages;
        messages.push({
          id:Math.floor((Math.random() * 99999999999999999) + 1),
          statut: 'reçu',
          texte: this.state.msg,
        });
        this.setState({messages:messages});
        AsyncStorage.setItem('messages',JSON.stringify(messages));
    }
    
    send() {
        if (this.state.msg.length > 0) {
            var messages = this.state.messages;
            messages.push({
                id:Math.floor((Math.random() * 99999999999999999) + 1),
                statut: 'envoyé',
                texte: this.state.msg,
            });
            this.onSend(this.state.msg);
            this.setState({msg:'', messages:messages});
            AsyncStorage.setItem('messages',JSON.stringify(messages));
            // setTimeout(() => {
            //     this.reply();
            // }, 2000);
        }
    }
    onSend = async(msg) => {
        if (msg.length>0) {
            await fetch('http://192.168.1.101:8000/api/messages/message/save',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({'token' : this.props.users.token, 'message': msg})
            }).then(res=>res.json())
            .then((resData) => {
                this.setState({ msg: '' });
            })
            .catch((e) => {
                this.setState({ loading: false })
                console.log(e);
            });
        }
    }
    
    _renderItem = ({item}) => {
        if (item.statut =='reçu') {
            return (
                <View style={styles.eachMsg}>
                    <Image source={require('./../../assets/images/logo2.png')} style={styles.userPic} />
                    <View style={styles.msgBlock}>
                        <Text style={styles.msgTxt}>{item.texte}</Text>
                    </View>
                </View>
            );
        } else{
            return (
                <View style={styles.rightMsg} >
                    <View style={styles.rightBlock} >
                        <Text style={styles.rightTxt}>{item.texte}</Text>
                    </View>
                    <Image source={{uri: 'data:image/jpeg;base64,' + this.props.users.photo}} style={styles.userPic} />
                </View>
            );
        }
    };

    onChangeMessage(text) {
        this.setState({msg:text})
    }
    
      render() {
        return (
          <View style={{ flex: 1 }}>
              {
                  this.state.loading ?(
                      <AppLoading titreMessage='Messages en cours de chargement ...'/>
                  ):(
                    <View style={{flex:1}}>
                        <KeyboardAvoidingView style={styles.keyboard}>
                            <ScrollView
                                 ref={ (ref) => this.scrollView = ref }
                                 onContentSizeChange={ () => {        
                                     this.scrollView.scrollToEnd( { animated: false } )
                                 }}
                                 style={styles.scrollView}
                            >
        
                                <FlatList 
                                    style={styles.list}
                                    extraData={this.state}
                                    data={this.state.messages}
                                    keyExtractor = {(item) => {
                                        return item.id;
                                    }}
                                    renderItem={this.renderItem}
                                />
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
                                        value={this.state.msg}
                                    />
                                </View>
                                
                                <View>
                                    <TouchableOpacity onPress={()=> this.send()}>
                                            <FontAwesome name='send' style={styles.messageicon}/>
                                    </TouchableOpacity>  
                                </View>
                            </View>
                      </KeyboardAvoidingView>
                      <RemotePushController />
                    </View>
                  )
              }
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
        keyboard: {
            flex: 1,
            justifyContent: 'center',
        },
        image: {
            width,
            height,
        },
        header: {
            height: 65,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#075e54',
        },
        left: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        right: {
            flexDirection: 'row',
        },
        chatTitle: {
            color: '#fff',
            fontWeight: '600',
            margin: 10,
            fontSize: 15,
        },
        chatImage: {
            width: 30,
            height: 30,
            borderRadius: 15,
            margin: 5,
        },
        eachMsg: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            margin: 5,
        },
        rightMsg: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            margin: 5,
            alignSelf: 'flex-end',
        },
        userPic: {
            height: 40,
            width: 40,
            margin: 5,
            borderRadius: 20,
            backgroundColor: '#f8f8f8',
        },
        msgBlock: {
            width: 220,
            borderRadius: 5,
            backgroundColor: '#ffffff',
            padding: 10,
            shadowColor: '#3d3d3d',
            shadowRadius: 2,
            shadowOpacity: 0.5,
            shadowOffset: {
            height: 1,
            },
        },
        rightBlock: {
            width: 220,
            borderRadius: 5,
            backgroundColor: '#b5ebf1',
            padding: 10,
            shadowColor: '#3d3d3d',
            shadowRadius: 2,
            shadowOpacity: 0.5,
            shadowOffset: {
            height: 1,
            },
        },
        msgTxt: {
            fontSize: 15,
            color: '#555',
            fontWeight: '600',
        },
        rightTxt: {
            fontSize: 15,
            color: '#202020',
            fontWeight: '600',
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
        marg:{
            height:80,
            backgroundColor:'transparent'
        },
    }); 
        

const mapStatetoProps=(state) => {
    return {
        users:state.users
    }
}
export default connect(mapStatetoProps)(Messages)