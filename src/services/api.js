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
    // Characters

    getCharacters() {
        return apiClient.get('/character');
    },

    getCharactersById(id) {
        return apiClient.get(`/character/${id.toString()}`);
    },

    // Episodes

    getEpisodes() {
        return apiClient.get('/episode');
    },

    getEpisodesByFilter({ name, episode, page }) {
        return apiClient.get('/episode', {
            params: { name, episode, page },
        });
    },

    getEpisodesById(id) {
        return apiClient.get(`/episode/${id.toString()}`);
    },

    // Locations

    getLocations() {
        return apiClient.get('/location');
    },

    getLocationsByFilter({ name, type, dimension, page }) {
        return apiClient.get('/location', {
            params: { name, type, dimension, page },
        });
    },

    getLocationsById(id) {
        return apiClient.get(`/location/${id.toString()}`);
    },
};
