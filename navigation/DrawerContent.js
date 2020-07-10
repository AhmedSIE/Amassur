import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView,} from '@react-navigation/drawer';
import { useTheme,Avatar,Title,Caption,Paragraph,Drawer,Text,TouchableRipple, Switch,} from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";
import {AsyncStorage} from 'react-native';  

class DrawerContent extends React.Component {
    constructor(props){
        super(props);
        this.users();
        this.state={
          nom:'',
          tel:'',
          email:'',
        }
    }
    users = async ()=>{  
        try{  
          let user = await AsyncStorage.getItem('user');   
          let parsed = JSON.parse(user);  
          this.setState({tel:parsed.email})
          // alert(parsed.email);    
        }  
        catch(error){  
            alert(error)  
        }  
    } 
    
    render(){
        return (
          <DrawerContentScrollView {...this.props}>
            
          </DrawerContentScrollView>
        );
    }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  title2: {
    marginTop: 20,
    fontWeight: 'bold',
    color:'blue',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent
