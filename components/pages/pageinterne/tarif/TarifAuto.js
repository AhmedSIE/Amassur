import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import {Container,Icon,Picker, Form, DatePicker, Separator, ListItem, Right, Left} from 'native-base';
import { Modal, TextInput } from 'react-native-paper';
import {connect} from 'react-redux';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from '../../../AppLoading';

class TarifAuto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type:'',
            puissance:'',
            valeur:'',
            datecirculation:'',
            ville:'',
            actudate : new Date(),
            modalVisible:false,
            tariftoutrisque:[],
            tarifsimple:[]
        };
    }

  
    valide= () => {
        if (this.state.type!='' && this.state.puissance!='' && 
        this.state.valeur!='' && this.state.datecirculation!=''  && this.state.ville!=''
        ) {
            this.valider();   
        } else {
            alert('Champs incomplets')
        }
    }
    
    non=()=>{
        this.props.navigation.navigate('Accueil');
    }

    onValuetype(value: string) {this.setState({ville: value});}
    onValuetype2(value: string) {this.setState({type: value});}
    onChangeDate=(date)=> {this.setState({datecirculation:date})}   
    puissance=(text)=> {this.setState({puissance:text})}   
    valeur=(text)=> {this.setState({valeur:text})}   
  
    valider = async() => {
        const madate = this.state.datecirculation.getFullYear() + "-" + (this.state.datecirculation.getMonth() + 1) + "-" + this.state.datecirculation.getDate()
        this.setState({ loading: true })
        await fetch('http://192.168.1.123:8000/api/assurances/tarifauto',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "type":this.state.type,
                "valeur":this.state.valeur,
                "puissance":this.state.puissance,
                "ville":this.state.ville,
                "datecirculation":madate,
            })
        }).then(res=>res.json())
        .then((resData) => {
            this.setState({ 
                loading: false,
                modalVisible:true,
                tariftoutrisque:resData.tariftoutrisque,
                tarifsimple:resData.tarifsimple
             })
            console.log(resData.tariftoutrisque)
        })
        .catch((e) =>{
            this.setState({ loading: false })
            console.log(e)
            alert("Problème de connexion, veuillez réessayer plus tard ! ")
        });


    };

    tarif=()=>{
        if (this.state.tarifsimple.length > 0 || this.state.tariftoutrisque.length > 0) {
            return (
                <View style={{flex:1}}>
                    {
                       this.state.tarifsimple.length>0 ? (
                        <View>
                            <Separator bordered>
                                <Text>Garantie au tiers</Text>
                            </Separator>
                            <FlatList
                                data={this.state.tarifsimple}
                                renderItem={
                                ({item})=>
                                <ListItem>
                                    <Text>{item.assureur}</Text>
                                    <Text>{item.frais}</Text>
                                </ListItem>
                                }
                            />
                        </View>
                       ):(
                         <View></View>  
                       )
                    }
                    {
                       this.state.tariftoutrisque.length>0 ? (
                        <View>
                            <Separator bordered>
                                <Text>Tous risques</Text>
                            </Separator>
                            <FlatList
                                data={this.state.tariftoutrisque}
                                renderItem={
                                ({item})=>
                                <ListItem>
                                    <Left><Text>{item.assureur}</Text></Left>
                                    <Right><Text>{item.frais}</Text></Right>
                                </ListItem>
                                }
                            />
                        </View>
                       ):(
                         <View></View>  
                       )
                    }
                </View>
            )     
        } else {
            return (
                <View style={styles.aucun}> 
                    <Text>Aucun tarif disponible pour cette catégorie !</Text>
                </View>
            )
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage='Traitement en cours ...'/>
                    ):(
                        <View style={{flex:1}}>
                            <ScrollView>
                                {
                                    <View style={styles.section1}>
                                        <Text style={styles.entete2}>Tarif de</Text>
                                        <Text style={styles.entete}>mon véhicule</Text>
                                        <View style={styles.container}>
                                            <Form style={styles.form}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    headerStyle={{ backgroundColor: "#b95dd3" }}
                                                    headerBackButtonTextStyle={{ color: "#fff" }}
                                                    headerTitleStyle={{ color: "#fff" }}
                                                    selectedValue={this.state.ville}
                                                    onValueChange={this.onValuetype.bind(this)}
                                                    value={this.state.ville}
                                                >
                                                    <Picker.Item label="Ville de stationnement" />
                                                    <Picker.Item label="Ouagadougou" value="Ouagadougou" />
                                                    <Picker.Item label="Autre" value="Autre" />
                                                </Picker>
                                            </Form>
                                            <Form style={styles.form}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    headerStyle={{ backgroundColor: "#b95dd3" }}
                                                    headerBackButtonTextStyle={{ color: "#fff" }}
                                                    headerTitleStyle={{ color: "#fff" }}
                                                    selectedValue={this.state.type}
                                                    onValueChange={this.onValuetype2.bind(this)}
                                                    value={this.state.type}
                                                >
                                                    <Picker.Item label="Type de véhicule" />
                                                    <Picker.Item label="Voiture" value="Voiture" />
                                                    <Picker.Item label="Pickup" value="Pickup" />
                                                    <Picker.Item label="Camionnette" value="Camionnette" />
                                                    <Picker.Item label="Camion" value="Camion" />
                                                </Picker>
                                            </Form>
                                            <View style={styles.date}
>
                                                <DatePicker

                                                    defaultDate={new Date(2018, 4, 4)}
                                                    minimumDate={new Date(2000, 1, 1)}
                                                    maximumDate={new Date(this.state.actudate)}
                                                    locale={"fr"}
                                                    timeZoneOffsetInMinutes={undefined}
                                                    modalTransparent={false}
                                                    animationType={"fade"}
                                                    androidMode={"default"}
                                                    placeHolderText="Date de mise en circulation"
                                                    onDateChange={(date)=>this.onChangeDate(date)}
                                                    disabled={false}
                                                    value={this.state.datecirculation}
                                                    />
                                            </View>
                                            <TextInput
                                                keyboardType='phone-pad'
                                                placeholder="Nombre de chevaux (ch)"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                value={this.state.puissance}
                                                onChangeText={(text)=>this.puissance(text)}
                                            />
                                            <TextInput
                                                keyboardType='phone-pad'
                                                placeholder="Valeur du véhicule en F CFA"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                value={this.state.valeur}
                                                onChangeText={(text)=>this.valeur(text)}
                                            />
                                        </View>
                                        <View style={styles.center}>
                                            <TouchableOpacity onPress={() => this.valide()} style={styles.button}>
                                                <Text style={styles.textButton}>Valider</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </ScrollView>
                            <Modal
                                animationType = {"slide"}
                                transparent={false}
                                visible={this.state.modalVisible}
                                >
                                <ScrollView style={styles.scroll}>
                                    <View style={styles.modalcontent}>
                                        {this.tarif()}
                                        <View style={styles.confirm2}>
                                            <TouchableOpacity onPress={() => this.non()} style={styles.butto}>
                                                <Text style={styles.textButton}>Fermer</Text>
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
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    section1:{
        paddingTop:20
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
    form: {
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
    date: {
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
    butto: {
        width: '92%',
        backgroundColor: "red",
        color: "red",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom:15,
        margin:'4%',
        height:50,
        justifyContent:'center'
    },
    scroll:{
        backgroundColor:'white',
        margin: 10,
    },
    aucun:{
        flex:1,
        paddingTop:40,
        paddingLeft:25,
        paddingRight:25,
        alignItems:'center',
        justifyContent:'center',
    }
   
});

const mapStateToProps=(state)=>{
    return {
        users:state.users
    }
}
export default connect(mapStateToProps)(TarifAuto)