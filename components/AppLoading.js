import React from 'react'
import {ActivityIndicator, StyleSheet}  from 'react-native'
import { View, Text } from 'native-base'

class AppLoading extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' />
                <Text>{this.props.titreMessage ?? 'Veuillez Patienter ...'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        left:0,
        right:0,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})

export default AppLoading
