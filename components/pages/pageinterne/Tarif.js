import React from 'react';
import  {StyleSheet, Image,View,ScrollView} from 'react-native';
import {Container, Text, Card, List, ListItem, Left, Right} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderNavigator from "../../../navigation/MonHeader";
import { TouchableOpacity } from "react-native-gesture-handler";

class Tarifs extends React.Component{
    constructor(props){
        super(props)
    }
    assuranceAuto=()=>{
        this.props.navigation.navigate('Tarif Auto');
    }
    assuranceMoto=()=>{
        this.props.navigation.navigate('Tarif Moto');
    }
    assuranceMaison=()=>{
        this.props.navigation.navigate('Tarif Maison');
    }
    assuranceSante=()=>{
        this.props.navigation.navigate('Tarif Sante');
    }
    render(){
        return (
            <Container style={styles.corp}>
                {/* <HeaderNavigator/> */}
                <ScrollView style={styles.scrollView}>
                    <Container style={styles.list}>
                        <List>
                            <Text style={styles.entete}>Que souhaitez-{"\n"}vous assurer ?</Text>
                            <Text style={styles.entete2}>Obtenez votre devis en moins de 45 seconde.</Text>
                            <TouchableOpacity onPress={()=>this.assuranceAuto()}>
                                <Card style={styles.select} noShadow={true}>
                                    <ListItem>
                                            <Left>
                                                <Image style={styles.image1} source={require('./../../../assets/images/icone_Auto.png')}/>
                                                <Text style={styles.tex}>Auto</Text>
                                            </Left>
                                            <Right>
                                                <FontAwesome name="chevron-right" style={styles.direct}/>
                                            </Right>

                                    </ListItem>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.assuranceMoto()}>
                                <Card style={styles.select} noShadow={true}>
                                    <ListItem >
                                        <Left>
                                            <Image style={styles.image1} source={require('./../../../assets/images/icone_Moto.png')}/>
                                            <Text style={styles.tex}>Moto</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct} />
                                        </Right>
                                    </ListItem>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.assuranceMaison()}>
                                <Card style={styles.select} noShadow={true}>
                                    <ListItem>
                                        <Left>
                                            <Image style={styles.image1} source={require('./../../../assets/images/icone_House.png')}/>
                                            <Text style={styles.tex}>Habitation</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct} />
                                        </Right>
                                    </ListItem>    
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.assuranceSante()}>
                                <Card style={styles.select} noShadow={true}>
                                    <ListItem>
                                        <Left>
                                            <Image style={styles.image1} source={require('./../../../assets/images/icone_Sante.png')}/>
                                            <Text style={styles.tex}>Santé</Text>
                                        </Left>
                                        <Right>
                                            <FontAwesome name="chevron-right" style={styles.direct} />
                                        </Right>
                                    </ListItem>
                                </Card>
                            </TouchableOpacity>
                        </List>
                    </Container>
                    <TouchableOpacity>
                        <Text style={styles.entete3}>Nos contrats sont assurés par des partenaire de confiance</Text>
                    </TouchableOpacity>  
                </ScrollView>
            </Container>    
        );
    }
}
const styles=StyleSheet.create({
    scrollView: {
        // height:'78%',
        marginTop:'1%',
        backgroundColor: "#fafafa", 

    },
    image1:{
        height:45,
        width:45,
        marginRight:20,
    },
    entete:{
        marginLeft:20,
        marginTop:0,
        marginBottom:10,
        // textAlign:'center',
        color:'#2E3682',
        fontWeight:'bold',
        fontSize:20,

    },
    entete2:{
        margin:10,
        marginLeft:20,
        marginTop:0,
        // textAlign:'center',
        color:'#2E3682',
        fontSize:12,
    },
    entete3:{
        margin:10,
        marginLeft:20,
        marginTop:'5%',
        textAlign:'center',
        color:'#2E3682',
        fontSize:13,
        textDecorationLine: 'underline'
    },
    list:{
        height:'50%',

    },
  
    select:{
        backgroundColor:'#dddddd73',
        marginLeft:10,
        marginRight:10,
    },
   
    tex:{
        fontWeight:'bold',
        fontSize:18,
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
export default Tarifs