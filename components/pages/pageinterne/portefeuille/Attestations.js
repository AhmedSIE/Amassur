import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,AsyncStorage ,Share,Linking} from 'react-native';
import {Container, Card,CardItem, List, ListItem, Left, Right} from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import AppLoading from '../../../AppLoading';


// import SwipeablePanel from 'rn-swipeable-panel';


class Attestations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
        };
        // console.log(this.props)
    }

    render(){
        return (
            <View style={{flex:1}}>
                {
                    this.state.loading ? (
                        <AppLoading titreMessage={'Veuillez patienter ...'} />
                    ):(
                        <ScrollView style={styles.scrollView}>
                            
                        </ScrollView>
                    )
                }
            </View>
        );
    }
}
const styles=StyleSheet.create({
  
});

const mapStateToProps = (state) => {
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Attestations)
// export default Parametres