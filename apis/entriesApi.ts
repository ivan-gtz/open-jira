import axios from 'axios';

const entiresApi = axios.create({
    baseURL: '/api'
});

export default entiresApi;