import React from 'react';
import {View,Text,StyleSheet,AsyncStorage} from 'react-native';
import {Container,List,ListItem,Left,Right} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from '../../../AppLoading';


class Platinum extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            servicesplatinum:[],
            autreservices:[],
        }
        this.lesservices();
    }
     lesservices= async()=>{
        let servic = await AsyncStorage.getItem('servicesplatinum');
        let autreservices = await AsyncStorage.getItem('autreservices');
        let parsed =   JSON.parse(servic);
        let parsed2 =   JSON.parse(autreservices);
        this.setState({servicesplatinum: parsed,autreservices: parsed2}); 
    }
    componentDidMount() {
        this.services();
    }
    services = async()=>{
        await fetch('http://192.168.1.121:8000/api/services/servicesplatinum',{
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
            AsyncStorage.setItem('servicesplatinum',JSON.stringify(services))
            AsyncStorage.setItem('autreservices',JSON.stringify(autreservices))
        })
        .catch((e) => console.log(e));
    }
    
    messervices=()=>{
        if (this.state.servicesplatinum != '') {
            return this.state.servicesplatinum.map((servicesplatinum) => {
                return (
                    <View>
                        <ListItem>
                            <Left>
                                <Text style={styles.text3}>{servicesplatinum.libelle}</Text>
                            </Left>
                            <Right>
                                <FontAwesome name="check-circle" style={styles.icon}/>
                            </Right>    
                        </ListItem>
                    </View>
                )
            }) 
        } else {
            this.setState({ loading: true })
        }
    }
    autreservices=()=>{
        if (this.state.autreservices!='') {
            return this.state.autreservices.map(autreservice=>{
                return (
                    <View>
                        <ListItem >
                            <Left>
                                <Text>{autreservice.libelle}</Text>
                            </Left>
                            <Right>
                                <FontAwesome name="check-circle" style={styles.icon2}/>
                            </Right>
                        </ListItem>
                    </View>
                )
            }) 
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
                        <Text style={styles.text1}>PLATINUM CARD</Text>
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
        fontSize:24,
        color:'#2E3682',
        fontWeight:'bold',
        position:'absolute',
        right:'10%',
    },
    text2:{
        fontSize:20,
        color:'green',
        fontWeight:'bold',
        marginLeft:'5%',
        marginTop:30
    },
    text3:{
        fontSize:14,
        color:'green',
        fontWeight:'bold',
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

export default Platinum