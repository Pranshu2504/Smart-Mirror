import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TryOnScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Virtual Try-On</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={80} color="#555" />
                    <Text style={styles.placeholderText}>AI Avatar Placeholder</Text>
                    <Text style={styles.subText}>Select a photo to generate your avatar</Text>
                </View>

                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Upload Photo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    avatarContainer: {
        width: '100%',
        aspectRatio: 0.8,
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#333',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    placeholderText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
    },
    subText: {
        color: '#888',
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: '#D4AF37',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default TryOnScreen;
