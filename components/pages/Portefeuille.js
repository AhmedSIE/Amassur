import React from 'react';
import  {StyleSheet, Image,View,ScrollView} from 'react-native';
import {Container, Text, Title, Card, CardItem,Content, List, ListItem,Body , Left, Right,Icon} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderNavigator from "../../navigation/MonHeader";
import { TouchableOpacity } from "react-native-gesture-handler";

class Portefeuille extends React.Component{
    constructor(props){
        super(props)
    }
  
    render(){
        let navigation = this.props.navigation
        if (this.props.token) {
            return (
                <Container style={styles.corp}>
                    <HeaderNavigator  navigation={navigation}/>
                    <ScrollView style={styles.scrollView}>
                        <Container style={styles.display}>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file-text' style={styles.icone3}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes contrats</Text>  
                                        </CardItem>
                                            <Text style={styles.text2}>1 contrats</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file' style={styles.icone2}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes devis</Text>
                                        </CardItem>
                                        <Text style={styles.text3}>0 nouvelle information</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
    
                        </Container>
                        <Container style={styles.display}>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file-photo-o' style={styles.icone2}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes photos</Text>
                                        </CardItem>
                                        <Text style={styles.text3}>0 manquante(s)</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file-text-o' style={styles.icone2}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes attestations</Text>
                                        </CardItem>
                                        <Text style={styles.text3}>0 attestation(s)</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
    
                        </Container>
                        <Container style={styles.display}>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file-o' style={styles.icone3}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes factures</Text>
                                        </CardItem>
                                        <Text style={styles.text2}>3 factures</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
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
            );    
        } else {
            return (
                <Container style={styles.corp}>
                    <HeaderNavigator navigation={navigation}/>
                    <ScrollView style={styles.scrollView}>
                        <Container style={styles.display}>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file-text' style={styles.icone3}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes contrats</Text>  
                                        </CardItem>
                                            <Text style={styles.text2}>1 contrats</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file' style={styles.icone2}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes devis</Text>
                                        </CardItem>
                                        <Text style={styles.text3}>0 nouvelle information</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
    
                        </Container>
                        <Container style={styles.display}>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file-photo-o' style={styles.icone2}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes photos</Text>
                                        </CardItem>
                                        <Text style={styles.text3}>0 manquante(s)</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file-text-o' style={styles.icone2}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes attestations</Text>
                                        </CardItem>
                                        <Text style={styles.text3}>0 attestation(s)</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
    
                        </Container>
                        <Container style={styles.display}>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
                                    <Card style={styles.card2}>
                                        <CardItem>
                                            <FontAwesome name='file-o' style={styles.icone3}/>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.text}>Mes factures</Text>
                                        </CardItem>
                                        <Text style={styles.text2}>3 factures</Text>
                                    </Card>
                                </TouchableOpacity>
                            </Container>
                            <Container style={styles.display3}>
                                <TouchableOpacity>
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
            );  
        }
    }
}

const styles=StyleSheet.create({
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
    }
});
export default Portefeuille