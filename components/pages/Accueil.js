import React,{ Component,} from "react";
import {StyleSheet, Image,View,ScrollView,Button,LayoutAnimation,AsyncStorage} from 'react-native';
import {Container, Text, Title, Card, CardItem,Content, List, ListItem,Body , Left, Right,Icon} from "native-base";
import HeaderNavigator from "../../navigation/MonHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import {connect} from  'react-redux';
import AppLoading from '../../components/AppLoading';

class Accueil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jour: '',
            notifications:[],
            loading:false,
        };
    }

    notification = async()=> {
        let notifications = await AsyncStorage.getItem('notifications');
        let parsed=   JSON.parse(notifications);
        this.setState({notifications: parsed});  
    }
    notification2 = async()=> {
        let notifications = await AsyncStorage.getItem('notifications');
        let parsed=   JSON.parse(notifications);
        if (parsed) {
            this.setState({notifications: parsed});    
        } else {
           alert("Pas d'accès internet");
        }
    }


    tarif=()=> {
        this.props.navigation.navigate('Tarifs');
    }
 
    componentDidMount() {
        this.mesnotifications();
    }
    mesnotifications = async()=>{
            this.setState({ loading: false })
            await fetch('http://192.168.1.115:8000/api/auth/notifications',{
                method:'get',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
            }).then(res=>res.json())
            .then((resData) => {
                this.setState({ loading: false })
                let notifications=resData
                AsyncStorage.setItem('notifications',JSON.stringify(notifications))
                this.notification();
            })
            .catch((e) =>{
                console.log(e);
                this.notification2();
            });
    }
    notifications= () => {
        if (this.state.notifications.length>0) {
            return this.state.notifications.map((notification) =>  (
                    <View>
                        <Text style={styles.entete4}>{notification.jour}</Text>
                        <Container style={styles.simplecard} >
                            <Card style={styles.card} noShadow={true}>
                                <CardItem style={styles.carditem}>
                                    <Body>
                                        <Text style={styles.paragr2}>
                                            {notification.libelle}
                                        </Text>
                                        <Text style={styles.paragr}>
                                            {notification.description}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Container>
                    </View>
                )
            ) 
        } 
        // this.setState({ loading: true })
    }
    assuranceAuto= ()=> {
        if (this.props.users.token!='') {
            this.props.navigation.navigate('Assurance Auto');
        } else {
            this.props.navigation.navigate('AuthUser')  
        }
    }
    assuranceMoto=()=>{
        if (this.props.users.token!='') {
            this.props.navigation.navigate('Assurance Moto');
        } else {
            this.props.navigation.navigate('AuthUser')  
        }
    }
    assuranceMaison=()=>{
        if (this.props.users.token!='') {
            this.props.navigation.navigate('Assurance Maison');
        } else {
            this.props.navigation.navigate('AuthUser')  
        }
    }
    assuranceSante=()=>{
        if (this.props.users.token!='') {
            this.props.navigation.navigate('Assurance Sante');
        } else {
            this.props.navigation.navigate('AuthUser')  
        }
    }

    render(){
        let navigation = this.props.navigation
             
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage ='Chargement en cours ...'/>
                    ):(
                        <Container style={styles.corp}>
                            <HeaderNavigator navigation={navigation}/>
                            <ScrollView style={styles.scrollView}>
                                <Container style={styles.display}>

                                    <Container style={styles.display2}>
                                        <TouchableOpacity onPress={()=>this.assuranceAuto()}>
                                            <Card style={styles.card1}>
                                                <CardItem style={styles.carditem}>
                                                    <Image style={styles.image1} source={require('./../../assets/images/icone_Auto.png')}/>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                    </Container>
                                    <Container style={styles.display2}>
                                        <TouchableOpacity onPress={()=>this.assuranceMoto()}>
                                            <Card style={styles.card1}>
                                                <CardItem style={styles.carditem}>
                                                    <Image style={styles.image1} source={require('./../../assets/images/icone_Moto.png')}/>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                    </Container>
                                    <Container style={styles.display2}>
                                        <TouchableOpacity onPress={()=>this.assuranceMaison()}>
                                            <Card style={styles.card1}>
                                                <CardItem style={styles.carditem}>
                                                    <Image style={styles.image1} source={require('./../../assets/images/icone_House.png')}/>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                    </Container>
                                    <Container style={styles.display2}>
                                        <TouchableOpacity onPress={()=>this.assuranceSante()}>
                                            <Card style={styles.card1}>
                                                <CardItem style={styles.carditem}>
                                                    <Image style={styles.image1} source={require('./../../assets/images/icone_Sante.png')}/>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                    </Container>
                                </Container>
                                {
                                    this.props.users.token ?(
                                        this.notifications()
                                    ):(
                                        <View style={{flex:1}}>
                                            <Text style={styles.entete4}>Lundi</Text>
                                            <Container style={styles.simplecard} >
                                                <Card style={styles.card} noShadow={true}>
                                                    <CardItem style={styles.carditem}>
                                                        <Body>
                                                            <Text style={styles.paragr2}>
                                                                Bienvenue dans la communauté amassur
                                                            </Text>
                                                            <Text style={styles.paragr}>
                                                            Bienvenue dans l'univers Amassur, l'assurance qui vous simplifie la vie !
                                                            En tant qu'utilisateur non connecté, vous pouvez accéder à certaines fonctionnalités dont les tarifs.
                                                            Pour pouvoir bénéficier de tous les services disponibles sur l'application Amassur, vous pouvez créer un compte en moins d'une. pour démarrer votre devis, appuyez sur "Obtenir un devis"
                                                            </Text>
                                                        </Body>
                                                    </CardItem>
                                                </Card>
                                            </Container>
                                        </View> 
                                    )
                                }

                                <Container style={styles.simplecard}>
                                    <Card style={styles.card} noShadow={true}> 
                                        <Text style={styles.entete2}>Bon Plan</Text>
                                        <CardItem style={styles.carditem}>
                                            <Body>
                                                <Text style={styles.paragr}>
                                                    Les offres flotte, quant à elles, peuvent prendre en charge jusqu'à 10 
                                                    véhicules avec des tarifs dégressifs et une remise de 40% sur la prime.
                                                </Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </Container>
                                <Container style={styles.marg}>  
                                </Container>
                            </ScrollView>
                            <Container style={styles.sectionbtn}>  
                                <TouchableOpacity onPress={()=>this.tarif()} style={styles.button}>
                                    <Text style={styles.textButton}>Obtenir un tarif</Text>
                                </TouchableOpacity>
                            </Container>
                        </Container>    
                    )
                }
            </View>
        );
    }
    
}
const styles = StyleSheet.create({
    corp:{
        backgroundColor:'#fafafa',
        flex:1,

    },
    scrollView: {
        height:'75%',
        // marginTop:'18%',
        backgroundColor: "#fafafa",
    
    },
    container: {
        flex: 1,
        padding: 24,
    },
    text:{
        fontSize: 15,
    },
    paragr:{
        fontSize: 12,
        textAlign:'justify',
        width:'100%',
    },
    paragr2:{
        fontSize: 12,
        textAlign:'justify',
        width:'100%',
        fontWeight:'bold',
        marginBottom:5
    },
    list:{
        height:'50%',

    },
    simplecard:{
        height:'50%',
        width:'95%',
        marginLeft:'2.5%',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor:'transparent'
    },
    display:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:100,
        marginLeft:15,
        marginRight:15
    },
    display2:{
        flex:1, 
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:100, 
    },
    display3:{
        flex:1, 
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:100, 
    },
   
    entete2:{
        margin:10,
        textAlign:'center',
        color:'#2E3682',
        fontWeight:'bold',
    },
   
    entete4:{
        textAlign:'center',
        color:'#272822',
        fontSize:12
    },
   
    card:{  
        borderRadius:10,
        // height:'100%',
        backgroundColor:'#fbfdc81a',
    },
    carditem:{  
        backgroundColor:'transparent',
    },
    card1:{
        justifyContent: 'center',
        alignItems: 'center',
        height:65,
        width:65,
        borderRadius:100,
        marginTop: 15,
        marginBottom:25,
    },
    card2:{
        justifyContent: 'center',
        alignItems: 'center',
        height:100,
        marginBottom:25,
    },
    card3:{
        backgroundColor:'#fafafa'
    },
    icone:{
        fontSize:22,
        backgroundColor:'transparent',
        color:'silver',
     },
    icone2:{
        fontSize:50,
        backgroundColor:'transparent',
        color:'#2E3682',
        
    },
    direct:{
        paddingTop:'10%',
        textAlign: 'center',
        fontSize:30,
        color:'#2E3682',
        backgroundColor:'white',
        height:40,
        width:40,
        borderRadius:100,
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
        // fontFamily: "muli",
        color: "white",
        textAlign: "center",
        fontSize: 14,

    },
    sectionbtn:{
        alignItems: "center",
        height:'50%',
        marginBottom:'5%',
        backgroundColor:'transparent',
        position:'absolute',
        top:'85%',
        left:'6%'
        
        
    },
    image1:{
        height:35,
        width:35,
        backgroundColor:'transparent'
    },
    marg:{
        height:100
    }
});

const mapStateToProps=(state)=>{
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Accueil)