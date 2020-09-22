import React from 'react';
import  {StyleSheet, Image,View,ScrollView} from 'react-native';
import {Container, Text, Title, Card, CardItem,Content, List, ListItem,Body , Left, Right,Icon} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderNavigator from "../../navigation/MonHeader";
import {connect} from 'react-redux';
import { TouchableOpacity } from "react-native-gesture-handler";
import AppLoading from '../AppLoading';

class Portefeuille extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            contrats:[],
            devis:[],
            photos:[],
            attestations:[],
            factures:[],
        }
    }
    componentDidMount(){
        this.setState({loading:true});
        this.fetchListData();
    }
    connexion=()=> {
        this.props.navigation.navigate('AuthUser')
    }

    factures=(listes)=> {
        this.props.navigation.navigate('MES FACTURES',{'factures':listes})
    }
    
    videos=()=>{
        this.props.navigation.navigate('MES VIDEOS')
    }
    devis=(listes)=>{
        this.props.navigation.navigate('MES DEVIS',{'devis':listes})
    }
    photos=(listes)=>{
        this.props.navigation.navigate('MES PHOTOS',{'photos':listes})
    }
    contrats=(listes)=>{
        this.props.navigation.navigate('MES CONTRATS',{'contrats':listes})
    }
    attestations=(listes)=>{
        this.props.navigation.navigate('MES ATTESTATIONS',{'attestations':listes})
    }

    fetchListData = async () => {
        const response = await fetch('http://192.168.1.123:8000/api/assurances/fichiers',{
            method:'post',
            headers:{
                'Accept':'Application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'token':this.props.users.token})
        }).then(res=>res.json())
        .then((resData) => {
            this.setState({ loading: false });
            return resData;
        })
        .catch((e)=>{
            console.log(e)
        });
        this.setState({ photos: response.photos, factures:response.factures,attestations:response.attestations,
            devis:response.devis,contrats:response.contrats,loading:false});
    };


    render(){
        let navigation = this.props.navigation
        if (this.props.users.token != null)  {
            return (
                <View style={{flex:1}}>
                    {
                        this.state.loading ? (
                            <AppLoading titreMessage='Chargement en cours ...'/>
                        ):(
                            <Container style={styles.corp}>
                                <HeaderNavigator  navigation={navigation}/>
                                <ScrollView style={styles.scrollView}>
                                <Text style={styles.entete}>Mon portefeuille</Text>
                                    <Container style={styles.display}>
                                        <Container style={styles.display3}>
                                            {
                                                this.state.contrats.length>0 ?(
                                                    <TouchableOpacity onPress={()=>this.contrats(this.state.contrats)}>
                                                        <Card style={styles.card2}>
                                                            <CardItem>
                                                                <FontAwesome name='file-text' style={styles.icone3}/>
                                                            </CardItem>
                                                            <CardItem>
                                                                <Text style={styles.text}>Mes contrats</Text>  
                                                            </CardItem>
                                                                <Text style={styles.text2}>{this.state.contrats.length} contrats</Text>
                                                        </Card>
                                                    </TouchableOpacity>
                                                ):(
                                                    <Card style={styles.card2}>
                                                        <CardItem>
                                                            <FontAwesome name='file-text' style={styles.icone2}/>
                                                        </CardItem>
                                                        <CardItem>
                                                            <Text style={styles.text}>Mes contrats</Text>  
                                                        </CardItem>
                                                            <Text style={styles.text3}>0 contrat</Text>
                                                    </Card>
                                                )
                                            }
                                        </Container>
                                        <Container style={styles.display3}>
                                            {
                                                this.state.devis.length>0 ?(
                                                    <TouchableOpacity onPress={()=>this.devis(this.state.devis)}>
                                                        <Card style={styles.card2}>
                                                            <CardItem>
                                                                <FontAwesome name='file' style={styles.icone3}/>
                                                            </CardItem>
                                                            <CardItem>
                                                                <Text style={styles.text}>Mes devis</Text>
                                                            </CardItem>
                                                            <Text style={styles.text2}>{this.state.devis.length} nouvelle(s) information(s)</Text>
                                                        </Card>
                                                    </TouchableOpacity>
                                                    
                                                ):(
                                                    <Card style={styles.card2}>
                                                        <CardItem>
                                                            <FontAwesome name='file' style={styles.icone2}/>
                                                        </CardItem>
                                                        <CardItem>
                                                            <Text style={styles.text}>Mes devis</Text>
                                                        </CardItem>
                                                        <Text style={styles.text3}>0 nouvelle information</Text>
                                                    </Card>
                                                )
                                            }
                                        </Container>
                
                                    </Container>
                                    <Container style={styles.display}>
                                        <Container style={styles.display3}>
                                            {
                                                this.state.photos.length>0 ?(
                                                    <TouchableOpacity onPress={()=>this.photos(this.state.photos)}>
                                                        <Card style={styles.card2}>
                                                            <CardItem>
                                                                <FontAwesome name='file-photo-o' style={styles.icone3}/>
                                                            </CardItem>
                                                            <CardItem>
                                                                <Text style={styles.text}>Mes photos</Text>
                                                            </CardItem>
                                                            <Text style={styles.text2}>{this.state.photos.length} manquante(s)</Text>
                                                        </Card>
                                                    </TouchableOpacity>
                                                    
                                                ):(
                                                    <Card style={styles.card2}>
                                                        <CardItem>
                                                            <FontAwesome name='file-photo-o' style={styles.icone2}/>
                                                        </CardItem>
                                                        <CardItem>
                                                            <Text style={styles.text}>Mes photos</Text>
                                                        </CardItem>
                                                        <Text style={styles.text3}>0 manquante</Text>
                                                    </Card>
                                                )
                                            }
                                        </Container>
                                        <Container style={styles.display3}>
                                            {
                                                this.state.attestations.length>0 ?(
                                                    
                                                    <TouchableOpacity onPress={()=>this.attestations(this.state.attestations)}>
                                                        <Card style={styles.card2}>
                                                            <CardItem>
                                                                <FontAwesome name='file-text-o' style={styles.icone3}/>
                                                            </CardItem>
                                                            <CardItem>
                                                                <Text style={styles.text}>Mes attestations</Text>
                                                            </CardItem>
                                                            <Text style={styles.text2}>{this.state.attestations.length} attestation(s)</Text>
                                                        </Card>
                                                    </TouchableOpacity>
                                                ):(
                                                    <Card style={styles.card2}>
                                                        <CardItem>
                                                            <FontAwesome name='file-text-o' style={styles.icone2}/>
                                                        </CardItem>
                                                        <CardItem>
                                                            <Text style={styles.text}>Mes attestations</Text>
                                                        </CardItem>
                                                        <Text style={styles.text3}>0 attestation</Text>
                                                    </Card> 
                                                )
                                            }
                                        </Container>
                
                                    </Container>
                                    <Container style={styles.display}>
                                        <Container style={styles.display3}>
                                            {
                                                this.state.factures.length>0 ?(
                                                    <TouchableOpacity onPress={()=>this.factures(this.state.factures)}>
                                                        <Card style={styles.card2}>
                                                            <CardItem>
                                                                <FontAwesome name='file-o' style={styles.icone3}/>
                                                            </CardItem>
                                                            <CardItem>
                                                                <Text style={styles.text}>Mes factures</Text>
                                                            </CardItem>
                                                            <Text style={styles.text2}>{this.state.factures.length} factures</Text>
                                                        </Card>
                                                    </TouchableOpacity>
                                                    
                                                ):(
                                                    <Card style={styles.card2}>
                                                        <CardItem>
                                                            <FontAwesome name='file-o' style={styles.icone2}/>
                                                        </CardItem>
                                                        <CardItem>
                                                            <Text style={styles.text}>Mes factures</Text>
                                                        </CardItem>
                                                        <Text style={styles.text3}>0 facture</Text>
                                                    </Card>
                                                )
                                            }
                                        </Container>
                                        <Container style={styles.display3}>
                                            <TouchableOpacity onPress={()=>this.videos()}>
                                                <Card style={styles.card2}>
                                                    <CardItem>
                                                        <FontAwesome name='file-movie-o' style={styles.icone3}/>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Text style={styles.text}>Vidéos</Text>
                                                    </CardItem>
                                                    <Text style={styles.text2}>Comprendre l'offre</Text>
                                                </Card>
                                            </TouchableOpacity>
                                        </Container>
                
                                    </Container>
                                </ScrollView>
                            </Container>    
                        )
                    }
                </View>
            );    
        } else {
            return (
                <Container style={styles.corp}>
                    <HeaderNavigator navigation={navigation}/>
                    <ScrollView style={styles.scrollView}>
                        <Container style={styles.mondisplay}>
                            <FontAwesome name='file-text-o' style={styles.monicone}/>
                            <Text style={styles.montext}>Portefeuille</Text>
                            <Text style={styles.montext2}>Connectez-vous pour pouvoir accéder à vos contrats, 
                            attestations, factures, ainsi que d'autres fonctionnalités</Text>
                            <Container style={styles.sectionbtn}>  
                                <TouchableOpacity onPress={()=>this.connexion()} style={styles.button}>
                                    <Text style={styles.textButton}>Se connecter</Text>
                                </TouchableOpacity>
                            </Container> 
                        </Container>
                    </ScrollView>
                </Container>    
            );  
        }
    }
}

