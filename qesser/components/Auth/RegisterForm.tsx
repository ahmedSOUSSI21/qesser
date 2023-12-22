import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { auth } from '../../core/firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React from 'react'
import Input from './Input'

const isEmailValid = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

const RegisterForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [repeatPassword, setRepeatPassword] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')
    const [repeatPasswordError, setRepeatPasswordError] = React.useState('')
    const [displayName, setDisplayName] = React.useState('' as string)
    const [displayNameError, setDisplayNameError] = React.useState('' as string)

    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        let anyError = false;
        if (!isEmailValid(email)) {
            setEmailError('Email is invalid')
            anyError = true
        }
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long')
            anyError = true
        }
        if (password !== repeatPassword) {
            setRepeatPasswordError('Passwords must match')
            anyError = true
        }
        if (anyError) {
            setLoading(false)
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            if(auth.currentUser == null){
                throw new Error("User is null")
            }
            await updateProfile(auth.currentUser, {
                displayName: displayName,
            });

            setLoading(false)
        } catch (e: any) {
            setPasswordError(e)
        }
    }

    return (
        <>
            <Input placeholder="Full name" value={displayName} setValue={setDisplayName} setError={setDisplayNameError} error={displayNameError} />
            <Input placeholder="Email" value={email} setValue={setEmail} setError={setEmailError} error={emailError} />
            <Input placeholder="Password" value={password} setValue={setPassword} setError={setPasswordError} error={passwordError} secureTextEntry />
            <Input placeholder="Repeat password" value={repeatPassword} setValue={setRepeatPassword} setError={setRepeatPasswordError} error={repeatPasswordError} secureTextEntry />
            {loading && <ActivityIndicator size="large" color="#000" />}
            <TouchableOpacity style={styles.button} onPress={async () => await handleSubmit()}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </>
    )
}

export default RegisterForm

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