import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { auth, db } from '../../core/firebaseConfig'
import { getDoc, doc } from 'firebase/firestore'
import React from 'react'
import Header from './Header'
import FriendCard from './FriendCard'
const Messages = () => {

  const getFriends = async () => {
    if (auth.currentUser == null) {
      throw new Error("User is null")
    }

    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("User does not exist")
    }

    const friends = docSnap.data().friends;
    const users = await Promise.all(friends.map(async (friend: any) => {
      const userDocRef = doc(db, "users", friend);
      const userDocSnap = await getDoc(userDocRef);
      return userDocSnap.data();
    }))
    return users;
  }

  const [users, setUsers] = React.useState([] as any[])
  React.useEffect(() => {
    getFriends().then((users) => {
      setUsers(users)
    })
  }, [])
  return (
    <View>
      <Header />
      {users.length === 0 && <Text style={styles.text}>No friends</Text>}
      <ScrollView>
        {users.map((user) => <FriendCard key={user.uid} user={user} />)}
      </ScrollView>
    </View>
  )
}

export default Messages

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