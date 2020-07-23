import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,AsyncStorage } from 'react-native';
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
 
    render(){
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage={'Veuillez patienter ...'} />
                    ):(
                        <ScrollView style={styles.scrollView}>
                            <Container style={styles.list}>
                                <List>
                                    <Text style={styles.entete}>Général</Text>
                                    <TouchableOpacity>
                                        <ListItem style={styles.listItem}>
                                                <Left>
                                                    <FontAwesome name="cog" style={styles.direct2}/>
                                                    <Text style={styles.tex}>Paramètres de l'appli</Text>
                                                </Left>
                                                <Right>
                                                    <FontAwesome name="chevron-right" style={styles.direct}/>
                                                </Right>
                                        </ListItem>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <ListItem style={styles.listItem}>
                                            <Left>
                                                <FontAwesome name="file-text" style={styles.direct4}/>
                                                <Text style={styles.tex}>Condition générales d'utilisation</Text>
                                            </Left>
                                            <Right>
                                                <FontAwesome name="chevron-right" style={styles.direct} />
                                            </Right>
                                        </ListItem>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <ListItem style={styles.listItem}>
                                            <Left>
                                                <FontAwesome name="star" style={styles.direct3}/>
                                                <Text style={styles.tex}>Notez-nous sur Play store</Text>
                                            </Left>
                                            <Right>
                                                <FontAwesome name="chevron-right" style={styles.direct} />
                                            </Right>
                                        </ListItem>    
                                    </TouchableOpacity>
                                </List>
                            </Container>
                            <Container style={styles.list}>
                                <List>
                                    <Text style={styles.entete}>Réseaux sociaux</Text>
                                    <Container style={styles.display}>
                                        <Container style={styles.display2}>
                                            <TouchableOpacity>
                                                <Card style={styles.card1} noShadow={true}>
                                                    <CardItem style={styles.carditem}>
                                                        <Text style={styles.image1}>WWW</Text>
                                                    </CardItem>
                                                </Card>
                                            </TouchableOpacity>
                                        </Container>
                                        <Container style={styles.display2}>
                                            <TouchableOpacity>
                                                <Card style={styles.card2} noShadow={true}>
                                                    <CardItem style={styles.carditem}>
                                                        <FontAwesome name="facebook" style={styles.image2}/>
                                                    </CardItem>
                                                </Card>
                                            </TouchableOpacity>
                                        </Container>
                                        <Container style={styles.display2}>
                                            <TouchableOpacity>
                                                <Card style={styles.card3} noShadow={true}>
                                                    <CardItem style={styles.carditem}>
                                                        <FontAwesome name="share-alt" style={styles.image3}/>
                                                    </CardItem>
                                                </Card>
                                            </TouchableOpacity>
                                        </Container>
                                    </Container>
                                </List>
                                {
                                    this.props.users.token ? (
                                        <Container style={styles.sectionbtn}>  
                                            <TouchableOpacity onPress={()=>this.deconnexion()} style={styles.button}>
                                                <Text style={styles.textButton}>Deconnexion</Text>
                                            </TouchableOpacity>
                                        </Container> 

                                    ):(
                                        <Container style={styles.sectionbtn}>  
                                            <TouchableOpacity onPress={()=>this.connexion()} style={styles.button}>
                                                <Text style={styles.textButton}>Se connecter</Text>
                                            </TouchableOpacity>
                                        </Container> 
                                    )        
                                }
                            </Container>
                        </ScrollView>
                    )
                }
            </View>
        );
    }
}
const styles=StyleSheet.create({
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
        marginTop:'10%'
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