import React from 'react';
import { View, Text, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import SignInForm from '../components/Auth/SignInForm';
import RegisterForm from '../components/Auth/RegisterForm';
import Splash from '../components/splash/Splash';
import ForgotPassword from '../components/Auth/ForgotPassword';

const Auth = () => {
    const [activeTab, setActiveTab] = React.useState('splash' as string)

    if (activeTab == "splash") {
        return <Splash setActiveTab={setActiveTab} nextScreen='login' />
    }

    return (
        <ImageBackground
            source={require('../assets/background-for-auth.jpg')}
            style={styles.backgroundImage}
            imageStyle={{ opacity: 0.4 }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Qesser</Text>
                <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <View style={styles.choiceContainer}>
                        <TouchableOpacity style={[styles.choice, activeTab=="login" && styles.choiceActive]} onPress={() => setActiveTab("login")}>
                            <Text style={styles.label}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.choice, activeTab=="register" && styles.choiceActive]} onPress={() => setActiveTab("register")}>
                            <Text style={styles.label}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.choice, activeTab=="forget" && styles.choiceActive]} onPress={() => setActiveTab("forget")}>
                            <Text style={styles.label}>Forgot password</Text>
                        </TouchableOpacity>
                    </View>
                    {activeTab == "login" && <SignInForm />}
                    {activeTab == "register" && <RegisterForm />}
                    {activeTab == "forget" && <ForgotPassword />}
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 50,
    },
    label: {
        color: 'gray',
        fontSize: 12,
        fontWeight: 'bold',
    },
    formContainer: {
        width: 310,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
    },
    choiceContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    }, 
    choice:{
        flex: 1,
        alignItems: 'center',
        padding: 10,
    }, 
    choiceActive:{
        borderBottomWidth: 3,
        borderBottomColor: 'gray',
    }
});

export default Auth;
