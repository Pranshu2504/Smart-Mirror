const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testAPI = async () => {
    try {
        console.log('1. Testing Health Check...');
        try {
            const res = await axios.get('http://localhost:5000/');
            console.log('✅ Health Check Passed:', res.data);
        } catch (e) {
            console.error('❌ Health Check Failed:', e.message);
        }

        console.log('\n2. Testing User Registration...');
        const testUser = {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'password123'
        };

        try {
            const regRes = await axios.post(`${API_URL}/users`, testUser);
            console.log('✅ Registration Passed:', regRes.data);

            const token = regRes.data.token;
            console.log('   Token received');

            console.log('\n3. Testing Get Me (Protected Route)...');
            const meRes = await axios.get(`${API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Get Me Passed:', meRes.data);

        } catch (e) {
            console.error('❌ Registration/Auth Failed:', e.response ? e.response.data : e.message);
        }

    } catch (error) {
        console.error('Unexpected Error:', error);
    }
};

testAPI();
