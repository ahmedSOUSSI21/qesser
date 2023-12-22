import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import {auth} from '../../core/firebaseConfig'
import {signInWithEmailAndPassword} from 'firebase/auth'

import React from 'react'
import Input from './Input'

const isEmailValid = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

const SignInForm = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        let anyError = false;
        if(!isEmailValid(email)){
            setEmailError('Email is invalid')
            anyError = true
        }
        if(password.length < 6){
            setPasswordError('Password must be at least 6 characters long')
            anyError = true
        }
        if(anyError){
            setLoading(false)
            return;
        }
        try{
            await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
        }catch(e){
            setPasswordError('Email or password is incorrect')
        }
    }

    return (
        <>
            <Input placeholder="Email" value={email} setValue={setEmail} setError={setEmailError} error={emailError}/>
            <Input placeholder="Password" value={password} setValue={setPassword} setError={setPasswordError} error={passwordError} secureTextEntry/>
            {loading && <ActivityIndicator size="large" color="#000"/>}
            <TouchableOpacity style={styles.button} onPress={async () => await handleSubmit()}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
        </>
    )
}

export default SignInForm

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
})