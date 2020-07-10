import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView, TouchableOpacity,AsyncStorage } from 'react-native';
import Vue1 from './Vue1';
import Vue2 from './Vue2';
import Vue3 from './Vue3';
export default class Onboarding extends React.Component {
  
   constructor(props) {
      super(props);
      this.state = {
         pagePosition: 1
      }
      console.log(this.props.navigation)
   }
   
   render() {
      let circleBackgroundColor = ['transparent', 'transparent', 'transparent'];
      circleBackgroundColor[this.state.pagePosition-1] = '#fff';
      
      return (
         <SafeAreaView style={styles.container}>
            <View>
               <ScrollView
                  style={styles.onboardingScrollView}
                  horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onScroll={this.onScrollHandler}
               >
                  <View style={styles.onboardingView}>
                     <Vue1/>
                  </View>
                  <View style={styles.onboardingView}>
                     <Vue2/>
                  </View>
                  <View style={styles.onboardingView}>
                     <Vue3/>
                  </View>
               </ScrollView>
               <TouchableOpacity
                  onPress={()=>this.closeTheOnboarding()}
                  style={styles.closeButton}
               >
                  <Text>Passer</Text>
               </TouchableOpacity>
               <View style={styles.bottomOptions}>
                  <View style={styles.positionIndicatorsRow}>
                     <View style={[styles.positionIndicatorCircle, {backgroundColor:circleBackgroundColor[0]}]} />
                     <View style={[styles.positionIndicatorCircle, {backgroundColor:circleBackgroundColor[1]}]} />
                     <View style={[styles.positionIndicatorCircle, {backgroundColor:circleBackgroundColor[2]}]} />
                  </View>
                  <TouchableOpacity
                     onPress={this.signUp}
                     style={styles.signUpButton}
                  >
                     <Text style={styles.signUpButtonText}>
                        S'INSCRIRE GRATUITEMENT
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={this.signIn}
                     style={styles.signInButton}
                  >
                     <Text style={styles.signInButtonText}>
                        SE CONNECTER
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </SafeAreaView>
      );
   }
   closeTheOnboarding = () => {
      let process = 1;
      AsyncStorage.setItem('process',process);
      this.props.navigation.navigate("userSpaceDrawer");
   }
   signUp = () => {
         //TODO : Mettre la méthode d'ouverture de la page d'inscription
      }
   signIn = () => {
         //TODO : Mettre la méthode d'ouverture de la page de connexion
      }
   onScrollHandler = (event) => {
      let pagePosition = 1;
      const scrollViewAbscissa = event.nativeEvent.contentOffset.x;
      const pageWidth = Dimensions.get('window').width;
//On va voir si le reste de la division de l'abscisse par rapport à la largeur de l'écran est égale à 0. Si oui, le résultat de la division, nous donnera la page
      const remain = scrollViewAbscissa % pageWidth;
      if (remain === 0) {
         pagePosition = parseInt(scrollViewAbscissa / pageWidth) + 1;
         //Si le numéro de page ainsi calculé est différent de celui en cours, on le met à jour
         if (this.state.pagePosition !== pagePosition) {
            this.setState({ pagePosition: pagePosition });
         }
      }
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#6789a0',
      alignItems: 'center',
      justifyContent: 'center'
   },
   onboardingScrollView: {
      flex: 1,
      width: Dimensions.get('screen').width
   },
   onboardingView: {
      flex: 1,
      width: Dimensions.get('screen').width,
      justifyContent: 'center',
      alignItems: 'center'
   },
   closeButton: {
      position: 'absolute',
      top: 10,
      right: 20
   },
   bottomOptions: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: Dimensions.get('screen').width,
      alignItems: 'center'
   },
   signUpButton: {
      width: 200,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      backgroundColor:'#2E3682',
      borderRadius:100
   },
   signUpButtonText: {
      textAlign: 'center',
      paddingHorizontal: 20,
      color: 'white'
   },
   signInButton: {
      width: 200,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center'
   },
   signInButtonText: {
      textAlign: 'center',
      paddingHorizontal: 20,
      color: '#fff'
   },
   positionIndicatorsRow: {
      flexDirection:'row',
      justifyContent:'space-between',
      width:100,
      marginVertical:10
   },
   positionIndicatorCircle: {
      width:20,
      height:20,
      borderRadius:10,
      borderWidth:2,
      borderColor:'#fff'
   }
});