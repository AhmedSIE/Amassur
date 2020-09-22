import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,Dimensions} from 'react-native';
import {Container} from 'native-base';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from '../../../AppLoading';



class TarifMoto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            resourcePath: '' ,
            etape:1,
            immatriculation:'',
            marque:'',
            modele:'',
            age:'',
            stage:'',
            ville:'',
            modestationnement:'',
            offre:'',
            compagnie:'',
            modepayement:'',

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

    premier= () => {
        if (this.state.immatriculation!='' && this.state.marque!='' && 
        this.state.modele!='' 
        // && this.state.resourcePath!=''
        ) {
            this.setState({etape:2})   
        } else {
            alert('Champs incomplets')
        }
    }
    deuxieme= () => {
        if (this.state.age!='' && this.state.stage!='' && 
        this.state.ville!='' && this.state.modestationnement!='') {
            this.setState({etape:3})   
        } else {
            alert('Champs incomplets')
        }
    }

    confirme= () => {this.setState({etape:4})}
    non=() => {this.props.navigation.navigate('Accueil');}

    immatriculation(text){this.setState({immatriculation:text})}
    mamarque(text){this.setState({marque:text})}
    monmodele(text){this.setState({modele:text})}
    age(text){this.setState({age:text})}
    stage(text){this.setState({stage:text})}
    ville(text){this.setState({ville:text})}
    modestationnement(text){this.setState({modestationnement:text})}
    offre(text){this.setState({offre:text})}
    compagnie(text){this.setState({compagnie:text})}
    modepayement(text){this.setState({modepayement:text})}

    valider = async() => {
        this.setState({ loading: true })
        await fetch('http://192.168.1.123:8000/api/assurances/assuranceMoto/save',{
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
                "ville":this.state.ville,
                "stage":this.state.stage,
                "modestationnement":this.state.modestationnement,
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
                        <AppLoading titreMessage='Traitement en cours ...'/>
                    ):(
                        <Container style={{flex:1}}>
                            <ScrollView>
                                {
                                    this.state.etape == 1 ? (
                                        <View style={styles.section1}>
                                            <Text style={styles.entete2}>Immatriculation de</Text>
                                            <Text style={styles.entete}>ma moto</Text>
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
                                                    placeholder="Marque de la moto"
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
                                            <Text style={styles.entete}>Le conducteur</Text>
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
                                                    placeholder="Indiquer si "
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    onChangeText={(text)=>this.stage(text)}
                                                />
                                                <TextInput
                                                    placeholder="Votre ville de stationnement"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.ville(text)}
                                                />
                                                <TextInput
                                                    placeholder="Mode de stationnement"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.modestationnement(text)}
                                                />
                                            </View>
                                            <View style={styles.center}> 
                                                <TouchableOpacity onPress={() => this.deuxieme()} style={styles.button}>
                                                    <Text style={styles.textButton}>Suivant</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ):this.state.etape == 3 ?(
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
                                {
                                    this.state.etape==1 ?(
                                        <View style={styles.compteur}>
                                            <Text style={styles.compt1}>1</Text>
                                            <Text style={styles.compt}>2</Text>
                                            <Text style={styles.compt}>3</Text>
                                            <Text style={styles.compt}>4</Text>
                                        </View>

                                    ): this.state.etape == 2 ?(
                                        <View style={styles.compteur}>
                                            <TouchableOpacity style={styles.compt3} onPress={()=>this.setState({etape:1})}>
                                                <Text style={styles.compt2}>1</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.compt1}>2</Text>
                                            <Text style={styles.compt}>3</Text>
                                            <Text style={styles.compt}>4</Text>
                                        </View>

                                    ):this.state.etape == 3 ?(
                                        <View style={styles.compteur}>
                                            <TouchableOpacity onPress={()=>this.setState({etape:1})}>
                                                <Text style={styles.compt2}>1</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.setState({etape:2})}>
                                                <Text style={styles.compt2}>2</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.compt1}>3</Text>
                                            <Text style={styles.compt}>4</Text>
                                        </View>
                                    ):(
                                        <View style={styles.compteur}>
                                            <TouchableOpacity onPress={()=>this.setState({etape:1})}>
                                                <Text style={styles.compt2}>1</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.setState({etape:2})}>
                                                <Text style={styles.compt2}>2</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.setState({etape:3})}>
                                                <Text style={styles.compt2}>3</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.compt1}>4</Text>
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
        fontSize:20,

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
        color:'black',
        fontWeight:'bold',
        fontSize:20,

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
        height:50, 
    },
    image1:{
        height:200,
        minWidth:200,
        marginBottom:20
    },
    cartgrise:{
        alignItems:'center',
        backgroundColor:'#eff0f1'
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
    compteur:{
        flex:1,
        flexDirection:'row',
        paddingBottom:20,
        alignItems:'center',
        justifyContent:'center',
    },
    compt:{
        borderColor:'black',
        backgroundColor:'#eff0f1',
        margin:10,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        fontSize:10,
        borderRadius:100,
    },
    compt1:{
        borderColor:'black',
        backgroundColor:'red',
        margin:10,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        fontSize:10,
        borderRadius:100,
        color:'white'
    },
    compt2:{
        borderColor:'black',
        backgroundColor:'#2E3682',
        margin:10,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        fontSize:10,
        borderRadius:100,
        color:'white'
    },
   
});

const mapStateToProps=(state)=>{
    return {
        users:state.users
    }
}
export default connect(mapStateToProps)(TarifMoto)