import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.name}>Invitations</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container : {
        padding: 20,
        alignItems: 'center',
    },
    name: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
})