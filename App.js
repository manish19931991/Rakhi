import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken, Profile } from 'react-native-fbsdk-next'

const App = () => {
  const [porfilephoto, setporfilephoto] = useState("1")
  const [porfileimage, setporfileimage] = useState("1")
  useEffect(() => {
    GoogleSignin.configure();
}, [])

const googlelogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();
        const userInfo = await GoogleSignin.signIn();
        console.log("user info", userInfo);
        setporfilephoto(userInfo.user.photo);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log(error);
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error);
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error);
        } else {
            console.log(error);
        }
    }
};
  return (
    <View style={{alignSelf:"center"}}>
       <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View>
                        <Image source={{ uri: porfilephoto }} style={{
                            width: 200,
                            height: 200,
                            borderRadius: 100,
                            alignItems: "center", marginTop: 20
                        }} />
                    </View>
    <TouchableOpacity
        style={{  backgroundColor: '#a00000',
        width: 190,
        height: 30,
        justifyContent:"center",
        alignSelf:"center",
        alignSelf: "center",
        borderRadius: 5, }}
        onPress={googlelogin}>
        <Text style={{ paddingTop: 14,
                fontSize: 15,
                paddingTop:2,
                color: 'white',
                alignSelf: "center",
                fontWeight: "bold"}}>Google login</Text>
    </TouchableOpacity>
    </View>
    <View style={{ marginTop: 10 }}>
                        <View>
                            <LoginButton
                                onLoginFinished={
                                    (error, result) => {
                                        if (error) {
                                            console.log("login has error: " + result.error);
                                        } else if (result.isCancelled) {
                                            console.log("login is cancelled.");
                                        } else {
                                            AccessToken.getCurrentAccessToken().then(data => {
                                                console.log(data)
                                            }
                                            ); const currentProfile = Profile.getCurrentProfile().then(
                                                function (currentProfile) {
                                                    if (currentProfile) {
                                                        console.log(currentProfile);
                                                        setporfileimage(currentProfile.imageURL)
                                                    }
                                                }

                                            );
                                        }
                                    }}

                                onLogoutFinished={() => console.log("logout.")} />
                        </View>
                        <View>
                            {porfileimage !== "" && (
                                <Image
                                    source={{ uri: porfileimage }}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: 100,
                                        marginTop: 10,
                                        alignItems: "center"
                                    }} /> )}
                        </View>
                    </View>
    </View>

  )
}

export default App