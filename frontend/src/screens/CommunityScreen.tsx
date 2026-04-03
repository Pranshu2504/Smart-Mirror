import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const CommunityScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Community Screen</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#000' },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { color: '#D4AF37', fontSize: 24, fontWeight: 'bold' },
});

export default CommunityScreen;
