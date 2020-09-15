import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Container,Icon,Picker, Form,} from 'native-base';
import { TextInput } from 'react-native-paper';
import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from '../../../AppLoading';

class TarifAuto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false, etape:1,
            marque:'',
            marques:[],
            modele:'',
            age:'',
            ville:'',
            corporel:'',
            materiel:'',
            vol:'',
            brisGlace:'', 
        };
        this.marques();
        console.log(this.state.marques)
    }

    marques=async()=>{
        this.setState({ loading: true })
        await fetch('http://192.168.1.101:8000/api/auth/marques',{
            method:'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        }).then(res=>res.json())
        .then((resData) => {
            this.setState({ loading: false })
            let marques=resData
            AsyncStorage.setItem('marques',JSON.stringify(marques))
            this.marques();
        })
        .catch((e) =>{
            console.log(e);
            this.marques2();
        });
    }
    marques = async()=> {
        let marques = await AsyncStorage.getItem('marques');
        let parsed=   JSON.parse(marques);
        this.setState({marques: parsed});  
    }
    marques2 = async()=> {
        let marques = await AsyncStorage.getItem('marques');
        let parsed=   JSON.parse(marques);
        if (parsed) {
            this.setState({notifications: parsed});    
        } else {
           alert("Pas d'accès internet");
        }
    }
  
    premier= () => {
        if (this.state.marque!='' && this.state.ville!='' && 
        this.state.modele!='' && this.state.age!='') {
            this.setState({etape:2})   
        } else {
            alert('Champs incomplets')
        }
    }

    deuxieme= () => {
        if (this.state.corporel!='' && this.state.materiel!='' && 
        this.state.vol!='' && this.state.brisGlace!=''
        ) {
            this.valider();   
        } else {
            alert('Champs incomplets')
        }
    }
    
    non=()=>{
        this.props.navigation.navigate('Accueil');
    }

    onValuemarque(value: string) {this.setState({marque: value});}
    onValuemodele(value: string) {this.setState({modele: value});}
    onValueage(value: string) {this.setState({age: value});}
    onValueville(value: string) {this.setState({ville: value});}
    onValuecorporel(value: string) {this.setState({corporel: value});}
    onValuemateriel(value: string) {this.setState({materiel: value});}
    onValuevol(value: string) {this.setState({vol: value});}
    onValuebrisGlace(value: string) {this.setState({brisGlace: value});}
    
    valider = async() => {
        this.setState({ loading: true })
        await fetch('http://192.168.1.101:8000/api/assurances/assuranceAuto/save',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "marque":this.state.marque,
                "modele":this.state.modele,
                "age":this.state.age,
                "ville":this.state.ville,
                "corporel":this.state.corporel,
                "materiel":this.state.materiel,
                "vol":this.state.vol,
                "brisGlace":this.state.brisGlace,
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
                                            <Text style={styles.entete}>mon véhicule</Text>
                                            <View style={styles.container}>
                                                <Form style={styles.form}>
                                                    <Picker
                                                        mode="dropdown"
                                                        iosIcon={<Icon name="arrow-down" />}
                                                        headerStyle={{ backgroundColor: "#b95dd3" }}
                                                        headerBackButtonTextStyle={{ color: "#fff" }}
                                                        headerTitleStyle={{ color: "#fff" }}
                                                        selectedValue={this.state.marque}
                                                        onValueChange={this.onValuemarque.bind(this)}
                                                        value={this.state.marque}
                                                    >
                                                        <Picker.Item label="Marque" />
                                                        <Picker.Item label="BMW" value="BMW" />
                                                        <Picker.Item label="Bugatti" value="Bugatti" />
                                                        <Picker.Item label="Chevrolet" value="Chevrolet" />
                                                        <Picker.Item label="Régimes spéciaux" value="Régimes spéciaux" />
                                                    </Picker>
                                                </Form>
                                                <TextInput
                                                    placeholder="Modèle"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    value={this.state.modele}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.monmodele(text)}
                                                />
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Votre âge (ex:30)"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    value={this.state.age}
                                                    onChangeText={(text)=>this.age(text)}
                                                />
                                                <TextInput
                                                    placeholder="Ma ville de stationnement"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    value={this.state.ville}
                                                    onChangeText={(text)=>this.ville(text)}
                                                />
                                            </View>
                                            <View style={styles.center}>
                                                <TouchableOpacity onPress={() => this.premier()} style={styles.button}>
                                                    <Text style={styles.textButton}>Suivant</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ):(
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
                                                    value={this.state.corporel}
                                                    onChangeText={(text)=>this.corporel(text)}
                                                />
                                                

                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Matériel"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    value={this.state.materiel}
                                                    onChangeText={(text)=>this.materiel(text)}
                                                />
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Vol"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    autoCompleteType="tel"
                                                    value={this.state.vol}
                                                    onChangeText={(text)=>this.vol(text)}
                                                />
                                                <TextInput
                                                    placeholder="Bris de glace"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    value={this.state.brisGlace}
                                                    onChangeText={(text)=>this.brisGlace(text)}
                                                />
                                            </View>
                                            <View style={styles.confirm}>
                                                <TouchableOpacity onPress={() => this.non()} style={styles.button3}>
                                                    <Text style={styles.textButton}>Annuler</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.deuxieme()} style={styles.button4}>
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
                                        </View>

                                    ):(
                                        <View style={styles.compteur}>
                                            <TouchableOpacity style={styles.compt3} onPress={()=>this.setState({etape:1})}>
                                                <Text style={styles.compt2}>1</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.compt1}>2</Text>
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
        color:'black',
        fontWeight:'bold',
        fontSize:20,

    },
    sousent:{
        fontSize: 12,
        paddingLeft:20,
        paddingRight:20,
        color:'red'
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
        backgroundColor:'#eff0f1',
    },
    confirm:{
        flex:1,
        flexDirection:'row',
        padding:'0%',
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
        width: '58%',
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
        paddingBottom:5,
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
export default connect(mapStateToProps)(TarifAuto)