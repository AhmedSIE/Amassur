import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,Image,FlatList,Modal,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import AppLoading from '../../../AppLoading';
import WebView from 'react-native-webview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Contrats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            contrats: [],
            modalVisible:false,
            contrat:''
        };
    }

    componentDidMount() {
        this.setState({loading:true});
        this.fetchListData();
    }
    
    fetchListData = async () => {
        this.setState({ contrats: this.props.route.params.contrats,loading:false});
    };

    open= (contrat) => {
        this.setState({contrat:contrat, modalVisible:true});
    }

    close= () => {
        if (this.state.loading ==false && this.state.modalVisible==true){
            setTimeout(() => this.setState({modalVisible:false}), 1000)
        }
    }

    renderLoadingView() {
        return (
            <AppLoading titreMessage={'Téléchargement en cours ...'}/>
        );
    }

    render() {
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage={'Contrats en cours de chargement ...'}/>
                    ):(
                        <View style={styles.safeArea}>
                            <FlatList
                                data={this.state.contrats}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={
                                    ({item}) => 
                                <TouchableOpacity
                                    style={styles.demacate}
                                    onPress={() => this.open(item.lien)}
                                >
                                    <View style={styles.display}>
                                        <View>
                                            <Image style={styles.image1} source={require('./../../../../assets/images/pdf.png')}/>
                                        </View>
                                        <View>
                                            <Text 
                                            style={styles.item} 
                                            > 
                                            {item.titre} 
                                            </Text>
                                        </View>      
                                    </View>
                                </TouchableOpacity>
                              }
                            />
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onShow={this.close}
                                >
                                    <View style={styles.contrat}>
                                        <SafeAreaView style={styles.modalView}>
                                            { 
                                                <WebView
                                                    source={{ uri: "http://192.168.1.101:8000/storage/"+this.state.contrat}}
                                                    startInLoadingState={true} 
                                                    renderLoading={this.renderLoadingView}
                                                    style={{flex: 1}}
                                                    transparent={true}
                                                />
                                            }
                                        </SafeAreaView>
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.iconesContent}
                                        onPress={() => {this.setState({modalVisible:false});}}>
                                            <FontAwesome
                                                name='times'
                                                style={styles.icones}
                                            />
                                    </TouchableOpacity>
                            </Modal>
                        </View>
                    )
                }
            </View>
        );
    }
}
const styles=StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    demacate: {
        borderBottomColor: '#2E3682',
        borderBottomWidth: 2,
        borderRadius:10
    },
    item: {
        paddingBottom: 5,
        paddingLeft: 3,
        paddingTop: 5,
        fontSize: 14,
        height: 52,
        maxWidth:'90%',
    },
    image1:{
        height:55,
        width:55,
        marginRight:5,
    },
    display:{
        flex:1,
        flexDirection:'row',
        margin:5
    },
    modalView: {
        flex: 1,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contrat:{
        width:'100%',  
        height:'30%',
        margin:0,
        padding:0,
    },
    iconesContent:{
        marginTop:'1%',
        alignItems:'center',
        justifyContent:'center'
    },
    icones:{
        fontSize:35,
        color:'#2E3682',
    },
});

const mapStateToProps = (state) => {
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Contrats)
// export default Parametres