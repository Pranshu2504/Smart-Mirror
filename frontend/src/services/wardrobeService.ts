import api from './api';

const getItems = async () => {
    const response = await api.get('/wardrobe');
    return response.data;
};

const addItem = async (itemData: any) => {
    // If sending FormData, let axios handle the Content-Type automatically
    // or manually set it if needed, but usually axios detects FormData
    const response = await api.post('/wardrobe', itemData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const deleteItem = async (id: string) => {
    const response = await api.delete(`/wardrobe/${id}`);
    return response.data;
};

const wardrobeService = {
    getItems,
    addItem,
    deleteItem
};

export default wardrobeService;
