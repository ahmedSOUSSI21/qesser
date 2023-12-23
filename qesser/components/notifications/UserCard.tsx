import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../core/firebaseConfig'

type UserCardProps = {
    user: any
    setUsers: any
}

const UserCard: React.FC<UserCardProps> = ({ user, setUsers }) => {

    const accept = async () => {
        if (auth.currentUser == null) {
            throw new Error("User is null")
        }

        const currentUser = (await getDoc(doc(db, "users", auth.currentUser.uid))).data();

        console.log("currentUser : ", currentUser);

        if (currentUser == null) {
            throw new Error("User is null")
        }

        console.log("currentUser.friends : ", currentUser.friends);
        console.log("currentUser.invitations : ", currentUser.invitations);

        await setDoc(doc(db, "users", currentUser.uid), {
            friends: [...currentUser.friends, user.uid],
        }, { merge: true })

        await setDoc(doc(db, "users", currentUser.uid), {
            invitations: currentUser.invitations.filter((uid: string) => uid !== user.uid)
        }, { merge: true })

        await setDoc(doc(db, "users", user.uid), {
            friends: [...user.friends, currentUser.uid],
        }, { merge: true })

        setUsers((users: any[]) => users.filter((u: any) => u.uid !== user.uid))
    }

    const reject = async () => {
        if (auth.currentUser == null) {
            throw new Error("User is null")
        }

        const currentUser = (await getDoc(doc(db, "users", auth.currentUser.uid))).data();

        if (currentUser == null) {
            throw new Error("User is null")
        }

        await setDoc(doc(db, "users", currentUser.uid), {
            invitations: currentUser.invitations.filter((uid: string) => uid !== user.uid)
        }, { merge: true })

        setUsers((users: any[]) => users.filter((u: any) => u.uid !== user.uid))
    }

    return (
        <View style={styles.container}>
            <Image style={styles.profilePicture} source={user.photoURL ? { uri: user.photoURL } : require("../../assets/default-profile-picture.png")} />
            <Text style={styles.displayName}>{user.displayName}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={accept}>
                    <Image style={styles.buttonIcon} source={require("../../assets/accept.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={reject}>
                    <Image style={styles.buttonIcon} source={require("../../assets/refuse.png")} />
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
        width: 30,
        height: 30,
    },
    accepted: {
        color: 'green',
        textAlign: 'center',
        marginTop: 10,
    },
    rejected: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    }
})