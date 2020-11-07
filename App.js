import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//import basic react native components
import { BottomSheet } from 'react-native-btr';
//import to show social icons
import { SocialIcon } from 'react-native-elements';
// make sure you have installed the image crop libary from npm 
//  npm install expo-image-picker
// and 
//npm install --save native-base

// import to camera libaray
import { Camera } from 'expo-camera';


export default function App() {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  // requesting permission for cameraroll 
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }

      }
    })();
  }, []);


  // requesting camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // image images fro gallery 
  const pickImageFromGallery = async () => {
    setVisible(false)

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhotoFromCamera = async () => {
    setVisible(false)
    let resutl = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!resutl.cancelled) {
      setImage(resutl.uri);
    }
  }

  const cancelUploadPhoto = () => {
    setVisible(false)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container1}>
        <View style={styles.container}>


          <Image
            defaultSource={require('./assets/no_profile_image.png')}
            source={{ uri: image }}
            style={styles.imageStyle} />


          <StatusBar style="auto" />

          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
            }}>
            Example of Bottom Sheet in React Native
        </Text>

          <Button
            onPress={toggleBottomNavigationView}
            //on Press of the button bottom sheet will be visible
            title="Show Bottom Sheet"
          />
          <BottomSheet
            visible={visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={toggleBottomNavigationView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
          >
            {/* BottomSheet child view  */}
            <View style={styles.bottomSheetContainer}>

              <Text style={styles.textUploadPhoto}>Upload Photo</Text>

              <TouchableOpacity
                onPress={takePhotoFromCamera}
                style={styles.btnTakePhotoStyle}>
                <Text style={styles.textTakePhoto}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={pickImageFromGallery}
                style={styles.btnTakePhotoStyle}>
                <Text style={styles.textTakePhoto}>Choose From Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={cancelUploadPhoto}
                style={styles.btnCancelStyle}>
                <Text style={styles.textTakePhoto}>Cancel</Text>
              </TouchableOpacity>

            </View>

          </BottomSheet>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTakePhotoStyle: {
    backgroundColor: '#003778',
    padding: 10,
    marginHorizontal: 16,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 4,
    marginBottom: 8,
    borderRadius: 6
  },
  btnCancelStyle: {
    backgroundColor: '#003778',
    padding: 10,
    marginHorizontal: 16,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 4,
    marginBottom: 26,
    borderRadius: 6
  },

  container1: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTakePhoto: {
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff'
  },
  textUploadPhoto: {
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#333333',
    marginTop: 12,
    marginBottom: 12
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 400 / 2
  }
});
