import React from 'react';
import {View,Text,StyleSheet,ImageBackground,Dimensions} from 'react-native';

class Vue1 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={{flex:1}}>
                <ImageBackground source={require("./../../assets/images/Maison.jpg")} style={styles.imagebackground}>
                    <Text style={styles.text}>Assurance Maison</Text>
                </ImageBackground>

            </View>
        )
    }
}
const styles=StyleSheet.create({
    imagebackground:{
        width: Dimensions.get('screen').width,
        height:"100%",
        marginLeft:0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "silver",
        opacity: 0.7,
        backgroundColor: 'black',
    },
    text:{
        color:'yellow',
        fontWeight:'bold',
        fontSize:20,
    }
});
export default Vue1