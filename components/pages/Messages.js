import React from 'react';
import  {StyleSheet, Image,View,ScrollView} from 'react-native';
import {Container, Text, Title, Card, CardItem,Content, List, ListItem,Body , Left, Right,Icon} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderNavigator from "../../navigation/MonHeader";
import { TouchableOpacity } from "react-native-gesture-handler";

class Messages extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let navigation=this.props.navigation
        return (
            <Container>
                <HeaderNavigator navigation={navigation}/>
                <ScrollView style={styles.scrollView}>
                    
                       
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
});
export default Messages