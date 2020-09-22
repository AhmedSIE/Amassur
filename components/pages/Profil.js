import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,ScrollView,Modal, TextInput } from 'react-native';
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
            modalVisible:false,
            nom:this.props.users.nom,
            prenom:this.props.users.prenom,
            telephone:this.props.users.telephone,
            email:this.props.users.email,
            ancienpassword:'',
            confirmationpassword:'',
            password:'',
            pivot:'',
            titre:''
        };
        
    }

    messervice= () => {
        this.props.navigation.navigate('Services');
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
            await fetch('http://192.168.1.123:8000/api/auth/photo',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({"token" : this.props.users.token,"photo": photo})
            }).then(res=>res.json())
            .then((resData) => {
                console.log(resData)
                this.setState({ loading: false })
                
            })
            .catch((e) => console.log(e));
        } else {
            alert("Format d'image invalide");
        }
    };
    servicesfree=()=>{
        this.props.navigation.navigate('FREE CARD');
    }
    servicessilver=()=>{
        this.props.navigation.navigate('SILVER CARD');
    }
    servicesgolg=()=>{
        this.props.navigation.navigate('GOLD CARD');
    }
    servicesplatinum=()=>{
        this.props.navigation.navigate('PLATINUM CARD');
    }
    nom=()=>{
        this.setState({modalVisible:true,pivot:this.state.nom, titre:'Nom'});
    }
    prenom=()=>{
        this.setState({modalVisible:true,pivot:this.state.prenom, titre:'Prénom'});
    }
    telephone=()=>{
        this.setState({modalVisible:true,pivot:this.state.telephone, titre:'Téléphone'});
    }
    email=()=>{
        this.setState({modalVisible:true,pivot:this.state.email, titre:'Email'});
    }
    password=()=>{
        this.setState({modalVisible:true,pivot:'*************', titre:'Nouveau'});
    }

    onChangeText(input){
        this.state.titre=='Nom' ? (
            this.setState({nom:input})
        ):this.state.titre=='Prénom' ? (
            this.setState({prenom:input})
        ):this.state.titre=='Téléphone' ? (
            this.setState({telephone:input})
        ):this.state.titre=='Email' ? (
            this.setState({email:input})
        ):(
            this.setState({password:input})
        )
    }

    onChangeTextancien(input){
        this.setState({ancienpassword:input})
    }

    onChangeTextconfirme(input){
        this.setState({confirmationpassword:input})
    }

    valider = async() => {
        if (this.state.password != this.state.confirmationpassword) {
            alert('Mot de passe de confimation incorrect !')
        } else{
            
            this.setState({ loading: true })
            await fetch('http://192.168.1.123:8000/api/auth/edit',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "token":this.props.users.token,
                    "nom":this.state.nom,
                    "prenom":this.state.prenom,
                    "email":this.state.email,
                    "telephone":this.state.telephone,
                    "password":this.state.password,
                    "ancienpassword":this.state.ancienpassword,
                })
            }).then(res=>res.json())
            .then((resData) => {
                if (resData == 'Erreur') {
                    alert('Ancien mot de passe incorrect')
                }else{
                    let user = {  
                        token: this.props.users.token,  
                        nom:resData.nom,
                        prenom:resData.prenom,
                        email: resData.email,  
                        telephone:resData.telephone,
                        carte_id:resData.carte_id,
                        photo:resData.photo,
                        sessionsexpire:this.props.users.sessionsexpire,
                    } 
                    this.setState({ loading: false,modalVisible:false})
                    alert('Mise à jour réussie !');
                    const action = { type: "PROCESS_USER", value: user};
                    this.props.dispatch(action);
                    AsyncStorage.setItem('user',JSON.stringify(user));
                    this.props.navigation.navigate("Profil");
                }

            })
            .catch((e) =>{
                this.setState({ loading: false,modalVisible:false})
                console.log(e)
                alert("Erreur de modification, veuillez réessayer plus tard ! ");
                this.props.navigation.navigate("Profil");
            });         
        }
    }
    
    non=()=>{
        this.setState({modalVisible:false,pivot:'', titre:''});
    }

    render() {
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading/>
                    ):(
                        <View>
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
                                        <TouchableOpacity onPress={()=>this.nom()}>
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
                                        <TouchableOpacity onPress={()=>this.prenom()}>
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
                                        <TouchableOpacity onPress={()=>this.telephone()}>
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
                                        <TouchableOpacity onPress={()=>this.email()}>
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
                                        <TouchableOpacity onPress={()=>this.password()}>
                                            <FontAwesome name="pencil-square-o" style={styles.direct}/>
                                        </TouchableOpacity>
                                    </Right>
                                </ListItem>
                                <Separator bordered>
                                    <Text>Ma carte </Text>
                                </Separator>
                                <ListItem>
                                    {
                                        this.props.users.carte_id==4 ? (
                                            <TouchableOpacity onPress={()=>this.servicesplatinum()}>
                                                <Card style={styles.select}>
                                                    <Image style={styles.image2} source={require('./../../assets/images/Cartes/platinum_card.png')}/>
                                                </Card>
                                            </TouchableOpacity>
                                        ):this.props.users.carte_id==3 ?(
                                            <TouchableOpacity onPress={()=>this.servicesgolg()}>
                                                <Card style={styles.select}>
                                                    <Image style={styles.image2} source={require('./../../assets/images/Cartes/gold_card.png')}/>
                                                </Card>
                                            </TouchableOpacity>
                                        ):this.props.users.carte_id== 2 ?(
                                            <TouchableOpacity onPress={()=>this.servicessilver()}>
                                                <Card style={styles.select}>
                                                    <Image style={styles.image2} source={require('./../../assets/images/Cartes/silver_card.png')}/>
                                                </Card>
                                            </TouchableOpacity>
                                        ):(
                                            <View>
                                                <TouchableOpacity onPress={()=>this.servicesfree()}>
                                                    <Card style={styles.select}>
                                                        <Image style={styles.image2} source={require('./../../assets/images/Cartes/free_card.png')}/>
                                                    </Card>
                                                </TouchableOpacity>
                                                <View style={styles.sectionbtn}>  
                                                    <TouchableOpacity onPress={()=>this.messervice()} style={styles.button}>
                                                        <Text style={styles.textButton}>Souscrire à nos services</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }
                                </ListItem>
                            </ScrollView>
                            <Modal
                                animationType = {"slide"}
                                transparent={true}
                                visible={this.state.modalVisible}
                                >
                                <ScrollView style={styles.scroll}>
                                    <View style={styles.modalcontent}>
                                            {
                                                this.state.titre =='Nouveau' ? (
                                                    <View></View>
                                                ):(
                                                    <View>
                                                        <Text style={styles.modif1}>Données Actuelles</Text>
                                                        <Text style={styles.modif}>{this.state.titre} : {this.state.pivot}</Text>
                                                    </View>
                                                )                                            
                                            }
                                            <Text style={styles.modif1}>Modifier</Text>
                                            {
                                                this.state.titre=='Nouveau' ?(
                                                    <TextInput
                                                    onChangeText={(text) => this.onChangeTextancien(text)}
                                                    placeholder='Ancien mot de passe'
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    />
                                                ):(
                                                    <View></View>
                                                )
                                            }
                                            <TextInput
                                                onChangeText={(text) => this.onChangeText(text)}
                                                placeholder={this.state.titre}
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                autoCompleteType="tel"
                                                // value={this.state.pivot}
                                            />
                                            {
                                                this.state.titre=='Nouveau' ?(
                                                    <TextInput
                                                    onChangeText={(text) => this.onChangeTextconfirme(text)}
                                                    placeholder='Confirmation'
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    />
                                                ):(
                                                    <View></View>
                                                )
                                            }
                                            <View style={styles.confirm2}>
                                                <TouchableOpacity onPress={() => this.non()} style={styles.button3}>
                                                    <Text style={styles.textButton}>Annuler</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.valider()} style={styles.button4}>
                                                    <Text style={styles.textButton}>Valider</Text>
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                </ScrollView>
                            </Modal>
                        </View>
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
        minWidth:'98%',
        marginLeft:'1%',
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
    },
    image2:{
        height:'100%',
        width:'100%',
    },
    sectionbtn:{
        alignItems: "center",
        height:'50%',
        marginTop:'10%',
        marginBottom:'10%'
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
        color: "white",
        textAlign: "center",
        fontSize: 14,

    },
    // modalContent:{
    //     // width:'90%',  
    //     // height:'90%',
    // },
  
    modalcontent: {
        marginTop: 200,
        padding: 20,
        width: '100%',
        height: '100%',
        backgroundColor:'#fafafa',
        borderRadius:25
    },
    modif:{
        backgroundColor:'white',
        padding:15,
        textAlign:'center',
        borderRadius:25,
        fontSize:18,
        marginBottom:20

    },
    modif1:{
        padding:15,
        textAlign:'center',
        borderRadius:25,
        fontSize:12,
        marginBottom:10

    },
    input: {
        width: "100%",
        color: "black",
        borderRadius: 25,
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        fontFamily: "muli",
        marginBottom: 20,
        backgroundColor:'#cccccc35',
        textAlign:'center'
        
    },
    confirm2:{
        flex:1,
        flexDirection:'row',
        marginTop:'2%'
    },
    button3: {
        width: '30%',
        backgroundColor: "red",
        color: "red",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom:15,
        margin:'3%',
        height:50,
        justifyContent:'center'
    },
    button4: {
        width: '60%',
        backgroundColor: "#2E3682",
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom:15,
        margin:'3%',
        height:50,
        justifyContent:'center'
    },
  
});

const mapStateToProps=(state)=>{
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Profil)