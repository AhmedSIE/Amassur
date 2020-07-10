import React from 'react';
import  {StyleSheet, Image,View,ScrollView} from 'react-native';
import {Container, Text, Title, Card, CardItem,Content, List, ListItem,Body , Left, Right,Icon} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderNavigator from "../../navigation/MonHeader";
import { TouchableOpacity } from "react-native-gesture-handler";

class Services extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Container style={styles.corp}>
                <HeaderNavigator/>
                <ScrollView style={styles.scrollView}>
                    <Container style={styles.list}>
                        <List>
                            <Text style={styles.entete}>Que voulez-vous faire ?</Text>
                            <TouchableOpacity>
                                <Card style={styles.select}>
                                    <ListItem>
                                            <Left>
                                                <Text style={styles.select2}>J'ai besoin d'être contacté</Text>
                                            </Left>
                                            <Right>
                                                <FontAwesome name="chevron-right" style={styles.direct2}/>
                                            </Right>

                                    </ListItem>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Card>
                                    <ListItem >
                                        <Left>
                                            <Text style={styles.tex}>J'ai besoin de connaitre mes garanties</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct} />
                                        </Right>
                                    </ListItem>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Card>
                                    <ListItem>
                                        <Left>
                                            <Text style={styles.tex}>J'ai besoin de connaitre les modes d'acquisition</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct} />
                                        </Right>
                                    </ListItem>    
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Card style={styles.listb}>
                                    <ListItem>
                                        <Left>
                                            <Text style={styles.tex}>J'ai besoin de connaitre les avantages liés à un compte</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct} />
                                        </Right>
                                    </ListItem>
                                </Card>
                            </TouchableOpacity>
                        </List>
                    </Container>  
                </ScrollView>
            </Container>    
        );
    }
}
const styles=StyleSheet.create({
    scrollView: {
        // height:'78%',
        marginTop:'16%',
        backgroundColor: "#fafafa", 

    },
    entete:{
        margin:20,
        marginTop:0,
        textAlign:'center',
        color:'#2E3682',
        fontWeight:'bold',
        fontSize:25,
    },
    direct:{
        fontSize:30,
        color:'#2E3682',
    },
    direct2:{
        fontSize:30,
        color:'white',
    },
    list:{
        height:'50%',

    },
    listb:{

    },
    select:{
        backgroundColor:'#2E3682',

    },
    select2:{
        color:'#fafafa',

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
export default Services