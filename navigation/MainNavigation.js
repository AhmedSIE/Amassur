import React from 'react'
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import UserNavigation from './UserNavigation';
import AuthNavigation from './AuthNavigation';
import {AsyncStorage} from 'react-native';  
import AppLoading from '../components/AppLoading';
import { connect } from 'react-redux';


const RootStack = createStackNavigator();
class MainNavigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token:'',
            isLoading: false
        }
        this.user = this.user.bind(this)
    }

    async componentDidMount() {
        await this.user();
    }

    user = async ()=>{ 
        this.setState({isLoading: true}) 
        let user = await AsyncStorage.getItem('user');   
        let parsed = JSON.parse(user); 
        if (parsed) {
            if(parsed.token) 
                this.setState({token: parsed.token})
                const action = { type: "PROCESS_TOKEN", value: this.state.token }
                this.props.dispatch(action)
        } 
        this.setState({isLoading: false})     
    } 
    render(){
        console.log(this.props)
        return(
            <View style={{flex:1}}>
            {
                this.state.isLoading ? (
                    <AppLoading titreMessage={'En cours de chargement ...'} />
                ) : (
                    <RootStack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}>
                        <RootStack.Screen 
                            name="userSpace"
                            component={UserNavigation}
                            />
                        <RootStack.Screen
                            name="AuthUser"
                            component={AuthNavigation} 
                            />
                    </RootStack.Navigator>
                )
            }
            </View>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
  
export default connect(mapStateToProps)(MainNavigation)
