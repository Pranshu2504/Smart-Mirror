import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import wardrobeService from '../services/wardrobeService';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width - 60) / COLUMN_COUNT;

const CATEGORIES = ['All', 'Top', 'Bottom', 'Dress', 'Shoes', 'Accessory'];

const WardrobeScreen = ({ navigation }: any) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [items, setItems] = useState<any[]>([]);
    const [allItems, setAllItems] = useState<any[]>([]);

    const fetchItems = async () => {
        try {
            const data = await wardrobeService.getItems();
            setAllItems(data);
            setItems(data);
        } catch (error) {
            console.log('Error fetching items', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchItems();
        }, [])
    );

    useEffect(() => {
        if (selectedCategory === 'All') {
            setItems(allItems);
        } else {
            setItems(allItems.filter(item => item.category === selectedCategory));
        }
    }, [selectedCategory, allItems]);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.category} {item.subCategory}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Closet</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => (navigation as any).navigate('AddClothing')}>
                    <Ionicons name="add" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Category Filter */}
            <View style={styles.filterContainer}>
                <FlatList
                    horizontal
                    data={CATEGORIES}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.filterChip,
                                selectedCategory === item && styles.activeFilterChip
                            ]}
                            onPress={() => setSelectedCategory(item)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedCategory === item && styles.activeFilterText
                            ]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                />
            </View>

            {/* Grid */}
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                numColumns={COLUMN_COUNT}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
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
    filterContainer: {
        marginBottom: 20,
        height: 40,
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#222',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    activeFilterChip: {
        backgroundColor: '#D4AF37',
        borderColor: '#D4AF37',
    },
    filterText: {
        color: '#888',
        fontWeight: '600',
    },
    activeFilterText: {
        color: '#000',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        width: ITEM_WIDTH,
        marginBottom: 20,
        backgroundColor: '#1E1E1E',
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#333',
    },
    cardImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    cardTitle: {
        color: '#fff',
        fontSize: 14,
        padding: 10,
        fontWeight: '500',
    }
});

export default WardrobeScreen;
