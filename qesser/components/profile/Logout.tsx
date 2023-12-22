import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { auth } from '../../core/firebaseConfig'
import { signOut } from 'firebase/auth'
import React from 'react'

const Logout = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={async () => await signOut(auth)}>
        <Text style={styles.buttonText}>Logout</Text>
        <Image source={require('../../assets/logout.png')} style={{width: 20, height: 20, marginLeft: 10}}/>
    </TouchableOpacity>

  )
}

export default Logout

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'gray',
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 16,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'white', 
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        marginVertical: 30,
    }, 
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
})