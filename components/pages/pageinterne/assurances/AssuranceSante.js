import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,} from 'react-native';
import {Container,Card,CardItem,Icon, Picker, Form,Button, List, ListItem,Body , Left,Right } from 'native-base';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from '../../../AppLoading';

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
            ville:'',
            email:'',
            telephone:'',
            nomconjoint:'',
            prenomconjoint:'',
            ageconjoint:'',
            selected: "",
            selectedfemme: "",
            selectedenfant: '',
            ageenfant:'',
            nomenfant:'',
            prenomenfant:'',
            enfants:[],
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
                this.setState({resourcePathProfil: source.data,});
            }
        });
    };

    premier= () => {
        if (this.state.nom!='' && this.state.prenom!='' && 
        this.state.age!='' && this.state.profession!=''
        // && this.state.resourcePathProfil!=''
        && this.state.email!=''  && this.state.telephone!=''
        ) {
            this.setState({etape:3})   
        } else {
            alert('Champs incomplets')
        }
    }

    non=()=>{this.props.navigation.navigate('Accueil');}
    
    age(text){this.setState({age:text})}
    nom(text){this.setState({nom:text})}
    prenom(text){this.setState({prenom:text})}
    ville(text){this.setState({ville:text})}
    email(text){this.setState({email:text})}
    telephone(text){this.setState({telephone:text})}
    
    confirme= () => {this.setState({etape:4})}
   
    onValueChange(value: string) {this.setState({selected: value});}
    onValueChange1(value: string) {this.setState({selectedfemme: value});}
    onValueChange2(value: string) {this.setState({selectedenfant: value});}

    nomconjoint(text){this.setState({nomconjoint:text});}
    prenomconjoint(text){this.setState({prenomconjoint:text});}
    ageconjoint(text){this.setState({ageconjoint:text});}

    nomenfant(value){this.setState({nomenfant: value});}
    prenomenfant(value){this.setState({prenomenfant: value}); }
    agenfant(value){this.setState({ageenfant: value});}

    vous(){this.setState({etape:11})}
    vousVotre(){this.setState({etape:21})}
    vousVotre2(){this.setState({etape:22})}
    vousVos(){this.setState({etape:31})}
    vousVos2(){this.setState({etape:32})}
    vousVotreVos(){this.setState({etape:41})}
    vousVotreVos1(){this.setState({etape:42})}
    vousVotreVos2(){this.setState({etape:43})}
    
    offre(text){this.setState({offre:text})}
    compagnie(text){this.setState({compagnie:text})}
    modepayement(text){this.setState({modepayement:text})}
    enfants(){
        // console.log(this.state.enfants)
        if (this.state.enfants.length>0) {
            return this.state.enfants.map((enfant) => (
                    <View>
                        <List>
                            <ListItem style={styles.listItem}>
                                <Text style={styles.enfant}>{enfant.nom}</Text>
                                <Text style={styles.enfant}>{enfant.prenom}</Text>       
                                <Text style={styles.enfant}>{enfant.age}</Text>
                                <Text style={styles.enfant}>{enfant.regime}</Text>
                            </ListItem>
                        </List>
                    </View>
                )
            ) 
        } 
    }
    ajouter=()=> {
        if (this.state.nomenfant!='' && this.state.prenomenfant!='' 
            && this.state.ageenfant!='' && this.state.selectedenfant!='') {
            this.setState({ 
                enfants:[
                    ...this.state.enfants,
                    {
                    nom:this.state.nomenfant,
                    prenom:this.state.prenomenfant,
                    age:this.state.ageenfant, 
                    regime:this.state.selectedenfant
                }] 
            });
           this.setState({
                nomenfant:'', 
                prenomenfant:'', 
                ageenfant:'', 
                selectedenfant:'', 
           });
        } else {
            alert('Tous les champs sont obligatoire !')
        }
    }

    valider = async() => {
        this.setState({ loading: true })
        await fetch('http://192.168.1.123:8000/api/assurances/assuranceSante/save',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "token":this.props.users.token,
                "nom" : this.state.nom,
                "prenom":this.state.prenom,
                "ville":this.state.ville,
                "email":this.state.email,
                "age":this.state.age,
                "ville":this.state.ville,
                "profil":this.state.resourcePathProfil,
                "telephone":this.state.telephone,
                "regimeobligatoire":this.state.selected,

                "nomconjoint":this.state.nomconjoint,
                "prenomconjoint":this.state.prenomconjoint,
                "ageconjoint":this.state.ageconjoint,
                "regimeobligatoirefemme":this.state.selectedfemme,

                "enfants":this.state.enfants,

                "offre":this.state.offre,
                "compagnie":this.state.compagnie,
                "modepayement":this.state.modepayement,
            })
        }).then(res=>res.json())
        .then((resData) => {
            this.setState({ loading: false })
            console.log(resData)
            alert(resData)
            this.props.navigation.navigate("Accueil");
        })
        .catch((e) =>{
            this.setState({ loading: false })
            console.log(e)
            alert("Erreur d'enregistrment, veuillez réessayer plus tard ! ")
            this.props.navigation.navigate("Accueil");
        });


    };


    render() {
        return(
            <View style={{flex:1}}>
                {
                    this.state.loading?(
                        <AppLoading titreMessage='Traitement en cours ...'/>
                    ):(
                        <Container style={{flex:1}}>
                            <ScrollView>
                                {
                                    this.state.etape == 1 ? (
                                        <View style={styles.section1}>
                                            {/* <Text style={styles.entete2}>Informations</Text> */}
                                            <Text style={styles.entete}>Qui souhaitez-vous assurer ?</Text>
                                            <View style={styles.container}>
                                                <View style={styles.display}>
                                                    <View style={styles.display3}>
                                                        <TouchableOpacity onPress={()=>this.vous()}>
                                                            <Card style={styles.card2}>
                                                                <CardItem style={styles.carditem}>
                                                                    <Image style={styles.imag1} source={require('./../../../../assets/images/people_1.png')}/>
                                                                </CardItem>
                                                                <CardItem style={styles.carditem}>
                                                                    <Text style={styles.text}>Vous</Text>
                                                                </CardItem>
                                                            </Card>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.display3}>
                                                        <TouchableOpacity onPress={()=>this.vousVotre()}>
                                                            <Card style={styles.card2}>
                                                                <CardItem style={styles.carditem}>
                                                                    <Image style={styles.imag1} source={require('./../../../../assets/images/people_2.png')}/>
                                                                </CardItem>
                                                                <CardItem style={styles.carditem}>
                                                                    <Text style={styles.text}>Vous et votre conjoint</Text>
                                                                </CardItem>
                                                            </Card>
                                                        </TouchableOpacity>
                                                    </View>
                            
                                                </View>
                                                <View style={styles.display}>
                                                    <View style={styles.display3}>
                                                        <TouchableOpacity onPress={()=>this.vousVos()}>
                                                            <Card style={styles.card2}>
                                                                <CardItem style={styles.carditem}>
                                                                    <Image style={styles.imag1} source={require('./../../../../assets/images/people_3.png')}/>
                                                                </CardItem>
                                                                <CardItem style={styles.carditem}>
                                                                    <Text style={styles.text}>Vous et vos enfants</Text>
                                                                </CardItem>
                                                            </Card>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.display3}>
                                                        <TouchableOpacity onPress={()=>this.vousVotreVos()}>
                                                            <Card style={styles.card2}>
                                                                <CardItem style={styles.carditem}>
                                                                    <Image style={styles.imag1} source={require('./../../../../assets/images/people_4.png')}/>
                                                                </CardItem>
                                                                <CardItem style={styles.carditem}>
                                                                    <Text style={styles.text}>Vous, votre conjoit et vos enfants</Text>
                                                                </CardItem>
                                                            </Card>
                                                        </TouchableOpacity>
                                                    </View>
                            
                                                </View>
                                                    
                                            </View>
                                        
                                        </View>
                                    ): this.state.etape == 11 ? (
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
                                                keyboardType='phone-pad'
                                                placeholder="Age"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.age(text)}
                                            />
                                            <TextInput
                                                placeholder="Ville"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.ville(text)}
                                            />
                                            <TextInput
                                                placeholder="email"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.email(text)}
                                            />
                                            <TextInput
                                                keyboardType='phone-pad'
                                                placeholder="Téléphone"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.telephone(text)}
                                            />
                                            <Form style={styles.form}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    headerStyle={{ backgroundColor: "#b95dd3" }}
                                                    headerBackButtonTextStyle={{ color: "#fff" }}
                                                    headerTitleStyle={{ color: "#fff" }}
                                                    selectedValue={this.state.selected}
                                                    onValueChange={this.onValueChange.bind(this)}
                                                >
                                                    <Picker.Item label="Régimes obligatoires" />
                                                    <Picker.Item label="Régime général" value="Régime général" />
                                                    <Picker.Item label="Régime agricole" value="Régime agricole" />
                                                    <Picker.Item label="Régime social des indépendants" value="Régime social des indépendants" />
                                                    <Picker.Item label="Régimes spéciaux" value="Régimes spéciaux" />
                                                </Picker>
                                            </Form>
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
                                    ): this.state.etape == 21 ? (
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
                                                placeholder="Ville"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.ville(text)}
                                            />
                                            <TextInput
                                                placeholder="email"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.email(text)}
                                            />
                                            <TextInput
                                                keyboardType='phone-pad'
                                                placeholder="Téléphone"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.telephone(text)}
                                            />
                                            <Form style={styles.form}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    headerStyle={{ backgroundColor: "#b95dd3" }}
                                                    headerBackButtonTextStyle={{ color: "#fff" }}
                                                    headerTitleStyle={{ color: "#fff" }}
                                                    selectedValue={this.state.selected}
                                                    onValueChange={this.onValueChange.bind(this)}
                                                >
                                                    <Picker.Item label="Régimes obligatoires" />
                                                    <Picker.Item label="Régime général" value="Régime général" />
                                                    <Picker.Item label="Régime agricole" value="Régime agricole" />
                                                    <Picker.Item label="Régime social des indépendants" value="Régime social des indépendants" />
                                                    <Picker.Item label="Régimes spéciaux" value="Régimes spéciaux" />
                                                </Picker>
                                            </Form>
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
                                            <TouchableOpacity onPress={() => this.vousVotre2()} style={styles.button}>
                                                <Text style={styles.textButton}>Suivant</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    ): this.state.etape == 22 ? (
                                        <View style={styles.section1}>
                                            {/* <Text style={styles.entete2}>Informations</Text> */}
                                            <Text style={styles.entete}>Conjoint à assurer</Text>
                                            <View style={styles.container}>
                                                <TextInput
                                                    placeholder="Nom"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.nomconjoint(text)}
                                                />
                                                <TextInput
                                                    placeholder="Prénoms"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.prenomconjoint(text)}
                                                />
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Age"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.ageconjoint(text)}
                                                />
                                            <Form style={styles.form}>
                                                    <Picker
                                                        mode="dropdown"
                                                        iosIcon={<Icon name="arrow-down" />}
                                                        headerStyle={{ backgroundColor: "#b95dd3" }}
                                                        headerBackButtonTextStyle={{ color: "#fff" }}
                                                        headerTitleStyle={{ color: "#fff" }}
                                                        selectedValue={this.state.selectedfemme}
                                                        onValueChange={this.onValueChange1.bind(this)}
                                                    >
                                                        <Picker.Item label="Régimes obligatoires" />
                                                        <Picker.Item label="Régime général" value="Régime général" />
                                                        <Picker.Item label="Régime agricole" value="Régime agricole" />
                                                        <Picker.Item label="Régime social des indépendants" value="Régime social des indépendants" />
                                                        <Picker.Item label="Régimes spéciaux" value="Régimes spéciaux" />
                                                    </Picker>
                                                </Form>
                                            </View>
                                            <View style={styles.center}>
                                                <TouchableOpacity onPress={() => this.premier()} style={styles.button}>
                                                    <Text style={styles.textButton}>Suivant</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ): this.state.etape == 31 ? (
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
                                                placeholder="Ville"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.ville(text)}
                                            />
                                            <TextInput
                                                placeholder="email"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.email(text)}
                                            />
                                            <TextInput
                                                keyboardType='phone-pad'
                                                placeholder="Téléphone"
                                                placeholderTextColor="#888"
                                                style={styles.input}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.telephone(text)}
                                            />
                                            <Form style={styles.form}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    headerStyle={{ backgroundColor: "#b95dd3" }}
                                                    headerBackButtonTextStyle={{ color: "#fff" }}
                                                    headerTitleStyle={{ color: "#fff" }}
                                                    selectedValue={this.state.selected}
                                                    onValueChange={this.onValueChange.bind(this)}
                                                >
                                                    <Picker.Item label="Régimes obligatoires" />
                                                    <Picker.Item label="Régime général" value="Régime général" />
                                                    <Picker.Item label="Régime agricole" value="Régime agricole" />
                                                    <Picker.Item label="Régime social des indépendants" value="Régime social des indépendants" />
                                                    <Picker.Item label="Régimes spéciaux" value="Régimes spéciaux" />
                                                </Picker>
                                            </Form>
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
                                            <TouchableOpacity onPress={() => this.vousVos2()} style={styles.button}>
                                                <Text style={styles.textButton}>Suivant</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    ): this.state.etape == 32 ? (
                                    <View style={styles.section1}>
                                        <Text style={styles.entete}>Les enfants à assurer</Text>
                                        {
                                            this.state.enfants.length > 0 ? (
                                                <View style={styles.mywid}>
                                                    <Text style={styles.entete10}>Liste des enfants</Text>
                                                    <ListItem style={styles.listItem}>
                                                        <Text style={styles.enfant}>Nom</Text>
                                                        <Text style={styles.enfant}>Prenom</Text>       
                                                        <Text style={styles.enfant}>Age</Text>
                                                        <Text style={styles.enfant}>Régime</Text>
                                                    </ListItem>
                                                    {this.enfants()}
                                                </View>
                                            ):(
                                                <Text style={styles.center}>Aucun enfant ajouté !</Text>
                                            )
                                        }
                                        
                                        <View style={styles.container2}>
                                            <TextInput
                                                value = {this.state.nomenfant}
                                                placeholder="Nom"
                                                placeholderTextColor="#888"
                                                style={styles.input2}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.nomenfant(text)}
                                            />
                                    
                                        </View>
                                        <View style={styles.container2}>
                                            <TextInput
                                                value = {this.state.prenomenfant}
                                                placeholder="Prénoms"
                                                placeholderTextColor="#888"
                                                style={styles.input2}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.prenomenfant(text)}
                                            />
                                        </View>
                                        <View style={styles.container2}>
                                            <TextInput
                                                value = {this.state.ageenfant}
                                                keyboardType='phone-pad'
                                                placeholder="Age"
                                                placeholderTextColor="#888"
                                                style={styles.input2}
                                                returnKeyType="done"
                                                onChangeText={(text)=>this.agenfant(text)}
                                            />
                                        </View>
                                        <Form style={styles.form2}>
                                            <Picker
                                                value = {this.state.selectedenfant}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                headerStyle={{ backgroundColor: "#b95dd3" }}
                                                headerBackButtonTextStyle={{ color: "#fff" }}
                                                headerTitleStyle={{ color: "#fff" }}
                                                selectedValue={this.state.selectedenfant}
                                                onValueChange={this.onValueChange2.bind(this)}
                                            >
                                                <Picker.Item label="Régimes obligatoires" />
                                                <Picker.Item label="Régime général" value="Régime général" />
                                                <Picker.Item label="Régime agricole" value="Régime agricole" />
                                                <Picker.Item label="Régime social des indépendants" value="Régime social des indépendants" />
                                                <Picker.Item label="Régimes spéciaux" value="Régimes spéciaux" />
                                            </Picker>
                                        </Form>
                                        <View style={styles.center}>
                                            <TouchableOpacity onPress={() => this.ajouter()} style={styles.button5}>
                                                <Text style={styles.textButton}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.center}>
                                            <TouchableOpacity onPress={() => this.premier()} style={styles.button}>
                                                <Text style={styles.textButton}>Suivant</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    ): this.state.etape == 41 ? (
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
                                                    keyboardType='phone-pad'
                                                    placeholder="Age"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.age(text)}
                                                />
                                                <TextInput
                                                    placeholder="Ville"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.ville(text)}
                                                />
                                                <TextInput
                                                    placeholder="email"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.email(text)}
                                                />
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Téléphone"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.telephone(text)}
                                                />
                                                <Form style={styles.form}>
                                                    <Picker
                                                        mode="dropdown"
                                                        iosIcon={<Icon name="arrow-down" />}
                                                        headerStyle={{ backgroundColor: "#b95dd3" }}
                                                        headerBackButtonTextStyle={{ color: "#fff" }}
                                                        headerTitleStyle={{ color: "#fff" }}
                                                        selectedValue={this.state.selected}
                                                        onValueChange={this.onValueChange.bind(this)}
                                                    >
                                                        <Picker.Item label="Régimes obligatoires" />
                                                        <Picker.Item label="Régime général" value="Régime général" />
                                                        <Picker.Item label="Régime agricole" value="Régime agricole" />
                                                        <Picker.Item label="Régime social des indépendants" value="Régime social des indépendants" />
                                                        <Picker.Item label="Régimes spéciaux" value="Régimes spéciaux" />
                                                    </Picker>
                                                </Form>
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
                                                <TouchableOpacity onPress={() => this.vousVotreVos1()} style={styles.button}>
                                                    <Text style={styles.textButton}>Suivant</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ): this.state.etape == 42 ? (
                                        <View style={styles.section1}>
                                            {/* <Text style={styles.entete2}>Informations</Text> */}
                                            <Text style={styles.entete}>Conjoint à assurer</Text>
                                            <View style={styles.container}>
                                                <TextInput
                                                    placeholder="Nom"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.nomconjoint(text)}
                                                />
                                                <TextInput
                                                    placeholder="Prénoms"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.prenomconjoint(text)}
                                                />
                                                <TextInput
                                                    keyboardType='phone-pad'
                                                    placeholder="Age"
                                                    placeholderTextColor="#888"
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.ageconjoint(text)}
                                                />
                                            <Form style={styles.form}>
                                                    <Picker
                                                        mode="dropdown"
                                                        iosIcon={<Icon name="arrow-down" />}
                                                        headerStyle={{ backgroundColor: "#b95dd3" }}
                                                        headerBackButtonTextStyle={{ color: "#fff" }}
                                                        headerTitleStyle={{ color: "#fff" }}
                                                        selectedValue={this.state.selectedfemme}
                                                        onValueChange={this.onValueChange1.bind(this)}
                                                    >
                                                        <Picker.Item label="Régimes obligatoires" />
                                                        <Picker.Item label="Régime général" value="Régime général" />
                                                        <Picker.Item label="Régime agricole" value="Régime agricole" />
                                                        <Picker.Item label="Régime social des indépendants" value="Régime social des indépendants" />
                                                        <Picker.Item label="Régimes spéciaux" value="Régimes spéciaux" />
                                                    </Picker>
                                                </Form>
                                            </View>
                                            <View style={styles.center}>
                                                <TouchableOpacity onPress={() => this.vousVotreVos2()} style={styles.button}>
                                                    <Text style={styles.textButton}>Suivant</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ): this.state.etape == 43 ? (
                                        <View style={styles.section1}>
                                            <Text style={styles.entete}>Les enfants à assurer</Text>
                                            {
                                                this.state.enfants.length > 0 ? (
                                                    <View style={styles.mywid}>
                                                        <Text style={styles.entete10}>Liste des enfants</Text>
                                                        <ListItem style={styles.listItem}>
                                                            <Text style={styles.enfant}>Nom</Text>
                                                            <Text style={styles.enfant}>Prenom</Text>       
                                                            <Text style={styles.enfant}>Age</Text>
                                                            <Text style={styles.enfant}>Régime</Text>
                                                        </ListItem>
                                                        {this.enfants()}
                                                    </View>
                                                ):(
                                                    <Text style={styles.center}>Aucun enfant ajouté !</Text>
                                                )
                                            }
                                            
                                            <View style={styles.container2}>
                                                <TextInput
                                                    value = {this.state.nomenfant}
                                                    placeholder="Nom"
                                                    placeholderTextColor="#888"
                                                    style={styles.input2}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.nomenfant(text)}
                                                />
                                        
                                            </View>
                                            <View style={styles.container2}>
                                                <TextInput
                                                    value = {this.state.prenomenfant}
                                                    placeholder="Prénoms"
                                                    placeholderTextColor="#888"
                                                    style={styles.input2}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.prenomenfant(text)}
                                                />
                                            </View>
                                            <View style={styles.container2}>
                                                <TextInput
                                                    value = {this.state.ageenfant}
                                                    keyboardType='phone-pad'
                                                    placeholder="Age"
                                                    placeholderTextColor="#888"
                                                    style={styles.input2}
                                                    returnKeyType="done"
                                                    onChangeText={(text)=>this.agenfant(text)}
                                                />
                                            </View>
                                            <Form style={styles.form2}>
                                                <Picker
                                                    value = {this.state.selectedenfant}
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    headerStyle={{ backgroundColor: "#b95dd3" }}
                                                    headerBackButtonTextStyle={{ color: "#fff" }}
                                                    headerTitleStyle={{ color: "#fff" }}
                                                    selectedValue={this.state.selectedenfant}
                                                    onValueChange={this.onValueChange2.bind(this)}
                                                >
                                                    <Picker.Item label="Régimes obligatoires" />
                                                    <Picker.Item label="Régime général" value="Régime général" />
                                                    <Picker.Item label="Régime agricole" value="Régime agricole" />
                                                    <Picker.Item label="Régime social des indépendants" value="Régime social des indépendants" />
                                                    <Picker.Item label="Régimes spéciaux" value="Régimes spéciaux" />
                                                </Picker>
                                            </Form>
                                            <View style={styles.center}>
                                                <TouchableOpacity onPress={() => this.ajouter()} style={styles.button5}>
                                                    <Text style={styles.textButton}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.center}>
                                                <TouchableOpacity onPress={() => this.premier()} style={styles.button}>
                                                    <Text style={styles.textButton}>Suivant</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ): this.state.etape == 3 ?(
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
                                                <TouchableOpacity onPress={() => this.detail()} style={styles.button2}>
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
                                            <Text style={styles.entete2}>Choisir Offre,</Text>
                                            <Text style={styles.entete}>Compagnie ...</Text>
                                            <View style={styles.container}>
                                                <TextInput
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
        alignItems:'center',
        textAlign:'center'
    },
    enfant:{
        margin:5,
    },
    mywid:{
        width:'90%'
    },
    entete10:{
        fontSize:18,
        textAlign:'center',
    },
    form:{
        marginBottom:10,
        backgroundColor:'#cccccc35',
    },
    form2:{
        marginBottom:10,
        backgroundColor:'#cccccc35',
        margin:20
    },
    titr:{
        marginBottom:15,
        padding:5,  
    },
    entete:{
        marginLeft:20,
        marginTop:0,
        marginBottom:10,
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
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:15,
    },
    container2:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        flex:1,
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'center'
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
    input2: {
        width: "100%",
        color: "black",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        fontFamily: "muli",
        marginBottom: 0,
        backgroundColor:'#cccccc35',
        height:50, 
    },
    image1:{
        height:200,
        minWidth:200,
        marginBottom:20
    },
    imag1:{
        height:60,
        width:60,
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
    button5: {
        width: '15%',
        backgroundColor: "red",
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
    text:{
        textAlign:'center',
        fontWeight:'bold',
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
    display:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'transparent',
    },
    display3:{
        flex:1, 
        justifyContent: 'center',
        padding:5,
        marginTop:15

    },
    card2:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:5,
        paddingBottom:5,
        height:'100%',
        backgroundColor:'#fafafa'

    },
    carditem:{
        backgroundColor:'transparent'
    }
   
});

const mapStateToProps=(state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(AssuranceSante)