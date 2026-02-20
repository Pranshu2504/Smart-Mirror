import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Alert,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import wardrobeService from '../services/wardrobeService';

const { width } = Dimensions.get('window');

const CATEGORIES = ['Top', 'Bottom', 'Dress', 'Shoes', 'Accessory'];

const AddClothingScreen = ({ navigation }: any) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageType, setImageType] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [subCategory, setSubCategory] = useState('');
    const [color, setColor] = useState('');
    const [loading, setLoading] = useState(false);

    const selectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
        });

        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            setImageUri(asset.uri || null);
            setImageType(asset.type || null);
            setImageName(asset.fileName || null);
        }
    };

    const handleUpload = async () => {
        if (!imageUri) {
            Alert.alert('Error', 'Please select an image');
            return;
        }

        setLoading(true);
        try {
            // Create FormData
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                type: imageType || 'image/jpeg',
                name: imageName || 'upload.jpg',
            });
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('color', color);

            await wardrobeService.addItem(formData);
            Alert.alert('Success', 'Item added to wardrobe!');
            navigation.goBack();

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to upload item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Add New Item</Text>
                <TouchableOpacity onPress={handleUpload} disabled={loading}>
                    <Text style={[styles.saveText, loading && { color: '#666' }]}>
                        {loading ? 'Saving...' : 'Save'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity style={styles.imageUpload} onPress={selectImage}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
                    ) : (
                        <View style={styles.uploadPlaceholder}>
                            <Ionicons name="camera-outline" size={40} color="#D4AF37" />
                            <Text style={styles.uploadText}>Select Image</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.categoryContainer}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryChip,
                                    category === cat && styles.activeCategoryChip
                                ]}
                                onPress={() => setCategory(cat)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    category === cat && styles.activeCategoryText
                                ]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Sub Category (e.g. Jeans, T-Shirt)</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#666"
                        placeholder="Type here..."
                        value={subCategory}
                        onChangeText={setSubCategory}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Color</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#666"
                        placeholder="e.g. Blue, Black"
                        value={color}
                        onChangeText={setColor}
                    />
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    saveText: {
        fontSize: 16,
        color: '#D4AF37',
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    imageUpload: {
        width: '100%',
        height: 300,
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        marginBottom: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#333',
        borderStyle: 'dashed',
    },
    uploadPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    uploadText: {
        color: '#888',
        marginTop: 10,
        fontSize: 16,
    },
    formGroup: {
        marginBottom: 25,
    },
    label: {
        color: '#888',
        marginBottom: 10,
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    input: {
        backgroundColor: '#1E1E1E',
        color: '#fff',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#222',
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    activeCategoryChip: {
        backgroundColor: '#D4AF37',
        borderColor: '#D4AF37',
    },
    categoryText: {
        color: '#888',
    },
    activeCategoryText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default AddClothingScreen;
