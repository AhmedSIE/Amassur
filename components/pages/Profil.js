import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,ScrollView } from 'react-native';
import {Separator,ListItem, Left, Right,Card} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import SwipeablePanel from 'rn-swipeable-panel';

class Profil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swipeablePanelActive: false
        };
    }

    componentDidMount = () => {
        this.openPanel();
    };

    openPanel = () => {
        this.setState({ swipeablePanelActive: true });
    };

    closePanel = () => {
        this.setState({ swipeablePanelActive: false });
    };

    render() {
        return (
            <View >
                <ScrollView>

                    <View style={styles.photo}>
                        <Image style={styles.image1} source={require('./../../assets/images/icone_House.png')}/>
                    </View>
                    <Separator bordered>
                        <Text>Mon profil</Text>
                    </Separator>
                    <ListItem>
                        <Left>
                            <Text style={styles.tex}>Nom</Text>
                        </Left>
                        <Text style={styles.tex}>SIE</Text>
                        <Right>
                            <TouchableOpacity>
                                <FontAwesome name="pencil-square-o" style={styles.direct}/>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text style={styles.tex}>Prénom(s)</Text>
                        </Left>
                        <Text style={styles.tex}>Ahmed</Text>
                        <Right>
                            <TouchableOpacity>
                                <FontAwesome name="pencil-square-o" style={styles.direct}/>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text style={styles.tex}>Téléphone</Text>
                        </Left>
                        <Text style={styles.tex}>22671879519</Text>
                        <Right>
                            <TouchableOpacity>
                                <FontAwesome name="pencil-square-o" style={styles.direct}/>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text style={styles.tex}>Email</Text>
                        </Left>
                        <Text style={styles.tex}>ahmedsie3@gmail.com</Text>
                        <Right>
                            <TouchableOpacity>
                                <FontAwesome name="pencil-square-o" style={styles.direct}/>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text style={styles.tex}>Mot de passe</Text>
                        </Left>
                        <Text style={styles.tex}>**************</Text>
                        <Right>
                            <TouchableOpacity>
                                <FontAwesome name="pencil-square-o" style={styles.direct}/>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                    <Separator bordered>
                        <Text>Ma souscription </Text>
                    </Separator>
                    <ListItem>
                        <TouchableOpacity>
                            <Card style={styles.select}>
                                <Text style={styles.montitre}>PLATINUME</Text>
                            </Card>
                        </TouchableOpacity>
                    </ListItem>
                </ScrollView>
                {/* <SwipeablePanel
                    fullWidth
                    isActive={this.state.swipeablePanelActive}
                    onClose={this.closePanel}
                    onPressCloseButton={this.closePanel}
                >
					<PanelContent /> 
				</SwipeablePanel> */}
            </View>
        );
    }
}
const styles=StyleSheet.create({
    select:{
        backgroundColor:'#fafafa', 
        height:200,
        width:'200%',
        marginLeft:5,
        marginRight:5,

    },
    montitre:{
        padding:30,
    },
    photo:{
        alignItems:'center'
    },
    image1:{
        width:100,
        height:100,
        backgroundColor:'white',
        borderColor:'#272822',
        borderWidth:2,
        borderRadius:100,
        margin:20,
    }
});
export default Profil