import React,{ Component } from "react";
import {StyleSheet, Image,View,ScrollView} from 'react-native';
import {Container, Text, Title, Card, CardItem,Content, List, ListItem,Body , Left, Right,Icon} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderNavigator from "../../navigation/MonHeader";
import { TouchableOpacity } from "react-native-gesture-handler";

class Accueil extends React.Component {
    constructor(props) {
        super(props);
    }
    accueil=()=>{
        this.props.navigation.navigate('Accueil');
    }
    render(){
        // let navigation = this.props.navigation
        return (
            <Container style={styles.corp}>
                <HeaderNavigator/>
                <ScrollView style={styles.scrollView}>
                    <Container style={styles.display}>
                        <Container style={styles.display2}>
                            <TouchableOpacity>
                                <Card style={styles.card1}>
                                    <CardItem>
                                        <FontAwesome name='home' style={styles.icone}/>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </Container>
                        <Container style={styles.display2}>
                            <TouchableOpacity>
                                <Card style={styles.card1}>
                                    <CardItem>
                                        <FontAwesome name='file-text' style={styles.icone}/>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </Container>
                        <Container style={styles.display2}>
                            <TouchableOpacity>
                                <Card style={styles.card1}>
                                    <CardItem>
                                        <FontAwesome name='wheelchair' style={styles.icone}/>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </Container>
                        <Container style={styles.display2}>
                            <TouchableOpacity>
                                <Card style={styles.card1}>
                                    <CardItem>
                                        <FontAwesome name='id-badge' style={styles.icone}/>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </Container>
                    </Container>
                    <Text style={styles.entete}>Paiement - Procedure -Historique</Text>
                    <Container style={styles.display}>
                        <Container style={styles.display3}>
                            <TouchableOpacity>
                                <Card style={styles.card2}>
                                    <CardItem>
                                        <FontAwesome name='money' style={styles.icone2}/>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </Container>
                        <Container style={styles.display3}>
                            <TouchableOpacity>
                                <Card style={styles.card2}>
                                    <CardItem>
                                        <FontAwesome name='exclamation-circle' style={styles.icone2}/>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </Container>
                        <Container style={styles.display3}>
                            <TouchableOpacity>
                                <Card style={styles.card2}>
                                    <CardItem>
                                        <FontAwesome name='history' style={styles.icone2}/>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </Container>
                    </Container>
                    <Container style={styles.list}>
                            <List>
                                <Text style={styles.entete}>Liens utiles</Text>
                                <TouchableOpacity >
                                    <ListItem noIndent style={{ backgroundColor: "#cde1f9" }}>
                                        <Left>
                                            <Text style={styles.tex}>Une Assistance Complête(aide à domicile, SOS clefs, gardiennage, hébergement...)</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct}/>
                                        </Right>
                                    </ListItem>
                                </TouchableOpacity>
                                <TouchableOpacity  style={styles.card3}>
                                    <ListItem>
                                        <Left>
                                            <Text style={styles.tex}>Gestion des sinistres en visio-conférence</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct} />
                                        </Right>
                                    </ListItem>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card3}>
                                    <ListItem>
                                        <Left>
                                            <Text style={styles.tex}>Nous résilions votre contrat pour vous</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct} />
                                        </Right>
                                    </ListItem>    
                                </TouchableOpacity>
                            </List>
                    </Container>
                    <Container style={styles.simplecard}>
                        <Card>
                            <Text style={styles.entete2}>Bon Plan</Text>
                            <CardItem>
                                <Body>
                                    <Text>
                                        Les offres flotte, quant à elles, peuvent prendre en charge jusqu'à 10 
                                        véhicules avec des tarifs dégressifs et une remise de 40% sur la prime.
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Container>
                </ScrollView>
            </Container>    
        );
    }
    
}
const styles = StyleSheet.create({
    scrollView: {
        // height:'78%',
        marginTop:'15%',
        backgroundColor: "#fafafa", 

    },
    container: {
        flex: 1,
        padding: 24,
    },
    text:{
        fontSize: 15,
    },
    list:{
        height:'50%',

    },
    simplecard:{
        height:'50%',
    },
    display:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:100,
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
    entete:{
        margin:20,
        textAlign:'center',
        color:'#2E3682',
        fontWeight:'bold',
    },
    entete2:{
        margin:10,
        textAlign:'center',
        color:'#2E3682',
        fontWeight:'bold',
    },
    tex:{
        fontSize:15,
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
});

export default Accueil