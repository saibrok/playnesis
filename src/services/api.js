import axios from 'axios';
const baseUrl = 'https://rickandmortyapi.com/api';

const apiClient = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    getCharacters() {
        return apiClient.get('/character');
    },
};
