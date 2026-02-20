import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import authService from '../services/authService';

const { width, height } = Dimensions.get('window');

const AuthScreen = ({ navigation }: any) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            if (isLogin) {
                await authService.login({ email, password });
                navigation.replace('Main');
            } else {
                await authService.register({
                    name: 'User',
                    email,
                    password,
                });
                await authService.login({ email, password });
                navigation.replace('Main');
            }
        } catch (error: any) {
            Alert.alert('Authentication Failed', error.message || 'Unknown error');
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/closet.png')}
                style={styles.backgroundImage}
            >
                <LinearGradient
                    colors={[
                        'rgba(0,0,0,0.4)',
                        'rgba(0,0,0,0.8)',
                        '#000',
                    ]}
                    style={styles.gradient}
                >
                    <SafeAreaView style={styles.contentContainer}>
                        <View style={styles.formContainer}>
                            <Text style={styles.formTitle}>
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </Text>

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#888"
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#888"
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                                <Text style={styles.buttonText}>
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.switchButton}
                                onPress={() => setIsLogin(!isLogin)}
                            >
                                <Text style={styles.switchText}>
                                    {isLogin
                                        ? "Don't have an account? Sign Up"
                                        : 'Already have an account? Login'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    backgroundImage: { flex: 1, width, height },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    contentContainer: { flex: 1, justifyContent: 'center' },
    formContainer: {
        backgroundColor: 'rgba(20,20,20,0.9)',
        padding: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    formTitle: {
        fontSize: 26,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        color: '#fff',
    },
    button: {
        backgroundColor: '#D4AF37',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#D4AF37',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    switchButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    switchText: {
        color: '#aaa',
        fontSize: 14,
    },
});

export default AuthScreen;
