import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moodBoardService from '../services/moodBoardService';
import { useFocusEffect } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MoodBoardScreen = () => {
    const [moodBoards, setMoodBoards] = useState<any[]>([]);

    const fetchBoards = async () => {
        try {
            const data = await moodBoardService.getMoodBoards();
            setMoodBoards(data);
        } catch (error) {
            console.log('Error fetching mood boards', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchBoards();
        }, [])
    );

    const renderBoard = ({ item }: any) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <View style={styles.overlay}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardCount}>{item.notes || 'No notes'}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mood Boards</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={moodBoards}
                renderItem={renderBoard}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.list}
            />
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'serif',
    },
    addButton: {
        backgroundColor: '#D4AF37',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 20,
    },
    card: {
        height: 200,
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#222',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.7,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    cardTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardCount: {
        color: '#ccc',
        fontSize: 14,
    }
});

export default MoodBoardScreen;
