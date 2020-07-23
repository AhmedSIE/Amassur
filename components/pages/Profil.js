import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,ScrollView } from 'react-native';
import {Separator,ListItem, Left, Right,Card} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from  'react-redux';
import ImagePicker from 'react-native-image-picker';
import AppLoading from '../AppLoading';

class Profil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourcePath: this.props.users.photo ,
            loading:false,
        };
    }

    selectFile = () => {
        var options = {
            title: 'Choisir une image',
           
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    
        ImagePicker.showImagePicker(options, res => {
            console.log('Response = ', res);
        
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                let source = res;
                this.setState({
                resourcePath: source.data,
                });
                this.save();
            }
        });
    };
    save = async() => {
        if (this.state.resourcePath != null) {
            const photo = this.state.resourcePath;
            this.setState({ loading: true })
            await fetch('http://192.168.1.101:8000/api/auth/photo',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({"token" : this.props.users.token,"photo": photo})
            }).then(res=>res.json())
            .then((resData) => {
                alert('ok')
                console.log(resData)
                this.setState({ loading: false })
                
            })
            .catch((e) => console.log(e));
        } else {
            alert("Format d'image invalide");
        }
    };

    render() {
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading/>
                    ):(
                        <ScrollView>
                            
                            <View style={styles.photo}>
                                <TouchableOpacity onPress={this.selectFile}>
                                    <Image
                                        source={{
                                        uri: 'data:image/jpeg;base64,' + this.state.resourcePath,
                                        }}
                                        style={styles.image1}
                                    />
                                </TouchableOpacity>       
                            </View>
                            <Separator bordered>
                                <Text>Mon profil</Text>
                            </Separator>
                            <ListItem>
                                <Left>
                                    <Text style={styles.tex}>Nom</Text>
                                </Left>
                                <Text style={styles.tex}>{this.props.users.nom}</Text>
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
                                <Text style={styles.tex}>{this.props.users.prenom}</Text>
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
                                <Text style={styles.tex}>{this.props.users.telephone}</Text>
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
                                <Text style={styles.tex}>{this.props.users.email}</Text>
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
                                <Text>Ma carte </Text>
                            </Separator>
                            <ListItem>
                                <TouchableOpacity>
                                    <Card style={styles.select}>
                                        <Text style={styles.montitre}>PLATINUME</Text>
                                    </Card>
                                </TouchableOpacity>
                            </ListItem>
                        </ScrollView>
                    )
                }
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:12    
    },
        buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    },
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

const mapStateToProps=(state)=>{
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Profil)