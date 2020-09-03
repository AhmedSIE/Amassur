import React from 'react';
import  {StyleSheet, Image,View,ScrollView} from 'react-native';
import {Container, Text, Title, Card, CardItem,Content, List, ListItem,Body , Left, Right,Icon} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderNavigator from "../../navigation/MonHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from 'react-native-elements';


class Parrainage extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let navigation = this.props.navigation
        return (
            <Container>
                <HeaderNavigator  navigation={navigation}/>
                <ScrollView style={styles.scrollView}>
                <Text style={styles.entete55}>Mes parrainages</Text>
                    <Container style={styles.entete} >
                        <Image style={styles.image1} source={require('./../../assets/images/icone_partenaire.png')}/>
                        <Text style={styles.entext}>Parrainez vos proches - Gagnez une carte</Text>
                    </Container>
                    <Container style={styles.simplecard} >
                        <Text style={styles.entete3}>Participez à nos nouvelles offres et faites-en bénéficier à vos proches</Text>
                    </Container>
                    
                    <Container style={styles.sectionbtn}>  
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Parrainez vos proches par sms</Text>
                        </TouchableOpacity>
                    </Container>
                    <Container style={styles.display}>
                        <Container style={styles.display2}>
                                <Card style={styles.card} noShadow={true}>
                                    <CardItem style={styles.carditem}>
                                        <Text style={styles.text2}>0{"\n"}Invitation(s) en cours</Text>
                                    </CardItem>
                                </Card>
                        </Container>
                        <Container style={styles.display3}>
                            <Card style={styles.card} noShadow={true}>
                                
                                <CardItem style={styles.carditem}>
                                    <Text style={styles.text2}> 0 {"\n"}Ami(s) parrainé(s)</Text>
                                </CardItem>
                            </Card>
                        </Container>
                    </Container>
                </ScrollView>
            </Container>    
        );
    }
}
const styles=StyleSheet.create({
    scrollView: {
        height:'78%',
        // marginTop:'15%',
        backgroundColor: "#fafafa", 

    },
    entete55:{
        padding:5,
        textAlign:'center',
        color:'#2E3682',
        fontWeight:'bold',
        fontSize:16,
        backgroundColor: "white", 
    },
    container: {
        flex: 1,
        padding: 24,
    },
    card:{
        backgroundColor:'transparent',
        borderColor:'transparent',
        height:200,
    },
    carditem:{
        backgroundColor:'transparent',
        borderColor:'transparent',
        height:150,
    },
    text:{
        fontSize: 15,
    },
    text2:{
        fontSize: 12,
        textAlign:'center'
    },
    paragr:{
        fontSize: 12,
        textAlign:'justify',
        width:'100%',
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
        height:150,
    },
    display2:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:'100%',
    },
    display3:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:'100%',
        borderLeftColor:'#2E3682',
        borderLeftWidth:1
    },
   
    entete:{
        paddingTop:20,
        height:'100%',
        alignItems:'center'
    },
    entext:{
      fontSize:16,
      fontWeight:'bold',
      textAlign:'center',
      color:'#2E3682',
      paddingTop:10,
    },
    entete3:{
        margin:10,
        marginLeft:20,
        marginTop:'2%',
        textAlign:'center',
        color:'#2E3682',
        fontSize:13,
        fontStyle: 'italic'
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
        marginTop:'10%',
        backgroundColor:'transparent'
    },
    image1:{
        height:80,
        width:80,
    },
});
export default Parrainage