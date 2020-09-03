import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,FlatList,SafeAreaView,Modal} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from '../../../AppLoading';
import WebView from 'react-native-webview';

const MAX_RESULT = 15;
const PLAYLIST_ID = "PL8Cr4Y_TE68tHSSBmyb5zBipI9CtD5-pp";
const API_KEY = "AIzaSyDDAqTaJCaQydcE6GlNNi31H1ZrOY7i9LQ";

class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            videos: [],
            modalVisible:false,
            video:''
        };
    }

    componentDidMount() {
        this.setState({loading:true});
        this.fetchPlaylistData();
    }
    
    fetchPlaylistData = async () => {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAYLIST_ID}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`);
        const json = await response.json();
        this.setState({ videos: json['items'],loading:false});
    };
    video=(video)=>{
        this.setState({modalVisible:true,video:video});
    }
    renderLoadingView() {
        return (
            <AppLoading titreMessage={'Chargement en cours ...'}/>
        );
    }
    render() {
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage={'Vidéos en cours de chargement ...'}/>
                    ):(
                        <View style={styles.safeArea}>
                            <FlatList
                                data={this.state.videos}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={
                                    ({item}) => 
                                <TouchableOpacity
                                    style={styles.demacate}
                                    onPress={() => this.video(item.contentDetails.videoId)}
                                >
                                    <View style={styles.display}>
                                        <View>
                                            <Image style={styles.image1} source={require('./../../../../assets/images/videos.png')}/>
                                        </View>
                                        <View>
                                            <Text 
                                            style={styles.item} 
                                            > 
                                            {item.snippet.title} 
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
                                >
                                    <View style={styles.video}>
                                        <SafeAreaView style={styles.modalView}>
                                            { 
                                                <WebView
                                                    source={{ uri: "https://www.youtube.com/embed/"+this.state.video}}
                                                    startInLoadingState={true} 
                                                    renderLoading={this.renderLoadingView}
                                                    // style={styles.modalView}
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
        // paddingRight: 5,
        paddingTop: 5,
        fontSize: 14,
        height: 52,
        width:'55%',
    },
    image1:{
        height:45,
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
        elevation: 5
    },
    video:{
        width:'100%',  
        height:'90%',
        margin:0,
        padding:0
    },
    iconesContent:{
        marginTop:'1%',
        alignItems:'center',
        justifyContent:'center'
    },
    icones:{
        fontSize:35,
        color:'#2E3682',
    }
});

const mapStateToProps = (state) => {
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Videos)
// export default Parametres