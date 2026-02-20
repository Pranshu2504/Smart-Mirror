import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header / Weather Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.date}>Wednesday, Nov 23</Text>
                        <Text style={styles.greeting}>Good Morning, Chloe</Text>
                    </View>
                    <View style={styles.weatherContainer}>
                        <Ionicons name="cloud-outline" size={24} color="#fff" />
                        <Text style={styles.weatherText}>14°C</Text>
                    </View>
                </View>

                {/* Hero Section / Daily Outfit */}
                <View style={styles.heroSection}>
                    <Text style={styles.sectionTitle}>Today's Outfit</Text>
                    <View style={styles.outfitCard}>
                        <View style={styles.cardContent}>
                            <Text style={styles.outfitName}>Professional Casual</Text>
                            <Text style={styles.outfitDesc}>Based on rainy weather</Text>
                            <TouchableOpacity style={styles.viewButton}>
                                <Text style={styles.viewButtonText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2683&auto=format&fit=crop' }}
                            style={styles.outfitImage}
                        />
                    </View>
                </View>

                {/* Quick Actions Grid */}
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.gridItem} onPress={() => (navigation as any).navigate('Wardrobe')}>
                        <View style={[styles.iconContainer, { backgroundColor: '#2A2A2A' }]}>
                            <Ionicons name="shirt-outline" size={28} color="#D4AF37" />
                        </View>
                        <Text style={styles.gridLabel}>Plan Fit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.gridItem} onPress={() => (navigation as any).navigate('MoodBoard')}>
                        <View style={[styles.iconContainer, { backgroundColor: '#2A2A2A' }]}>
                            <Ionicons name="heart-outline" size={28} color="#FF6F61" />
                        </View>
                        <Text style={styles.gridLabel}>Saved</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.gridItem} onPress={() => (navigation as any).navigate('TryOn')}>
                        <View style={[styles.iconContainer, { backgroundColor: '#2A2A2A' }]}>
                            <Ionicons name="camera-outline" size={28} color="#4A90E2" />
                        </View>
                        <Text style={styles.gridLabel}>Try On</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Items */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>New Additions</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {[1, 2, 3, 4].map((item) => (
                            <View key={item} style={styles.itemCard}>
                                <View style={styles.itemImagePlaceholder} />
                            </View>
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    date: {
        color: '#888',
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    greeting: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
    },
    weatherContainer: {
        backgroundColor: '#222',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    weatherText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '600',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
    },
    heroSection: {
        marginBottom: 30,
    },
    outfitCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        height: 200,
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#333',
    },
    cardContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    outfitName: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    outfitDesc: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 20,
    },
    viewButton: {
        backgroundColor: '#D4AF37',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        alignSelf: 'flex-start',
    },
    viewButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12,
    },
    outfitImage: {
        width: '40%',
        height: '100%',
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    gridItem: {
        alignItems: 'center',
        width: width / 3.5,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    gridLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    section: {
        marginBottom: 20,
    },
    horizontalScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    itemCard: {
        width: 120,
        height: 150,
        backgroundColor: '#222',
        borderRadius: 15,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#333',
    },
    itemImagePlaceholder: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: '#333',
        margin: 5,
    }
});

export default HomeScreen;
