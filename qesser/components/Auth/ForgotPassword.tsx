import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import {auth} from '../../core/firebaseConfig'
import {sendPasswordResetEmail} from 'firebase/auth'

import React from 'react'
import Input from './Input'

const isEmailValid = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

const ForgotPassword = () => {

    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [emailSent, setEmailSent] = React.useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        let anyError = false;
        if(!isEmailValid(email)){
            setEmailError('Email is invalid')
            anyError = true
        }
        if(anyError){
            setLoading(false)
            return;
        }
        try{
            await sendPasswordResetEmail(auth, email)
            setEmailSent(true)
            setLoading(false)
        }
        catch(e){
            setEmailError('Email is not registered')
        }
    }

    return (
        <>
            <Input placeholder="Email" value={email} setValue={setEmail} setError={setEmailError} error={emailError}/>
            {loading && <ActivityIndicator size="large" color="#000"/>}
            <TouchableOpacity style={styles.button} onPress={async () => await handleSubmit()}>
                <Text style={styles.buttonText}>Reset password</Text>
            </TouchableOpacity>
            {emailSent && <Text style={styles.successText}>Email to reset password has been sent</Text>}
        </>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    successText: {
        color: 'green',
        marginBottom: 20,
    }
})