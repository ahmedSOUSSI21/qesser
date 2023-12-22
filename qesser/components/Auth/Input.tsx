import { StyleSheet, Text, TextInput } from 'react-native'
import React from 'react'

type InputProps = {
    placeholder: string
    value: string
    setValue: (value: string) => void
    error: string
    setError: (error: string) => void
    secureTextEntry?: boolean
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

const Input: React.FC<InputProps> = ({placeholder, value, setValue, error, setError, secureTextEntry, autoCapitalize}) => {
  return (
    <>
        <TextInput 
            style={styles.input} 
            placeholder={placeholder}
            placeholderTextColor={"#7F817C"} 
            value={value}
            onChangeText={(value) => {
                setValue(value)
                if(error) setError('')
            }}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            autoComplete='off'
        />
        {error && <Text style={styles.error}>{error}</Text>}
    </>
  )
}

export default Input

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#333',
        fontSize: 16,
        padding: 10,
        marginBottom: 10,
    },
    error:{
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    }
})