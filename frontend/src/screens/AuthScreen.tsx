import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Alert,
    Animated,
    Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import authService from '../services/authService';

const { width, height } = Dimensions.get('window');
const GOLD = '#D4AF37';

const AuthScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const progress = React.useRef(new Animated.Value(0)).current;
    const formOpacity = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 1300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(formOpacity, {
                toValue: 1,
                duration: 600,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        }, 800);
    }, [progress, formOpacity]);

    const leftRotate = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-80deg']
    });

    const rightRotate = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '80deg']
    });

    const formScale = formOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0.95, 1]
    });

    const leftDoorStyle = {
        transform: [
            { perspective: 1200 },
            { translateX: -width * 0.25 },
            { rotateY: leftRotate },
            { translateX: width * 0.25 },
        ],
    };

    const rightDoorStyle = {
        transform: [
            { perspective: 1200 },
            { translateX: width * 0.25 },
            { rotateY: rightRotate },
            { translateX: -width * 0.25 },
        ],
    };

    const formStyle = {
        opacity: formOpacity,
        transform: [{ scale: formScale }],
    };

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            await authService.login({ email, password });
            navigation.replace('Main');
        } catch (err: any) {
            Alert.alert('Authentication Failed', err.message);
        }
    };

    return (
        <View style={styles.container}>

            {/* CLOSET STRUCTURE */}
            <View style={styles.closetFrame}>

                {/* Top Frame */}
                <View style={styles.topFrame} />

                {/* Left Wall */}
                <View style={styles.leftWall} />

                {/* Right Wall */}
                <View style={styles.rightWall} />

                {/* Bottom Base */}
                <View style={styles.bottomBase} />

                {/* Interior */}
                <View style={styles.interior}>

                    {/* LED Strip */}
                    <LinearGradient
                        colors={['rgba(212,175,55,0.9)', 'rgba(212,175,55,0.2)', 'transparent']}
                        style={styles.ledGlow}
                    />

                    {/* Center Divider */}
                    <View style={styles.divider} />

                    {/* Left Section Rod */}
                    <View style={styles.rod} />

                    {/* Right Shelves */}
                    <View style={styles.shelf} />
                    <View style={[styles.shelf, { top: 240 }]} />
                    <View style={[styles.shelf, { top: 320 }]} />

                    {/* Drawer Stack */}
                    <View style={styles.drawerStack}>
                        {[1, 2, 3].map(i => (
                            <View key={i} style={styles.drawer} />
                        ))}
                    </View>
                </View>
            </View>

            {/* FORM */}
            <Animated.View style={[styles.formWrapper, formStyle]}>
                <SafeAreaView>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>ZORO</Text>

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            secureTextEntry
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleAuth}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Animated.View>

            {/* LEFT DOOR */}
            <Animated.View style={[styles.door, styles.leftDoor, leftDoorStyle]}>
                <View style={styles.doorInnerShadow} />
                <View style={styles.handleLeft} />
            </Animated.View>

            {/* RIGHT DOOR */}
            <Animated.View style={[styles.door, styles.rightDoor, rightDoorStyle]}>
                <View style={styles.doorInnerShadow} />
                <View style={styles.handleRight} />
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },

    closetFrame: {
        ...StyleSheet.absoluteFillObject,
    },

    topFrame: {
        position: 'absolute',
        top: 80,
        left: 30,
        right: 30,
        height: 20,
        backgroundColor: '#111',
    },

    leftWall: {
        position: 'absolute',
        top: 100,
        bottom: 120,
        left: 30,
        width: 20,
        backgroundColor: '#111',
    },

    rightWall: {
        position: 'absolute',
        top: 100,
        bottom: 120,
        right: 30,
        width: 20,
        backgroundColor: '#111',
    },

    bottomBase: {
        position: 'absolute',
        bottom: 120,
        left: 30,
        right: 30,
        height: 20,
        backgroundColor: '#111',
    },

    interior: {
        position: 'absolute',
        top: 100,
        bottom: 140,
        left: 50,
        right: 50,
        backgroundColor: '#0d0d0d',
    },

    ledGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
    },

    divider: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: 6,
        backgroundColor: '#151515',
    },

    rod: {
        position: 'absolute',
        top: 100,
        left: 20,
        right: '55%',
        height: 6,
        backgroundColor: '#1a1a1a',
    },

    shelf: {
        position: 'absolute',
        top: 160,
        left: '55%',
        right: 20,
        height: 10,
        backgroundColor: '#1a1a1a',
    },

    drawerStack: {
        position: 'absolute',
        bottom: 0,
        left: '55%',
        right: 20,
    },

    drawer: {
        height: 60,
        backgroundColor: '#141414',
        marginBottom: 4,
    },

    formWrapper: {
        position: 'absolute',
        top: '32%',
        left: 60,
        right: 60,
    },

    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 24,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },

    title: {
        fontSize: 24,
        color: GOLD,
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 4,
    },

    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 14,
        borderRadius: 10,
        marginBottom: 15,
        color: '#fff',
    },

    button: {
        backgroundColor: GOLD,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: '#111',
        fontWeight: '600',
    },

    door: {
        position: 'absolute',
        top: 80,
        bottom: 120,
        width: '50%',
        backgroundColor: '#121212',
    },

    leftDoor: { left: 0 },
    rightDoor: { right: 0 },

    doorInnerShadow: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    handleLeft: {
        position: 'absolute',
        right: 20,
        top: '40%',
        width: 10,
        height: 140,
        borderRadius: 6,
        backgroundColor: GOLD,
    },

    handleRight: {
        position: 'absolute',
        left: 20,
        top: '40%',
        width: 10,
        height: 140,
        borderRadius: 6,
        backgroundColor: GOLD,
    },
});

export default AuthScreen;
