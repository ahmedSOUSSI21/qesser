import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

type UserCardProps = {
    user: any
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.profilePicture} source={user.photoURL ? { uri: user.photoURL } : require("../../assets/default-profile-picture.png")} />
            <Text style={styles.displayName}>{user.displayName}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Image style={styles.buttonIcon} source={require("../../assets/invite.png")} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        margin: 10,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 20,
    },
    displayName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: 20,
    },
    buttonIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
})
