import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

type FriendCardCardProps = {
    user: any
}

const FriendCard:React.FC<FriendCardCardProps> = ({user}) => {
  return (
    <TouchableOpacity style={[styles.container, styles.containerWithBorder]}>
        <Image source={{uri: user.photoURL}} style={styles.image}/>
        <View style={styles.textContainer}>
            <Text style={styles.displayName}>{user.displayName}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default FriendCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 10,
    },
    containerWithBorder: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    displayName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})