import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../components/Auth/LoginPage';
import LoginEmailPage from '../components/Auth/LoginEmail';
import RegisterPage from '../components/Auth/RegisterPage';
import LoginVerification from '../components/Auth/LoginVerification';
import MainNavigation from './MainNavigation';


const NavAuthRoot = createStackNavigator()
function AuthNavigation(props) {
    return(
        <NavAuthRoot.Navigator>
            <NavAuthRoot.Screen
                name="loginPage"
                component={LoginPage}
                options={{
                    headerShown:false
                }}
                />
            <NavAuthRoot.Screen
                name="verify"
                component={LoginVerification}
                options={{
                    headerShown:false
                }}
                />
            <NavAuthRoot.Screen
                name="Register"
                component={RegisterPage}
                options={{
                    headerShown:false
                }}
                />
            <NavAuthRoot.Screen
                name="LoginEmail"
                component={LoginEmailPage}
                options={{
                    headerShown:false
                }}
                />
            <NavAuthRoot.Screen
                name="Main"
                component={MainNavigation}
                options={{
                    headerShown:false
                }}
                />
        </NavAuthRoot.Navigator>
    )
}

export default AuthNavigation