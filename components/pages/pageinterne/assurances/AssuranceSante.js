import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,Dimensions} from 'react-native';
import {Container} from 'native-base';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class AssuranceSante extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            resourcePathProfil: '' ,
            etape:1,
            age:'',
            ville:'',
            nom:'',
            prenom:'',
            prosession:'',

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
                this.setState({resourcePathProfil: source.data,});
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
        if (this.state.nom!='' && this.state.prenom!='' && 
        this.state.age!='' && this.state.resourcePathProfil!='') {
            this.setState({etape:2})   
        } else {
            alert('Champs incomplets')
        }
    }
    deuxieme= () => {
        if (this.state.age!='' && this.state.agepermis!='' && 
        this.state.ville!='' && this.state.resourcePathPermis!='') {
            this.setState({etape:3})   
        } else {
            alert('Champs incomplets')
        }
    }
    troisieme= () => {
        if (this.state.immatriculation!='' && this.state.marque!='' && 
        this.state.modele!='' && this.state.resourcePath!='') {
            alert('1')
            this.setState({etape:4})   
        } else {
            alert('Champs incomplets')
        }
    }
    non=()=>{
        this.props.navigation.navigate('Accueil');
    }
    
    age(text){this.setState({age:text})}
    profession(text){this.setState({profession:text})}
    nom(text){this.setState({nom:text})}
    prenom(text){this.setState({prenom:text})}
    ville(text){this.setState({ville:text})}

    
    render(){
        return(
            <Container style={{flex:1}}>
                <ScrollView>
                    {
                        this.state.etape == 1 ? (
                            <View style={styles.section1}>
                                <Text style={styles.entete2}>Informations</Text>
                                <Text style={styles.entete}>Assuré principal</Text>
                                <View style={styles.container}>
                                    <TextInput
                                        placeholder="Nom"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                        onChangeText={(text)=>this.nom(text)}
                                    />
                                    <TextInput
                                        placeholder="Prénoms"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                        onChangeText={(text)=>this.prenom(text)}
                                    />
                                    <TextInput
                                        placeholder="Age"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        onChangeText={(text)=>this.age(text)}
                                    />
                                    <TextInput
                                        placeholder="Profession"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        onChangeText={(text)=>this.profession(text)}
                                    />
                                    <View style={styles.cartgrise}>
                                        <TouchableOpacity onPress={this.selectFile}>
                                            {
                                                this.state.resourcePathProfil !='' ? (
                                                    <View>
                                                        <Text style={styles.entete4}>Modifier</Text>
                                                        <Image
                                                            source={{
                                                            uri: 'data:image/jpeg;base64,' + this.state.resourcePathProfil,
                                                            }}
                                                            style={styles.image1}
                                                        />
                                                    </View>
                                                ):(
                                                    <View>
                                                        <Text style={styles.entete3}>Photo de profil</Text>
                                                        <Image
                                                            source={{
                                                            uri: 'data:image/jpeg;base64,' + this.state.resourcePathProfil,
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
                                <Container style={styles.container}>
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
                                            <Text style={styles.entete1}>Permis en image</Text>
                                            <Image
                                                source={{
                                                uri: 'data:image/jpeg;base64,' + this.state.resourcePathPermis,
                                                }}
                                                style={styles.image1}
                                            />
                                        </TouchableOpacity>       
                                    </View>
                                </Container>
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
                                            onChangeText={(text)=>this.vol(text)}
                                        />
                                    <TextInput
                                            keyboardType='phone-pad'
                                            placeholder="Choisir le mode de payement"
                                            placeholderTextColor="#888"
                                            style={styles.input}
                                            returnKeyType="done"
                                            autoCompleteType="tel"
                                            onChangeText={(text)=>this.vol(text)}
                                        />
                                </View>
                                <View style={styles.confirm2}>
                                    <TouchableOpacity onPress={() => this.non()} style={styles.button3}>
                                        <Text style={styles.textButton}>Annuler</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.confirme()} style={styles.button4}>
                                        <Text style={styles.textButton}>Valider</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>   
                        )
                    }
                </ScrollView>
            </Container>
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
    entete2:{
        marginLeft:20,
        marginTop:0,
        marginBottom:0,
        // textAlign:'center',
        color:'black',
        fontWeight:'bold',
        fontSize:28,

    },
    entete3:{
        color:'#2E3682',
        fontWeight:'bold',
        padding:20,
        fontSize:16,

    },
    entete4:{
        marginTop:0,
        marginBottom:10,
        color:'#2E3682',
        fontWeight:'bold',
        padding:5,
        fontSize:14,

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
        borderWidth:1,
        alignItems:'center',
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
export default AssuranceSante