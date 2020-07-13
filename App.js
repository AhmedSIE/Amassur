import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './navigation/MainNavigation';
import {Provider} from 'react-redux';
import Store from './store/ConfigStore';

export default function App() {
    return ( 
        <Provider store={Store}>
            <NavigationContainer>
                <MainNavigation />
            </NavigationContainer>
        </Provider>
    );
}