import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,AsyncStorage ,Share,Linking} from 'react-native';
import {Container, Card,CardItem, List, ListItem, Left, Right} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from './../AppLoading';
import {connect} from 'react-redux';


// import SwipeablePanel from 'rn-swipeable-panel';


class Parametres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swipeablePanelActive: false,
            loading:false,
        };
        // console.log(this.props)
    }

    connexion=()=>{
        this.props.navigation.navigate('AuthUser')
    }
    deconnexion=()=>{
        this.clearAsyncStorage();
        this.props.navigation.navigate('Accueil');
    }
    clearAsyncStorage =() => {
        this.setState({loading:true});
        AsyncStorage.clear();
        const action = { type: "PROCESS_USER_DECONNEXION", value: ''};
        this.props.dispatch(action);
        this.setState({ loading:false});
    }
    onShare = async () => {
        const result = await Share.share({
            title: 'App link',
            message: "Souscrivez et ggerez votre assurance en un clic en Téléchargeant cette application : https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en", 
            url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
        });
    }
    onLink = async() => {
        await Linking.openURL('https://www.switch-maker.com')
    }
    facebook = async() => {
        await Linking.openURL('https://www.facebook.com')
    }
    playStore = async() => {
        await Linking.openURL('https://play.google.com/store/apps/details?id=www.switch_maker.com.frayalabusiness&hl=fr')
    }
    paramettre=async() => {
        await Linking.openSettings('app-settings:')
    }

    render(){
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage={'Veuillez patienter ...'} />
                    ):(
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.list}>
                                <List>
                                    <Text style={styles.entete}>Général</Text>
                                    <ListItem style={styles.listItem}>
                                            <Left>
                                                <FontAwesome name="cog" style={styles.direct2}/>
                                                <TouchableOpacity onPress={()=>this.paramettre()}>
                                                    <Text style={styles.tex}>Paramètres de l'appli</Text>
                                                </TouchableOpacity>
                                            </Left>
                                            <Right>
                                                <FontAwesome name="chevron-right" style={styles.direct}/>
                                            </Right>
                                    </ListItem>
                                    <ListItem style={styles.listItem}>
                                        <Left>
                                            <FontAwesome name="file-text" style={styles.direct4}/>
                                            <Text style={styles.tex}>Condition générales d'utilisation</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct} />
                                        </Right>
                                    </ListItem>
                                    <ListItem style={styles.listItem}>
                                        <Left>
                                            <TouchableOpacity onPress={()=>this.playStore()}>
                                                <FontAwesome name="star" style={styles.direct3}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.playStore()}>
                                                <Text style={styles.tex}>Notez-nous sur Play store</Text>
                                            </TouchableOpacity>
                                        </Left>
                                        <Right>
                                            <TouchableOpacity onPress={()=>this.playStore()}>
                                                <FontAwesome name="chevron-right" style={styles.direct} />
                                            </TouchableOpacity>
                                        </Right>
                                    </ListItem>    
                                </List>
                            </View>
                            <View style={styles.list}>
                                <List>
                                    <Text style={styles.entete}>Réseaux sociaux</Text>
                                    <View style={styles.display}>
                                        <Container style={styles.display2}>
                                            <TouchableOpacity onPress={()=>this.onLink()}>
                                                <Card style={styles.card1} noShadow={true}>
                                                    <CardItem style={styles.carditem}>
                                                        <Text style={styles.image1}>WWW</Text>
                                                    </CardItem>
                                                </Card>
                                            </TouchableOpacity>
                                        </Container>
                                        <Container style={styles.display2}>
                                            <TouchableOpacity onPress={()=>this.facebook()}>
                                                <Card style={styles.card2} noShadow={true}>
                                                    <CardItem style={styles.carditem}>
                                                        <FontAwesome name="facebook" style={styles.image2}/>
                                                    </CardItem>
                                                </Card>
                                            </TouchableOpacity>
                                        </Container>
                                        <Container style={styles.display2}>
                                            <TouchableOpacity onPress={()=>this.onShare()}>
                                                <Card style={styles.card3} noShadow={true}>
                                                    <CardItem style={styles.carditem}>
                                                        <FontAwesome name="share-alt" style={styles.image3}/>
                                                    </CardItem>
                                                </Card>
                                            </TouchableOpacity>
                                        </Container>
                                    </View>
                                </List>
                                {
                                    this.props.users.token ? (
                                        <View style={styles.sectionbtn}>  
                                            <TouchableOpacity onPress={()=>this.deconnexion()} style={styles.button}>
                                                <Text style={styles.textButton}>Deconnexion</Text>
                                            </TouchableOpacity>
                                        </View> 

                                    ):(
                                        <Container style={styles.sectionbtn}>  
                                            <TouchableOpacity onPress={()=>this.connexion()} style={styles.button}>
                                                <Text style={styles.textButton}>Se connecter</Text>
                                            </TouchableOpacity>
                                        </Container> 
                                    )        
                                }
                            </View>
                        </ScrollView>
                    )
                }
            </View>
        );
    }
}
const styles=StyleSheet.create({
    link:{
        backgroundColor:'red'
    },
    scrollView:{
        height:'100%',
        backgroundColor:'white'
    },
    entete:{
        marginLeft:20,
        marginTop:20,
        color:'black',
        fontWeight:'bold',
        fontSize:20,

    },
    listItem:{
        height:55
    },
    direct:{
        paddingTop:'10%',
        textAlign: 'center',
        fontSize:18,
        color:'#2E3682',
        backgroundColor:'#dddddd73',
        height:30,
        width:30,
        borderRadius:100,
    },
    direct2:{
        paddingTop:'2.5%',
        textAlign: 'center',
        fontSize:18,
        // color:'#2E3682',
        backgroundColor:'#dddddd73',
        height:30,
        width:30,
        borderRadius:100,
        marginRight:10,
    },
    direct4:{
        paddingTop:'2.5%',
        textAlign: 'center',
        fontSize:18,
        color:'#2E3682',
        backgroundColor:'#dddddd73',
        height:30,
        width:30,
        borderRadius:100,
        marginRight:10,
    },
    direct3:{
        paddingTop:'2.5%',
        textAlign: 'center',
        fontSize:18,
        color:'orange',
        backgroundColor:'#dddddd73',
        height:30,
        width:30,
        borderRadius:100,
        marginRight:10,
    },
    sectionbtn:{
        alignItems: "center",
        height:'50%',
        // marginTop:'10%'
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
    list:{
        height:'50%',

    },
    display:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:100,
        marginLeft:'15%',
        marginRight:'15%',
    },
    card1:{
        justifyContent: 'center',
        alignItems: 'center',
        height:65,
        width:65,
        borderRadius:100,
        marginTop: 15,
        marginBottom:25,
        backgroundColor:'#dddddd73',
    },
    card2:{
        justifyContent: 'center',
        alignItems: 'center',
        height:65,
        width:65,
        borderRadius:100,
        marginTop: 15,
        marginBottom:25,
        backgroundColor:'#3b5998'
    },
    card3:{
        justifyContent: 'center',
        alignItems: 'center',
        height:65,
        width:65,
        borderRadius:100,
        marginTop: 15,
        marginBottom:25,
        backgroundColor:'green'

    },
    carditem:{  
        backgroundColor:'transparent',
    },
    display2:{
        flex:1, 
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:100, 
    },
    image1:{
        fontSize:10,
        backgroundColor:'transparent'
    },
    image2:{
        fontSize:30,
        color:'white',
        backgroundColor:'transparent'
    },
    image3:{
        fontSize:30,
        color:'white',
        backgroundColor:'transparent'
    },
});

const mapStateToProps = (state) => {
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Parametres)
// export default Parametres