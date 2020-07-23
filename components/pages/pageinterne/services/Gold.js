import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Container,List,ListItem,Left,Right} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


class Gold extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View>
                    <Text style={styles.text1}>GOLD CARD</Text>
                    <Text style={styles.text2}>SERVICES</Text>
                    <ScrollView>
                        <List>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Dépannage(Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>    
                            </ListItem>
                            <ListItem >
                                <Left>
                                    <Text>Contre-expertise (Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon2}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Conseils juridiques(Protection juridique)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Dépannage(Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>    
                            </ListItem>
                            <ListItem >
                                <Left>
                                    <Text>Contre-expertise (Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon2}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Conseils juridiques(Protection juridique)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Dépannage(Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>    
                            </ListItem>
                            <ListItem >
                                <Left>
                                    <Text>Contre-expertise (Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon2}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Conseils juridiques(Protection juridique)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Dépannage(Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>    
                            </ListItem>
                            <ListItem >
                                <Left>
                                    <Text>Contre-expertise (Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon2}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Conseils juridiques(Protection juridique)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Dépannage(Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>    
                            </ListItem>
                            <ListItem >
                                <Left>
                                    <Text>Contre-expertise (Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon2}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Conseils juridiques(Protection juridique)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.text3}>Dépannage(Auto)</Text>
                                </Left>
                                <Right>
                                    <FontAwesome name="check-circle" style={styles.icon}/>
                                </Right>    
                            </ListItem>
                        </List>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    text1:{
        fontSize:24,
        color:'#2E3682',
        fontWeight:'bold',
        position:'absolute',
        right:'10%',
    },
    text2:{
        fontSize:20,
        color:'green',
        fontWeight:'bold',
        marginLeft:'5%',
        marginTop:30
    },
    text3:{
        fontSize:14,
        color:'green',
        fontWeight:'bold',
    },
    icon:{
        color:'green',
        fontSize:25
    },
    icon2:{
        color:'silver',
        fontSize:25
    },
});

export default Gold