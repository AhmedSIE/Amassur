import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,Image,FlatList, Dimensions,Modal} from 'react-native';
import {connect} from 'react-redux';
import AppLoading from '../../../AppLoading';
// import { Modal } from 'react-native-paper';

class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            photos: [],
            modalVisible:false,
            image:''
        };
    }

    componentDidMount() {
        this.setState({loading:true});
        this.fetchListData();
    }
    
    fetchListData = async () => {
        this.setState({ photos: this.props.route.params.photos,loading:false});
    };
    onError = (item) => {
        let {failed} = this.state;
        failed.push(item);
        this.setState({failed});
    }
    monModal=(image)=>{
        this.setState({modalVisible:true,image:image});
    }
   
    render() {
        const photos = this.state.photos;
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage={'Photos en cours de chargement ...'}/>
                    ):(
                        <View style={styles.safeArea}>
                            <FlatList
                                numColumns={4}
                                style={styles.display}
                                data={this.state.photos}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={
                                    ({item}) => {
                                        const imageMargin = 10;
                                        const imageSize = ((Dimensions.get('screen').width - 5 * imageMargin)/3);
                                        // if (this.state.failed.includes(item)) {
                                        //    return (
                                        //       <View style={{ width: imageSize, height: imageSize, marginRight: imageMargin, marginBottom: imageMargin }}>
                                        //          <Image
                                        //             style={{ width: imageSize, height: imageSize, backgroundColor: '#EFEFEF' }}
                                        //             source={require('././../../../../assets/images/image_default.png')} />
                                        //       </View>
                                        //    )
                                        // }
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {this.monModal(item.photoimmatriculation)}}
                                                >
                                                <Image
                                                    style={styles.display2}
                                                    // style={{ width: imageSize, height: imageSize, backgroundColor: '#EFEFEF' }}
                                                    defaultSource={require('././../../../../assets/images/image_default.png')}
                                                    onError={() => this.onError(item)}
                                                    source={{ uri: 'data:image/jpeg;base64,'+item.photoimmatriculation }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    }
                                }
                            />
                             <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                // onRequestClose={() => {
                                // }}
                                >
                                <TouchableOpacity
                                    onPress={() => {this.setState({modalVisible:false});}}>
                                    <View style={styles.modalView}>
                                        <Image
                                            source={{ uri: 'data:image/jpeg;base64,'+this.state.image }}
                                            style={styles.image}
                                        />
                                    </View>
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
        backgroundColor: '#fff',

    },
    display:{
        margin:1
    },
    display2:{
        margin:2,
        height:Dimensions.get('screen').width/4,
        width:Dimensions.get('screen').width/4,
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    image:{
        width:'100%',  
        height:'100%',
        margin:0,
        padding:0
    }
});

const mapStateToProps = (state) => {
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Photos)
// export default Parametres