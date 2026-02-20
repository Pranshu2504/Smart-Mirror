import api, { setAuthToken } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const register = async (userData: any) => {
    try {
        console.log('Attempting Register with:', userData);
        const response = await api.post('/users', userData);
        console.log('Register Response:', response.status, response.data);
        if (response.data.token) {
            await AsyncStorage.setItem('userToken', response.data.token);
            await AsyncStorage.setItem('userData', JSON.stringify(response.data));
            setAuthToken(response.data.token);
        }
        return response.data;
    } catch (error: any) {
        console.error('❌ REGISTER ERROR:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        } else if (error.request) {
            console.error('   No response received. Network error?', error.request);
        }
        throw error;
    }
};

const login = async (userData: any) => {
    try {
        console.log('Attempting Login with:', userData);
        const response = await api.post('/users/login', userData);
        console.log('Login Response:', response.status, response.data);
        if (response.data.token) {
            await AsyncStorage.setItem('userToken', response.data.token);
            await AsyncStorage.setItem('userData', JSON.stringify(response.data));
            setAuthToken(response.data.token);
        }
        return response.data;
    } catch (error: any) {
        console.error('❌ LOGIN ERROR:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        } else if (error.request) {
            console.error('   No response received. Network error?', error.request);
        }
        throw error;
    }
};

const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    setAuthToken(null);
};

const authService = {
    register,
    login,
    logout
};

export default authService;
