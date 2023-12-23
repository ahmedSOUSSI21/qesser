import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchInput from './SearchInput'
import UserCard from './UserCard'

const Search = () => {
  const [users, setUsers] = React.useState([] as any[])
  return (
    <View style={styles.container}>
      <SearchInput setUsers={setUsers}/>
      {users.map((user) => <UserCard key={user.uid} user={user}/>)}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
})