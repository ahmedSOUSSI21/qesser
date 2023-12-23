import { StyleSheet, View, TextInput, Image } from 'react-native'
import {auth, db} from '../../core/firebaseConfig'
import {getDoc, doc, getDocs, collection, query, where, } from 'firebase/firestore'
import React from 'react'

type SearchInputProps = {
    setUsers: any
}

const SearchInput:React.FC<SearchInputProps> = ({setUsers}) => {

    const handleOnChange = async (startsWith: string) => {
        if(!startsWith) {
            setUsers([])
            return
        }
        // get all users whose name uppercase starts with startsWith uppercase
        const qry = query(collection(db, "users"), 
            where("displayNameUpperCase", ">=", startsWith.toUpperCase()), 
            where("displayNameUpperCase", "<=", startsWith.toUpperCase() + "\uf8ff")
        );  
        const querySnapshot = await getDocs(qry);
        const users = querySnapshot.docs.map(doc => doc.data())
        setUsers(users)
    }

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder='Chercher un utilisateur' 
                placeholderTextColor='#2F2F2F' 
                style={styles.input} 
                onChangeText={handleOnChange}
            />
            <Image source={require("../../assets/search.png")} style={styles.searchIcon}/>
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    input: {
        backgroundColor: '#eee',
        marginVertical: 10,
        padding: 15,
        borderRadius: 50,
        fontSize: 16,
        fontWeight: 'bold',
    }, 
    searchIcon:{
        position: 'absolute',
        width: 20,
        height: 20,
        top: 25,
        right: 22,
    }
})