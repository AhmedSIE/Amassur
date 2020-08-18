import React from 'react'
import { View, TouchableOpacity, Settings,AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PageAccueil from './../components/pages/Accueil';
import PageMessages from './../components/pages/Messages';
import PageServices from './../components/pages/Services';
import PageParrainage from './../components/pages/Parrainage';
import PagePortefeuille from './../components/pages/Portefeuille';
import PageTarif from './../components/pages/pageinterne/Tarif';
import PageOnboarding from './../components/onboarding/Onboarding';
import PageProfil from './../components/pages/Profil';
import PageParametres from './../components/pages/Parametres';
import PageAssuranceAuto from './../components/pages/pageinterne/assurances/AssuranceAuto';
import PageAssuranceSante from './../components/pages/pageinterne/assurances/AssuranceSante';
import PageAssuranceMoto from './../components/pages/pageinterne/assurances/AssuranceMoto';
import PageAssuranceMaison from './../components/pages/pageinterne/assurances/AssuranceMaison';
import CardFree from './../components/pages/pageinterne/services/Free';
import CardSilver from './../components/pages/pageinterne/services/Silver';
import CardGold from './../components/pages/pageinterne/services/Gold';
import CardPlatinum from './../components/pages/pageinterne/services/Platinum';
import Factures from './../components/pages/pageinterne/portefeuille/Factures';
import Videos from './../components/pages/pageinterne/portefeuille/Videos';
import Devis from './../components/pages/pageinterne/portefeuille/Devis';
import Attestations from './../components/pages/pageinterne/portefeuille/Attestations';
import Photos from './../components/pages/pageinterne/portefeuille/Photos';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';


function Accueil({navigation}) {
    return (
        <PageAccueil navigation={navigation} />
    );
}
function Messages({navigation}) {
  return (
    <PageMessages navigation={navigation}/>
    );
  }
function Services({navigation}) {
    return (
      <PageServices navigation={navigation}/>
    );
}
function Parrainage({navigation}) {
    return (
      <PageParrainage navigation={navigation}/>
    );
}
function Portefeuille({navigation}) {
  return (
    <PagePortefeuille navigation={navigation}/>
  );
}

const Tab = createBottomTabNavigator();
function UserSpaceDrawer (props) {
  return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Accueil') {
                  iconName = focused ? 'th-large': 'th-large';
                } else if (route.name === 'Messages') {
                  iconName = focused ? 'comments-o' : 'comments-o';

                }else if (route.name === 'Services') {
                  iconName = focused ? 'support' : 'support';
                }else if (route.name === 'Parrainage') {
                  iconName = focused ? 'users' : 'users';
                }else if (route.name === 'Portefeuille') {
                  iconName = focused ? 'briefcase' : 'briefcase';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#2E3682',
              inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Accueil" component={Accueil} />
            <Tab.Screen name="Messages" component={Messages} />
            <Tab.Screen name="Services" component={Services} />
            <Tab.Screen name="Parrainage" component={Parrainage} />
            <Tab.Screen name="Portefeuille" component={Portefeuille} />
        </Tab.Navigator>
  )
} 

const RootUserStack = createStackNavigator();
class UserNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
              <RootUserStack.Navigator>{
                  this.props.users.token || this.props.pross ? (
                      <RootUserStack.Screen 
                        name="userSpaceDrawer"
                        component={UserSpaceDrawer}
                        options={{
                          headerShown: false
                        }} />

                  ):(
                      <RootUserStack.Screen 
                        name="Onboarding"   
                        component={PageOnboarding}
                        options={{
                          headerShown: false
                        }} />
                  )

                }
                <RootUserStack.Screen 
                        name="Tarifs" 
                        component={PageTarif}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="Profil" 
                        component={PageProfil}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="Parametres" 
                        component={PageParametres}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="Assurance Auto" 
                        component={PageAssuranceAuto}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="Assurance Moto" 
                        component={PageAssuranceMoto}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="Assurance Maison" 
                        component={PageAssuranceMaison}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="Assurance Sante" 
                        component={PageAssuranceSante}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="FREE CARD" 
                        component={CardFree}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="SILVER CARD" 
                        component={CardSilver}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="GOLD CARD" 
                        component={CardGold}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="PLATINUM CARD" 
                        component={CardPlatinum}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="MES VIDEOS" 
                        component={Videos}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="MES DEVIS" 
                        component={Devis}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="MES PHOTOS" 
                        component={Photos}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="MES ATTESTATIONS" 
                        component={Attestations}
                        options={{
                          headerShown: true
                        }} />
                <RootUserStack.Screen 
                        name="MES FACTURES" 
                        component={Factures}
                        options={{
                          headerShown: true
                        }} />
              </RootUserStack.Navigator>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      pross: state.pross,
      users: state.users
    }
}

export default connect(mapStateToProps)(UserNavigation)
