import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { Container, Header, Title, Card, CardItem,Content ,Icon} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class MonHeader extends React.Component{
    constructor(props){
        super(props);
        this.naviagation=this.props.navigation
    }

    profil=()=>{
        this.props.navigation.navigate('Profil')
    }
    parametre=()=>{
        this.props.navigation.navigate('Parametres')
    }
    accueil=()=>{
        this.props.navigation.navigate('Accueil')
    }
    connexion=()=>{
        this.props.navigation.navigate('AuthUser')
    }
    render(){
        return(
            <View style={{flex:1}}>
                <Header style={styles.header}>
                    <View style={styles.display}>
                        <Container style={styles.display2}>
                                {
                                    this.props.users.token ? (
                                        <TouchableOpacity  style={styles.onPress} onPress={()=>this.profil()}>
                                           
                                           {
                                               this.props.users.photo ? (
                                                    <Image style={styles.image2} 
                                                    source={{
                                                        uri: 'data:image/jpeg;base64,' + this.props.users.photo,
                                                    }}/>
                                               ):(
                                                    <FontAwesome name='user-circle' style={styles.iconex}/>
                                               )
                                           } 
                                        </TouchableOpacity>
                                    ):(
                                        <TouchableOpacity style={styles.onPress} onPress={()=>this.connexion()}>
                                            <Image style={styles.image1} source={require('./../assets/images/MaleUser.png')}/>
                                        </TouchableOpacity>
                                    )
                                }
                        </Container>
                        <Container style={styles.display2}>
                            <TouchableOpacity onPress={()=>this.accueil()}>
                                <Image  style={styles.authimage} source={require('./../assets/images/logo2.png')}/>
                            </TouchableOpacity>
                        </Container>
                        <Container style={styles.display2}>
                            <TouchableOpacity onPress={()=>this.parametre()}>
                                <FontAwesome name='cog' style={styles.icone}/>
                            </TouchableOpacity>
                        </Container>
                    </View>      
                </Header>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    header:{
        backgroundColor:'white',
        // position:'absolute',
        // zIndex:1,
    },
    authimage:{
        marginTop:'5%',
        justifyContent: 'center',
        alignItems: 'center',
        height:'26%',
        width:120,
        zIndex:100,

    },
    image1:{
        width:40,
        height:40,
        marginTop:'5%',
        zIndex:100,

    },
    image2:{
        width:40,
        height:40,
        marginTop:'5%',
        zIndex:100,
        borderRadius:100,

    },
    icone:{
       fontSize:22, 
       marginTop:'15%',
       marginLeft:'70%',
       textAlign: "left",
    },
    iconex:{
       fontSize:25, 
       marginTop:'15%',
       marginLeft:'5%',
    },
    container: {
        flex: 1,
        padding: 4,
        backgroundColor:'transparent',
    },
   
    title2: {
        marginTop:10,
        color: "white",
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    },
    display:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent'  
    },
    display2:{
        flex:1, 
        backgroundColor:'transparent'
    },
});
const mapStateToProps = (state) => {
    return {
        users:state.users,
    }
}

export default connect(mapStateToProps)(MonHeader);