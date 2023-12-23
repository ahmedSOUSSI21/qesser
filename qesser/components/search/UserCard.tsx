import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth, db } from '../../core/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

type UserCardProps = {
    user: any, 
    currentUser: any
}


const UserCard: React.FC<UserCardProps> = ({ user, currentUser }) => {

    if (!user || !currentUser) {
        return null
    }

    if (user.uid === currentUser.uid) {
        return null
    }

    const add = async () => {
        await setDoc(doc(db, "users", user.uid), {
            invitations: [...user.invitations, currentUser.uid],
        }, { merge: true })
    }

    const accept = async () => {
        await setDoc(doc(db, "users", currentUser.uid), {
            friends: [...currentUser.friends, user.uid],
        }, { merge: true })

        await setDoc(doc(db, "users", currentUser.uid), {
            invitations: currentUser.invitations.filter((uid: string) => uid !== user.uid)
        }, { merge: true })

        await setDoc(doc(db, "users", user.uid), {
            friends: [...user.friends, currentUser.uid],
        }, { merge: true })
    }

    const reject = async () => {
        await setDoc(doc(db, "users", currentUser.uid), {
            invitations: currentUser.invitations.filter((uid: string) => uid !== user.uid)
        }, { merge: true })
    }

    const Button = () => {
        if (user.friends.includes(currentUser.uid)) {
            return (<TouchableOpacity style={styles.button}>
                <Image style={styles.buttonIcon} source={require("../../assets/message.png")} />
            </TouchableOpacity>);
        }
        if (user.invitations.includes(currentUser.uid)) {
            return (
                <TouchableOpacity style={styles.button} disabled>
                    <Image style={styles.buttonIcon} source={require("../../assets/pending.png")} />
                </TouchableOpacity>
            );
        }

        if (currentUser.invitations.includes(user.uid)) {
            return (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={accept}>
                        <Image style={styles.buttonIcon} source={require("../../assets/accept.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={reject}>
                        <Image style={styles.buttonIcon} source={require("../../assets/refuse.png")} />
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <TouchableOpacity style={styles.button} onPress={add}>
                <Image style={styles.buttonIcon} source={require("../../assets/invite.png")} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Image style={styles.profilePicture} source={user.photoURL ? { uri: user.photoURL } : require("../../assets/default-profile-picture.png")} />
            <Text style={styles.displayName}>{user.displayName}</Text>
            <View style={styles.buttonsContainer}>
                <Button />
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
