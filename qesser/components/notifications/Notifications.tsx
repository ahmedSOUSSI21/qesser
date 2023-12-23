import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../core/firebaseConfig'
import Header from './Header'
import UserCard from './UserCard'

const getInvitations = async () => {
  if(auth.currentUser == null){
    throw new Error("User is null")
  }

  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if(!docSnap.exists()){
    throw new Error("User does not exist")
  }

  const invitations = docSnap.data().invitations;
  const users = await Promise.all(invitations.map(async (invitation: any) => {
    const userDocRef = doc(db, "users", invitation);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.data();
  }))
  return users;
}

const Notifications = () => {
  const [users, setUsers] = React.useState([] as any[])

  React.useEffect(() => {
    getInvitations().then((users) => {
      setUsers(users)
    })
  }, [])
  return (
    <View>
      <Header />
      {users.map((user) => <UserCard key={user.uid} user={user} setUsers={setUsers}/>)}
      {users.length === 0 && <Text style={styles.text}>No invitations</Text>}
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#7F817C',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})