import React,{Fragment} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,} from 'react-native';
import {Container,Tabs,Tab} from 'native-base';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';

class AssuranceMaison extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            etape:1,
            select1:false,
            select2:false,
            select3:false,
            nombrehabitant:'',
            nombrenfant:'',
            valeurelectronique:'',
            valeurmobilier:'',
            bienprecieux:'',
            stockagemarchandise:'',
            nombrepiece:'',
            ville:'',
            statut:'proprietaire',
            bienconcerne:'',
        };
    }
    
    premier= () => {
        if (this.state.nombrepiece!='' && this.state.ville!='' && this.state.statut!='' &&
        (this.state.select1!=false || this.state.select1!=false || this.state.select1!=false)) {
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
    nombrehabitant(text){this.setState({nombrehabitant:text})}
    nombrenfant(text){this.setState({nombrenfant:text})}
    valeurelectronique(text){this.setState({valeurelectronique:text})}
    valeurmobilier(text){this.setState({valeurmobilier:text})}
    bienprecieux(text){this.setState({bienprecieux:text})}
    stockagemarchandise(text){this.setState({stockagemarchandise:text})}
    nombrepiece(text){this.setState({nombrepiece:text})}
    ville(text){this.setState({ville:text})}
    statut(text){this.setState({statut:text})}
    non=()=>{
        this.props.navigation.navigate('Accueil');
    }
    render(){
        const {select1,select2,select3} = this.state
        return(
            <Container style={{flex:1}}>
                <ScrollView>
                    {
                        this.state.etape == 1 ? (
                            <View style={styles.section1}>
                                <Text style={styles.entete2}>Mon logement</Text>
                                <Text style={styles.entete}> principal</Text>
                                <View style={styles.imagecontain}>
                                    <View style={styles.imagecontainer}>
                                        <Image style={styles.image} source={require('./../../../../assets/images/icone_House.png')}/>
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.ent}>Vous êtes :</Text>     
                                    <Tabs 
                                        tabBarUnderlineStyle={{ backgroundColor: "transparent" }}
                                        tabContainerStyle={{backgroundColor:'transparent',elevation:0}}
                                        onChangeTab={({ ref }) => this.statut( ref.props.heading)}                                        
                                        >
                                        <Tab 
                                            tabStyle={styles.tabs}
                                            textStyle={{color:'black'}}
                                            activeTabStyle={styles.tabsactive}
                                            style={styles.none}
                                            heading="Propriétaire"
                                            onPress={()=>this.proprietaire()}
                                            
                                        ><Text></Text></Tab>
                                        <Tab 
                                            tabStyle={styles.tabs}
                                            textStyle={{color:'black'}}
                                            activeTabStyle={styles.tabsactive}
                                            heading="Locataire"
                                        ><Text></Text></Tab>
                                    </Tabs>
                                    <Text style={styles.ent}>Votre bien concerne :</Text>     
                                    <Tabs 
                                        tabBarUnderlineStyle={{ backgroundColor: "transparent" }}
                                        tabContainerStyle={{backgroundColor:'transparent',elevation:0}}
                                        >
                                        <Tab 
                                            tabStyle={styles.tabs}
                                            textStyle={{color:'black'}}
                                            activeTabStyle={styles.tabsactive}
                                            style={styles.none}
                                            heading="Appartement"
                                            >
                                            <View style={styles.item} >
                                                <CheckBox checked={select3} color="#2E3682" onPress={()=>this.setState({select3:!select3,select1:false,select2:false})}/>
                                                <Text style={
                                                {...styles.checkBoxTxt,
                                                    color:this.state.select3?"#2E3682":"gray",
                                                    fontWeight:this.state.select3? "bold" :"normal"
                                                }}
                                                >Je déclare habiter au rez de chaussée de mon immeuble</Text>
                                            </View>
                                        </Tab>
                                        <Tab 
                                            tabStyle={styles.tabs}
                                            textStyle={{color:'black'}}
                                            activeTabStyle={styles.tabsactive}
                                            heading="Maison"
                                        >
                                            <View style={styles.item} >
                                                <CheckBox checked={select1} color="#2E3682" onPress={()=>this.setState({select1:!select1,select3:false})}/>
                                                <Text style={
                                                {...styles.checkBoxTxt,
                                                    color:this.state.select1?"#2E3682":"gray",
                                                    fontWeight:this.state.select1? "bold" :"normal"
                                                }}
                                                >Je déclare avoir une dépendance de plus de 30m²</Text>
                                            </View>
                                            <View style={styles.item2} >
                                                <CheckBox checked={select2} color="#2E3682" onPress={()=>this.setState({select2:!select2,select3:false})}/>
                                                <Text style={
                                                {...styles.checkBoxTxt,
                                                    color:this.state.select2?"#2E3682":"gray",
                                                    fontWeight:this.state.select2? "bold" :"normal"
                                                }}
                                                >Je déclare avoir une véranda extérieur à ma maison</Text>
                                            </View>
                                        </Tab>
                                    </Tabs>
                                    <TextInput
                                        keyboardType='phone-pad'
                                        placeholder="Nombre de pièce"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                        onChangeText={(text)=>this.nombrepiece(text)}

                                    />
                                     <TextInput
                                        placeholder="Ville du logement"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                        onChangeText={(text)=>this.ville(text)}
                                    />
                                </View>
                                <View style={styles.center}>
                                    <TouchableOpacity onPress={() => this.premier()} style={styles.button}>
                                        <Text style={styles.textButton}>Suivant</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ): this.state.etape == 2 ? (
                            <View style={styles.section}>
                                 <Text style={styles.entete}>Personnes</Text>
                                <View style={styles.container}>
                                    <TextInput
                                        keyboardType='phone-pad'
                                        placeholder="Nombre d'habitants"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                        onPress={(text)=>this.nombrehabitant(text)}
                                    />
                                    <TextInput
                                        keyboardType='phone-pad'
                                        placeholder="Nombre d'enfants"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                        onPress={(text)=>this.nombrenfant(text)}
                                    />
                                </View>
                                <View style={styles.center}> 
                                    <TouchableOpacity onPress={() => this.deuxieme()} style={styles.button}>
                                        <Text style={styles.textButton}>Suivant</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ): this.state.etape == 3 ?(
                            <View style={styles.section}>
                                 <Text style={styles.entete}>Biens</Text>
                                <View style={styles.container}>
                                    <TextInput
                                        keyboardType='phone-pad'
                                        placeholder="Estimer la valeur electronique"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                        onChangeText={(text)=>this.valeurelectronique(text)}
                                    />
                                    <TextInput
                                        keyboardType='phone-pad'
                                        placeholder="Estimer la valeur du mobiliers"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                        onChangeText={(text)=>this.valeurmobilier(text)}
                                    />
                                    <TextInput
                                        keyboardType='phone-pad'
                                        placeholder="Estimer les biens précieux"
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        autoCompleteType="tel"
                                        onChangeText={(text)=>this.bienprecieux(text)}
                                    />
                                    <TextInput
                                        placeholder="Indiquer si stockage de marchandises, ..."
                                        placeholderTextColor="#888"
                                        style={styles.input}
                                        returnKeyType="done"
                                        onChangeText={(text)=>this.stockagemarchandise(text)}
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
                                            // keyboardType='phone-pad'
                                            placeholder="Choisir la compagnie"
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
    ent:{
        marginBottom:10,
        fontWeight:'bold',
        fontSize:15,

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
    imagecontain:{
        alignItems:'center',
        justifyContent:'center',
    },
    imagecontainer:{
        height:120,
        width:120,
        backgroundColor:'#fafafa',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
    },
    image:{
        height:75,
        width:75, 
    },

    image1:{
        height:200,
        width:'auto',
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
    tabs:{
        backgroundColor:'#fafafa',
        borderRadius:100,
        textDecorationColor:'red',
        margin:5,
    },
    tabsactive:{
        backgroundColor:'#2E3682',
        borderRadius:100,
        margin:5,
    },
    item:{
        width:"80%",
        backgroundColor:"#fff",
        // borderRadius:20,
        marginTop:10,
        marginBottom:0,
        flexDirection:"row",
      },
    item2:{
        width:"80%",
        backgroundColor:"#fff",
        // borderRadius:20,
        marginTop:0,
        marginBottom:0,
        flexDirection:"row",
      },
      checkBoxTxt:{
        marginTop:5,
        paddingLeft:-10,
        fontSize:13
      },
});
export default AssuranceMaison