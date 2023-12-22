import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, uploadToFirebase } from '../../core/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

const username = () => {
  return auth.currentUser?.displayName;
};


const Header = () => {
  const [image, setImage] = useState<string>(auth.currentUser?.photoURL || '');
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUploading(true);
      const filename = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/') + 1);
      uploadToFirebase(result.assets[0].uri, filename, (v: any) => {
        if (v == 100) {
          setUploading(false);
          if (result.assets) {
            setImage(result.assets[0].uri);
          }
        }
      })
    }
  }

  return (
    <View style={styles.nameAndImageContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{username()}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={image ? { uri: image } : require("../../assets/default-profile-picture.png")} style={styles.profilePicture} />
        </TouchableOpacity>
      </View>
      {uploading && <ActivityIndicator size="large" color="#ffffff" />}
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
})