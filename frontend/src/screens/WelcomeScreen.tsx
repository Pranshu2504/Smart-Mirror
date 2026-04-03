import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Animated,
    Easing,
    TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');
const GOLD = '#D4AF37';

const WelcomeScreen = ({ navigation }: any) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const triggerAnimationAndNavigate = (route: string) => {
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            navigation.replace(route);
        }, 1500);
    };

    const leftRotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-110deg']
    });

    const rightRotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '110deg']
    });

    const buttonFade = rotateAnim.interpolate({
        inputRange: [0, 0.2],
        outputRange: [1, 0]
    });

    const leftDoorStyle = {
        transform: [
            { perspective: 1000 },
            { rotateY: leftRotate },
        ],
    };

    const rightDoorStyle = {
        transform: [
            { perspective: 1000 },
            { rotateY: rightRotate },
        ],
    };

    return (
        <View style={styles.container}>
            {/* Closet Interior */}
            <View style={styles.innerCloset} />

            {/* LEFT DOOR */}
            <Animated.View style={[styles.door, styles.leftDoor, leftDoorStyle]}>
                <View style={styles.doorFrame} />
                <View style={styles.handleLeft} />
            </Animated.View>

            {/* RIGHT DOOR */}
            <Animated.View style={[styles.door, styles.rightDoor, rightDoorStyle]}>
                <View style={styles.doorFrame} />
                <View style={styles.handleRight} />
            </Animated.View>

            {/* UI Overlay */}
            <Animated.View style={[styles.uiContainer, { opacity: buttonFade }]} pointerEvents="box-none">
                <SafeAreaView style={styles.safeArea} pointerEvents="box-none">
                    <View style={styles.branding} pointerEvents="none">
                        <Text style={styles.title}>ZORO</Text>
                        <Text style={styles.subtitle}>YOUR VIRTUAL CLOSET</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.primaryButton} 
                            onPress={() => triggerAnimationAndNavigate('Auth')}
                        >
                            <Text style={styles.primaryButtonText}>Log In / Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.secondaryButton} 
                            onPress={() => triggerAnimationAndNavigate('Home')}
                        >
                            <Text style={styles.secondaryButtonText}>Continue as Guest</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },

    innerCloset: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#0a0a0a',
    },

    door: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '50%',
        backgroundColor: '#0c0c0c',
        backfaceVisibility: 'hidden',
    },

    leftDoor: {
        left: 0,
        transformOrigin: 'left',
    },

    rightDoor: {
        right: 0,
        transformOrigin: 'right',
    },

    doorFrame: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 1,
        borderColor: '#111',
    },

    handleLeft: {
        position: 'absolute',
        right: 25,
        top: '40%',
        width: 12,
        height: 150,
        borderRadius: 6,
        backgroundColor: GOLD,
    },

    handleRight: {
        position: 'absolute',
        left: 25,
        top: '40%',
        width: 12,
        height: 150,
        borderRadius: 6,
        backgroundColor: GOLD,
    },

    uiContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
    },

    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 50,
        paddingHorizontal: 25,
    },

    branding: {
        alignItems: 'center',
        marginTop: 60,
    },

    title: {
        fontSize: 54,
        fontWeight: 'bold',
        color: GOLD,
        letterSpacing: 8,
    },

    subtitle: {
        color: '#ccc',
        fontSize: 14,
        letterSpacing: 4,
        marginTop: 10,
    },

    buttonContainer: {
        gap: 16,
        paddingBottom: 20,
    },

    primaryButton: {
        backgroundColor: GOLD,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },

    primaryButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },

    secondaryButton: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(212,175,55,0.3)',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },

    secondaryButtonText: {
        color: '#ddd',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default WelcomeScreen;