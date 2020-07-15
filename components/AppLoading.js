import React from 'react'
import {ActivityIndicator, StyleSheet}  from 'react-native'
import { View, Text,Container,Spinner,Content } from 'native-base'

class AppLoading extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Container style={styles.loadingContainer}>
                <Spinner color='blue' />
                <Text>{this.props.titreMessage }</Text>
            </Container>
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
