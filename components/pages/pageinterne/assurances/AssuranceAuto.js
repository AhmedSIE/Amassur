import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Container} from 'native-base';
import { TextInput } from 'react-native-paper';
import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from '../../../AppLoading';



class AssuranceAuto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false, resourcePath: '' , resourcePathPermis:'', etape:1, immatriculation:'',
            marque:'', modele:'', age:'', agepermis:'', ville:'', corporel:'', materiel:'', vol:'',
            brisGlace:'', offre:'', compagnie:'', modepayement:'',
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
                this.setState({resourcePath: source.data,});
            }
        });
    };
    selectFile2 = () => {
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
                this.setState({resourcePathPermis: source.data,});
            }
        });
    };
    premier= () => {
        if (this.state.immatriculation!='' && this.state.marque!='' && 
        this.state.modele!=''
        //  && this.state.resourcePath!=''
         ) {
            this.setState({etape:2})   
        } else {
            alert('Champs incomplets')
        }
    }
    deuxieme= () => {
        if (this.state.age!='' && this.state.agepermis!='' && 
        this.state.ville!='' 
        // && this.state.resourcePathPermis!=''
        ) {
            this.setState({etape:3})   
        } else {
            alert('Champs incomplets')
        }
    }
    troisieme= () => {
        if (this.state.corporel!='' && this.state.materiel!='' && 
        this.state.vol!='' && this.state.brisGlace!='') {
            this.setState({etape:4})   
        } else {
            alert('Champs incomplets')
        }
    }
    non=()=>{
        this.props.navigation.navigate('Accueil');
    }
    confirme=()=>{
        this.setState({etape:5});
    }
    immatriculation(text){this.setState({immatriculation:text})}
    mamarque(text){this.setState({marque:text})}
    monmodele(text){this.setState({modele:text})}
    age(text){this.setState({age:text})}
    agepermis(text){this.setState({agepermis:text})}
    ville(text){this.setState({ville:text})}
    corporel(text){this.setState({corporel:text})}
    materiel(text){this.setState({materiel:text})}
    vol(text){this.setState({vol:text})}
    brisGlace(text){this.setState({brisGlace:text})}
    offre(text){this.setState({offre:text})}
    compagnie(text){this.setState({compagnie:text})}
    modepayement(text){this.setState({modepayement:text})}
    
    valider = async() => {
        this.setState({ loading: true })
        await fetch('http://192.168.1.120:8000/api/assurances/assuranceAuto/save',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "token":this.props.users.token,
                "immatriculation" : this.state.immatriculation,
                "marque":this.state.marque,
                "modele":this.state.modele,
                "carteGriseImage":this.state.resourcePath,
                "age":this.state.age,
                "agepermis":this.state.agepermis,
                "ville":this.state.ville,
                "permisEnImage":this.state.resourcePathPermis,
                "corporel":this.state.corporel,
                "materiel":this.state.materiel,
                "vol":this.state.vol,
                "brisGlace":this.state.brisGlace,
                "offre":this.state.offre,
                "compagnie":this.state.compagnie,
                "modepayement":this.state.modepayement,
            })
        }).then(res=>res.json())
        .then((resData) => {
            this.setState({ loading: false })
            alert(resData);
            console.log(resData)
            this.props.navigation.navigate("Accueil");
        })
        .catch((e) =>{
            this.setState({ loading: false })
            console.log(e)
            alert("Erreur d'enregistrment, veuillez réessayer plus tard ! ")
        });


    };
    render(){
        return(
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading/>
                    ):(
                        <Container style={{flex:1}}>
                            <ScrollView>
                                {
                                    this.state.etape == 1 ? (
                                        <View style={styles.section1}>
                                            <Text style={styles.entete2}>Immatriculation de</Text>
                                            <Text style={styles.entete}>mon véhicule</Text>
                                            <View style={styles.container}>
                                                <TextInput
                                                    placeholder="Immatriculation"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    onChangeText={(text)=>this.immatriculation(text)}
                                                />
                                                <TextInput
                                                    placeholder="Marque du véhicule"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    onChangeText={(text)=>this.mamarque(text)}
                                                />
                                                <TextInput
                                                    placeholder="Modèle"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.monmodele(text)}
                                                />
                                                <View style={styles.cartgrise}>
                                                    <TouchableOpacity onPress={this.selectFile}>
                                                        {
                                                            this.state.resourcePath !='' ? (
                                                                <View>
                                                                    <Text style={styles.entete4}>Modifier</Text>
                                                                    <Image
                                                                        source={{
                                                                        uri: 'data:image/jpeg;base64,' + this.state.resourcePath,
                                                                        }}
                                                                        style={styles.image1}
                                                                    />
                                                                </View>
                                                            ):(
                                                                <View>
                                                                    <Text style={styles.entete3}>Importer la carte grise(image)</Text>
                                                                    <Image
                                                                        source={{
                                                                        uri: 'data:image/jpeg;base64,' + this.state.resourcePath,
                                                                        }}
                                                                    />
                                                                </View>
                                                            )
                                                        }
                                                    </TouchableOpacity>       
                                                </View>
                                            </View>
                                            <View style={styles.center}>
                                                <TouchableOpacity onPress={() => this.premier()} style={styles.button}>
                                                    <Text style={styles.textButton}>Suivant</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ): this.state.etape == 2 ? (
                                        <View style={styles.section}>
                                            <Text style={styles.entete}>Mon permis</Text>
                                            <View style={styles.container}>
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Votre âge (ex:30)"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    onChangeText={(text)=>this.age(text)}
                                                />
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Age d'obtention du permis"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    onChangeText={(text)=>this.agepermis(text)}
                                                />
                                                <TextInput
                                                    placeholder="Ma ville de stationnement"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.ville(text)}
                                                />
                                                <View style={styles.cartgrise}>
                                                    <TouchableOpacity onPress={this.selectFile2}>
                                                        {
                                                            this.state.resourcePathPermis !='' ? (
                                                                <View>
                                                                    <Text style={styles.entete4}>Modifier</Text>
                                                                    <Image
                                                                        source={{
                                                                        uri: 'data:image/jpeg;base64,' + this.state.resourcePathPermis,
                                                                        }}
                                                                        style={styles.image1}
                                                                    />
                                                                </View>
                                                            ):(
                                                                <View>
                                                                    <Text style={styles.entete3}>Importer le permis(Image)</Text>
                                                                    <Image
                                                                        source={{
                                                                        uri: 'data:image/jpeg;base64,' + this.state.resourcePathPermis,
                                                                        }}
                                                                    />
                                                                </View>
                                                            )
                                                        }
                                                        
                                                    </TouchableOpacity>       
                                                </View>
                                            </View>
                                            <View style={styles.center}> 
                                                <TouchableOpacity onPress={() => this.deuxieme()} style={styles.button}>
                                                    <Text style={styles.textButton}>Suivant</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ): this.state.etape == 3 ?(
                                        <View style={styles.section}>
                                            <Text style={styles.entete}>Mes sinistres</Text>
                                            <Text style={styles.sousent}>Avec responsabilité engagée totalement 
                                                ou partiellemet, durant les 36 derniers mois:</Text>
                                            <View style={styles.container}>
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Corporel"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    onChangeText={(text)=>this.corporel(text)}
                                                />
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Matériel"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    onChangeText={(text)=>this.materiel(text)}
                                                />
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Vol"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    onChangeText={(text)=>this.vol(text)}
                                                />
                                                <TextInput
                                                    placeholder="Bris de glace"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.brisGlace(text)}
                                                />
                                            </View>
                                            <View style={styles.center}>
                                                <TouchableOpacity onPress={() => this.troisieme()} style={styles.button}>
                                                    <Text style={styles.textButton}>Suivant</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ): this.state.etape == 4 ?(
                                        <View style={styles.section}>
                                            <Text style={styles.entete2}>Mon histoire avec</Text>
                                            <Text style={styles.entete}>la route et l'assurance</Text>
                                            <View style={styles.center}> 
                                                <View style={styles.secticon}>
                                                    <FontAwesome name="history" style={styles.icon}/>
                                                </View>
                                                <Text style={styles.corptext}>Je déclare ne pas avoir été condamné
                                                à l'une des infractions ou avoir fait l'objet de l'une des mesures
                                                d'exclusion prévues par le produit d'Amassur durant ces 3 dernières années</Text>
                                            </View>
                                            <View style={styles.center}>
                                                <TouchableOpacity onPress={() => this.troisieme()} style={styles.button2}>
                                                    <Text style={styles.textButton2}>Voir le détail</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.confirm}>
                                                <TouchableOpacity onPress={() => this.non()} style={styles.button3}>
                                                    <Text style={styles.textButton}>Non</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.confirme()} style={styles.button4}>
                                                    <Text style={styles.textButton}>Je confirme</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ):(
                                        <View style={styles.section}>
                                            <Text style={styles.entete2}>Choisir Offre</Text>
                                            <Text style={styles.entete}>Compagnie</Text>
                                            <View style={styles.container}>
                                                <TextInput
                                                        keyboardType='phone-pad'
                                                        placeholder="Choisir l'offres"
                                                        placeholderTextColor="#888"
                                                        style={styles.input}
                                                        returnKeyType="done"
                                                        autoCompleteType="tel"
                                                        onChangeText={(text)=>this.offre(text)}
                                                    />
                                                <TextInput
                                                        // keyboardType='phone-pad'
                                                        placeholder="Choisir la compagnie"
                                                        placeholderTextColor="#888"
                                                        style={styles.input}
                                                        returnKeyType="done"
                                                        autoCompleteType="tel"
                                                        onChangeText={(text)=>this.compagnie(text)}
                                                    />
                                                <TextInput
                                                        keyboardType='phone-pad'
                                                        placeholder="Choisir le mode de payement"
                                                        placeholderTextColor="#888"
                                                        style={styles.input}
                                                        returnKeyType="done"
                                                        autoCompleteType="tel"
                                                        onChangeText={(text)=>this.modepayement(text)}
                                                    />
                                            </View>
                                            <View style={styles.confirm2}>
                                                <TouchableOpacity onPress={() => this.non()} style={styles.button3}>
                                                    <Text style={styles.textButton}>Annuler</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.valider()} style={styles.button4}>
                                                    <Text style={styles.textButton}>Valider</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>   
                                    )
                                }
                            </ScrollView>
                        </Container>
                    )
                } 
            </View>
        );
    }

}
const styles=StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    entete:{
        marginLeft:20,
        marginTop:0,
        marginBottom:10,
        // textAlign:'center',
        color:'#2E3682',
        fontWeight:'bold',
        fontSize:28,

    },
    entete1:{
        marginLeft:20,
        marginTop:0,
        marginBottom:10,
        color:'#2E3682',
        fontWeight:'bold',
        fontSize:25,

    },
    entete3:{
        color:'#2E3682',
        fontWeight:'bold',
        padding:20,
        fontSize:14,

    },
    entete4:{
        marginTop:0,
        marginBottom:10,
        color:'#2E3682',
        fontWeight:'bold',
        padding:5,
        fontSize:14,
        textAlign:'center'

    },
    entete2:{
        marginLeft:20,
        marginTop:0,
        marginBottom:0,
        // textAlign:'center',
        color:'black',
        fontWeight:'bold',
        fontSize:28,

    },
    sousent:{
        fontSize: 12,
        paddingLeft:20,
        paddingRight:20,
    },
    corptext:{
        fontSize: 12,
        padding:20,
        lineHeight:18,        
    },
    container:{
        padding:20
    },
    input: {
        width: "100%",
        color: "black",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        fontFamily: "muli",
        marginBottom: 15,
        backgroundColor:'#cccccc35',
        
    },
    image1:{
        height:200,
        minWidth:200,
        marginBottom:20
    },
    cartgrise:{
        alignItems:'center',
        backgroundColor:'#eff0f1',
    },
    confirm:{
        flex:1,
        flexDirection:'row',
        padding:'5%',
        marginTop:'10%'
    },
    confirm2:{
        flex:1,
        flexDirection:'row',
        padding:'5%',
        marginTop:'5%'
    },
    button: {
        width: 250,
        backgroundColor: "#2E3682",
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom:15,
    },
    button2: {
        width:'90%',
        backgroundColor: "#fafafa",
        color: "#2E3682",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom:15,
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
    },
    textButton: {
        fontFamily: "muli",
        color: "white",
        textAlign: "center",

    },
    textButton2: {
        fontFamily: "muli",
        color: "#2E3682",
        textAlign: "center",

    },
    secticon:{
        height:100,
        width:100,
        borderRadius:100,
        backgroundColor:'#fafafa',
        alignItems:'center',
        justifyContent:'center',
    },
    icon:{
        color:'#2E3682',
        fontSize:50,
    },
   
});

const mapStateToProps=(state)=>{
    return {
        users:state.users
    }
}
export default connect(mapStateToProps)(AssuranceAuto)