const styles=StyleSheet.create({
    entete:{
        padding:5,
        textAlign:'center',
        color:'#2E3682',
        fontWeight:'bold',
        fontSize:16,
        backgroundColor: "white", 
    },
    scrollView: {
        height:'78%',
        // marginTop:'5%',
        backgroundColor: "#fafafa", 
    },
    container: {
        flex: 1,
        padding: 24,
    },
    display:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:150,
    },
    mondisplay:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'transparent',
        paddingTop:'15%',
        height:'50%'

    },
    display3:{
        flex:1, 
        height:150, 
        justifyContent: 'center',
        padding:5,
    },
    card2:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:5,
        paddingBottom:5,
        // backgroundColor:'#fafafa',

    },
    monicone:{
        // marginTop:'1%',
        fontSize:100,
        backgroundColor:'transparent',
        color:'#2E3682',
        
    },
    icone2:{
        fontSize:50,
        backgroundColor:'transparent',
        color:'silver',
        
    },
    icone3:{
        fontSize:50,
        backgroundColor:'transparent',
        color:'#2E3682',
        
    },
    text:{
        fontSize:14,
        margin:0,
        padding:0,
        marginTop:-15,
    },
    text2:{
        fontSize:12,
        marginTop:-10,
        padding:0,
        color:'#2E3682',
    },
    text3:{
        fontSize:12,
        marginTop:-10,
        padding:0,
    },
    montext:{
        fontSize:28,
        marginTop:'10%',
        fontWeight:'bold',
        padding:0,
    },
    montext2:{
        fontSize:12,
        // marginTop:'1%',
        padding:0,
        textAlign:'center',
        padding:20,
    },
    sectionbtn:{
        alignItems: "center",
        height:'50%',
        marginTop:'10%',
        backgroundColor:'transparent',

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

export default connect(mapStateToProps)(Portefeuille)