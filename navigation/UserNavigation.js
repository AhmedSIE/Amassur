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
                  this.props.pross ? (
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
              </RootUserStack.Navigator>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    pross: state.pross
  }
}

export default connect(mapStateToProps)(UserNavigation)
