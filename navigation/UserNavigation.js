import React from 'react'
import { View, TouchableOpacity, Settings,AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PageAccueil from './../components/pages/Accueil';
import PageMessages from './../components/pages/Messages';
import PageServices from './../components/pages/Services';
import PagePortefeuille from './../components/pages/Portefeuille';
import PageOnboarding from './../components/onboarding/Onboarding';
import Ionicons from 'react-native-vector-icons/FontAwesome';


function Accueil({navigation}) {
    return (
        <PageAccueil navigation={navigation} />
    );
}
  
 
function Messages() {
  return (
    <PageMessages/>
    );
  }
  function Services() {
    return (
      <PageServices />
    );
}
function Portefeuille() {
  return (
    <PagePortefeuille/>
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
                  iconName = focused
                    ? 'th-large'
                    : 'th-large';
                } else if (route.name === 'Messages') {
                  iconName = focused ? 'comments-o' : 'comments-o';
                }else if (route.name === 'Services') {
                  iconName = focused ? 'support' : 'support';
                }else if (route.name === 'Portefeuille') {
                  iconName = focused ? 'credit-card' : 'credit-card';
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
            <Tab.Screen name="Portefeuille" component={Portefeuille} />
        </Tab.Navigator>
  )
} 

const RootUserStack = createStackNavigator();
class UserNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pross:'',
      }
    }
    
    async componentDidMount() {
      await this.process();
    }

    process = async()=>{ 
          await AsyncStorage.getItem('process').then(process => {
          this.setState({process:process});  
        });
    } 
    render() {
        return(
              <RqootUserStack.Navigator>{
                // this.state.pross ? (
                    <RootUserStack.Screen 
                      name="userSpaceDrawer"
                      component={UserSpaceDrawer}
                      options={{
                        headerShown: false
                      }} />

                // ):(
                //     <RootUserStack.Screen 
                //       name="Onboarding" 
                //       component={PageOnboarding}
                //       options={{
                //         headerShown: false
                //       }} />
                // )

              }
              </RootUserStack.Navigator>
        );
    }
}


export default UserNavigation