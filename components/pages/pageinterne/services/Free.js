import React from 'react';
import {View,Text,StyleSheet,AsyncStorage,ScrollView, FlatList} from 'react-native';
import {Container,List,ListItem,Left,Right} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from '../../../AppLoading';


class Free extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            servicesfree:[],
            autreservices:[],
        }
    }

    lesservices = async()=> {
        this.setState({ loading: false })
        let servic =  await AsyncStorage.getItem('servicesfree');
        let autreservices =  await AsyncStorage.getItem('autreservices');
        let parsed =   JSON.parse(servic);
        let parsed2 =  JSON.parse(autreservices);
        this.setState({servicesfree: parsed,autreservices: parsed2}); 
    }
    lesservices2 = async()=> {
        this.setState({ loading: false })
        let servic = await AsyncStorage.getItem('servicesfree');
        let autreservices = await AsyncStorage.getItem('autreservices');
        let parsed =   JSON.parse(servic);
        let parsed2 =  JSON.parse(autreservices);
        if (parsed) {
            this.setState({servicesfree: parsed,autreservices: parsed2});  
        } else {
           alert("Pas d'accès internet");
           this.props.navigation.navigate('Services');
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.services();
    }

    services = async()=> {
        await fetch('http://192.168.11.62:8000/api/services/servicesfree',{
            method:'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        }).then(res=>res.json())
        .then((resData) => {
            let services=resData.messervices
            let autreservices=resData.autreservices
            AsyncStorage.setItem('servicesfree',JSON.stringify(services));
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
            data={this.state.servicesfree}
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
                                <FontAwesome name="check-circle" style={styles.icon2}/>
                            </Right>
                        </ListItem>
                    </View>
                }
            />
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage='Chargement en cours ...'/>
                    ):(
                    <View>
                        <Text style={styles.text1}>FREE CARD</Text>
                        <Text style={styles.text2}>SERVICES</Text>
                        <ScrollView>
                            <List>
                                {this.messervices()}
                                {this.autreservices()}
                            </List>
                            <Container style={styles.marg}>  
                            </Container>
                        </ScrollView>
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
        fontSize:14,
        color:'green',
    },
    text4:{
        fontSize:13,
        color:'silver'

    },
    icon:{
        color:'green',
        fontSize:25
    },
    icon2:{
        color:'silver',
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
        height:50,
        backgroundColor:'transparent',
    }
});

export default Free