import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import Header from './Header'
import Logout from './Logout'
const Profile = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <Logout />
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})