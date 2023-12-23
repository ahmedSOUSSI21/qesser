import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchInput from './SearchInput'
import UserCard from './UserCard'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../core/firebaseConfig'

const Search = () => {
  const [users, setUsers] = React.useState([] as any[])
  const [currentUser, setCurrentUser] = React.useState({} as any)


  React.useEffect(() => {
    (async () => {
      if (auth.currentUser == null) {
        throw new Error("User is null")
      }
      const user = (await getDoc(doc(db, "users", auth.currentUser.uid))).data();
      if (user == null) {
        throw new Error("User is null")
      }
      setCurrentUser(user)
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SearchInput setUsers={setUsers}/>
      {users.map((user) => <UserCard key={user.uid} user={user} currentUser={currentUser}/>)}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
})