import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { Container, Header, Title, Card, CardItem,Content ,Icon} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class MonHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container>
                <Header style={styles.header}>
                    <View style={styles.display}>
                        <Container style={styles.display2}>
                            <TouchableOpacity>
                                <Image style={styles.image1} source={require('./../assets/images/MaleUser.png')}/>
                            </TouchableOpacity>
                        </Container>
                        <Container style={styles.display2}>
                            <TouchableOpacity onPress={()=>this.accueil()}>
                                <Image  style={styles.authimage} source={require('./../assets/images/logo2.png')}/>
                            </TouchableOpacity>
                        </Container>
                        <Container style={styles.display2}>
                            <TouchableOpacity>
                                <FontAwesome name='cog' style={styles.icone}/>
                            </TouchableOpacity>
                        </Container>
                    </View>      
                </Header>

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header:{
        backgroundColor:'white',
    },
    authimage:{
        marginTop:'5%',
        justifyContent: 'center',
        alignItems: 'center',
        height:'26%',
        width:120,
    },
    image1:{
        width:40,
        height:40,
        marginTop:'5%',
    },
    icone:{
       fontSize:22, 
       marginTop:'15%',
       marginLeft:'70%',
       textAlign: "left",
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
export default MonHeader;