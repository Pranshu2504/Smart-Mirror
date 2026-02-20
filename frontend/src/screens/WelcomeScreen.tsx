import React from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Pressable,
    Text,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: any) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
        scale.value = withTiming(1.15, { duration: 800 });

        setTimeout(() => {
            navigation.navigate('Auth');
        }, 600);
    };

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <Animated.View style={[styles.backgroundWrapper, animatedStyle]}>
                <ImageBackground
                    source={require('../assets/closet.png')}
                    style={styles.backgroundImage}
                >
                    <LinearGradient
                        colors={[
                            'rgba(212,175,55,0.08)',
                            'rgba(0,0,0,0.6)',
                            '#000',
                        ]}
                        style={styles.gradient}
                    >
                        <SafeAreaView style={styles.contentContainer}>
                            <View style={styles.branding}>
                                <Text style={styles.title}>ZORO</Text>
                            </View>
                        </SafeAreaView>
                    </LinearGradient>
                </ImageBackground>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundWrapper: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    branding: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#D4AF37',
        textAlign: 'center',
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 14,
        color: '#ccc',
        textAlign: 'center',
        letterSpacing: 3,
        textTransform: 'uppercase',
        marginTop: 8,
    },
});

export default WelcomeScreen;
