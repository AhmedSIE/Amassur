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
    free(){
        this.props.navigation.navigate('FREE CARD');
    }
    silver(){
        this.props.navigation.navigate('SILVER CARD');
    }
    gold(){
        this.props.navigation.navigate('GOLD CARD');
    }
    platinum(){
        this.props.navigation.navigate('PLATINUM CARD');
    }
    render(){
        let navigation = this.props.navigation
        return (
            <View style={{flex:1}}>
                <HeaderNavigator navigation={navigation}/>
                <ScrollView style={styles.scrollView}>
                    <Container style={styles.list}>
                        <List>
                            <Text style={styles.entete}>Nos services</Text>
                            <TouchableOpacity onPress={()=>this.free()}>
                                <Card style={styles.select}>
                                    <Image style={styles.image1} source={require('./../../assets/images/Cartes/free_card.png')}/>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.silver()}>
                                <Card style={styles.select}>
                                    <Image style={styles.image1} source={require('./../../assets/images/Cartes/silver_card.png')}/>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.gold()}>
                                <Card style={styles.select}>
                                    <Image style={styles.image1} source={require('./../../assets/images/Cartes/gold_card.png')}/>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.platinum()}>
                                <Card style={styles.select}>
                                    <Image style={styles.image1} source={require('./../../assets/images/Cartes/platinum_card.png')}/>
                                </Card>
                            </TouchableOpacity>
                        </List>
                    </Container>  
                </ScrollView>
            </View>    
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
    },
    image1:{
        width:'100%',
        height:'100%',
    }
});
export default Services