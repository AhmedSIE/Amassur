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
        let navigation = this.props.navigation
        return (
            <Container style={styles.corp}>
                <HeaderNavigator navigation={navigation}/>
                <ScrollView style={styles.scrollView}>
                    <Container style={styles.list}>
                        <List>
                            <Text style={styles.entete}>Nos services</Text>
                            <TouchableOpacity>
                                <Card style={styles.select}>
                                   <Text style={styles.montitre}>FREE</Text>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Card style={styles.select}>
                                   <Text style={styles.montitre}>PLATINUME</Text>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Card style={styles.select}>
                                   <Text style={styles.montitre}>Gold</Text>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Card style={styles.select}>
                                   <Text style={styles.montitre}>Gold</Text>
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
        height:'78%',
        // marginTop:'16%',
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
        backgroundColor:'#fafafa',
        height:200,
        marginLeft:5,
        marginRight:5,

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
    montitre:{
        padding:30,
    }
});
export default Services