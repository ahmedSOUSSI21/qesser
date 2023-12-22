import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { auth } from '../../core/firebaseConfig';

const username = () => {
  return auth.currentUser?.displayName;
};

const Header = () => {

  return (
    <View style={styles.nameAndImageContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{username()}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <Image source={require("../../assets/default-profile-picture.png")} style={styles.profilePicture} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;


const styles = StyleSheet.create({
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  nameAndImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    marginLeft: 10,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#2E3248',
    width: 70,
    height: 30,
    borderRadius: 10,
    padding: 5,
  },
  ratingtext: {
    color: 'white',
    fontWeight: 'bold',
  },
  star: {
    width: 15,
    height: 15,
    marginRight: 5,
  }
})