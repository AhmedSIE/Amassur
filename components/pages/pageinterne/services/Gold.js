import React from 'react';
import {View,Text,StyleSheet,AsyncStorage,ScrollView, FlatList,TouchableOpacity} from 'react-native';
import {Container,List,ListItem,Left,Right} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import AppLoading from '../../../AppLoading';


class Gold extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            servicesgold:[],
            autreservices:[],
        }
    }
    
    lesservices = async()=> {
        this.setState({ loading: false })
        let servic =  await AsyncStorage.getItem('servicesgold');
        let autreservices =  await AsyncStorage.getItem('autreservices');
        let parsed =   JSON.parse(servic);
        let parsed2 =  JSON.parse(autreservices);
        this.setState({servicesgold: parsed,autreservices: parsed2}); 
    }
    lesservices2 = async()=> {
        this.setState({ loading: false })
        let servic = await AsyncStorage.getItem('servicesfree');
        let autreservices = await AsyncStorage.getItem('autreservices');
        let parsed =   JSON.parse(servic);
        let parsed2 =  JSON.parse(autreservices);
        if (parsed) {
            this.setState({servicesgold: parsed,autreservices: parsed2});  
        } else {
           alert("Pas d'accès internet");
           this.props.navigation.navigate('Services');
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.services();
    }

    services = async()=>{
        await fetch('http://192.168.1.101:8000/api/services/servicesgold',{
            method:'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        }).then(res=>res.json())
        .then((resData) => {
            this.setState({ loading: false })
            let services=resData.messervices;
            let autreservices=resData.autreservices;
            AsyncStorage.setItem('servicesgold',JSON.stringify(services));
            AsyncStorage.setItem('autreservices',JSON.stringify(autreservices));
            this.lesservices();
        })
        .catch((e) => {
            console.log(e);
            this.lesservices2();
        });
    }
    
    messervices=() => {
        return  <FlatList
            data={this.state.servicesgold}
            renderItem={
                ({item})=>
                <View>
                    <ListItem>
                        <Left>
                            <Text style={styles.text3}>{item.libelle}</Text>
                        </Left>
                        <Right>
                            <FontAwesome name="check-circle" style={styles.icon}/>
                        </Right>    
                    </ListItem>
                </View> 
            }
        />    
    }

    autreservices= () => {
        if (this.state.autreservices.length>0) {
            return <FlatList
                data={this.state.autreservices}
                keyExtractor={(_, index) => index.toString()}
                renderItem={
                    ({item})=>
                    <View>
                        <ListItem >
                            <Left>
                                <Text style={styles.text4}>{item.libelle}</Text>
                            </Left>
                            <Right>
                                <FontAwesome name="times-circle" style={styles.icon2}/>
                            </Right>
                        </ListItem>
                    </View>
                }
            />
        }
    }

    souscrire= async()=>{
        const carte=3;
        await fetch('http://192.168.1.101:8000/api/services/servicessourcription',{
            method:'post',
            headers:{
                'Accept':'Application/json',
                'Content-type':'Application/json'
            },
            body:JSON.stringify({'token':this.props.users.token,'carte':carte})
        }).then(res=>res.json())
        .then((resData)=>{
            let user = {  
                token: this.props.users.token,  
                nom:resData.nom,
                prenom:resData.prenom,
                email: resData.email,  
                telephone:resData.telephone,
                carte_id:resData.carte_id,
                photo:resData.photo,
                sessionsexpire:this.props.users.sessionsexpire,
            } 
            AsyncStorage.setItem('user',JSON.stringify(user));
            alert('Souscription réussie !');
            const action = { type: "PROCESS_USER", value: user};
            this.props.dispatch(action);
        })
        .catch((e)=>{
            console.log(e)
            alert("Pas c'accès internet !");
            this.props.navigation.navigate('Main');
        });
    }

    render(){
        return(
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage='Chargement en cours ...'/>
                    ):(
                    <View>
                        <Text style={styles.text1}>GOLD CARD</Text>
                        <Text style={styles.text2}>SERVICES</Text>
                        <ScrollView>
                            <List>
                                {this.messervices()}
                                {this.autreservices()}
                            </List>
                            <Container style={styles.marg}>  
                            </Container>
                        </ScrollView>
                        {
                            this.props.users.carte_id!=3 ? (
                                <View style={styles.sectionbtn}>  
                                    <TouchableOpacity onPress={()=>this.souscrire()} style={styles.button}>
                                        <Text style={styles.textButton}>Souscrire</Text>
                                    </TouchableOpacity>
                                </View>
                            ):(
                                <View></View>
                            )
                        }
                    </View>
                    )
                }
            </View>
        );
    }
}

const styles=StyleSheet.create({
    text1:{
        fontSize:16,
        color:'#2E3682',
        fontWeight:'bold',
        position:'absolute',
        right:'10%',
    },
    text2:{
        fontSize:14,
        color:'green',
        fontWeight:'bold',
        marginLeft:'5%',
        marginTop:30
    },
    text3:{
        fontSize:12,
        // color:'green',
    },
    text4:{
        fontSize:12,
        // color:'silver'
    },
    icon:{
        color:'green',
        fontSize:25
    },
    icon2:{
        color:'red',
        fontSize:25
    },
    paragr2:{
        fontSize: 12,
        textAlign:'center',
        justifyContent:'center',
        width:'100%',
        fontWeight:'bold',
        marginBottom:5
    },
    marg:{
        height:130,
        backgroundColor:'transparent'
    },
    sectionbtn:{
        alignItems: "center",
        height:'50%',
        marginBottom:'5%',
        backgroundColor:'transparent',
        position:'absolute',
        top:'78%',
        left:'5%',
        width:'90%'        
    },
    button: {
        width: 320,
        alignItems: "center",
        backgroundColor: "#2E3682",
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom:10,
    },
    textButton: {
        color: "white",
        textAlign: "center",
        fontSize: 14,

    },
});

const mapStateToProps=(state)=>{
    return {
        users:state.users
    }
}
export default connect(mapStateToProps)(Gold)