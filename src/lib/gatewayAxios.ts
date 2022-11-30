
import axios from 'axios';

if (!import.meta.env.VITE_BACKEND_SCHEME) throw Error('VITE_BACKEND_SCHEME is missing in .env');
if (!import.meta.env.VITE_BACKEND_DOMAN) throw Error('VITE_BACKEND_DOMAN is missing in .env');
if (!import.meta.env.VITE_BACKEND_PORT) throw Error('VITE_BACKEND_PORT is missing in .env');

const VITE_BACKEND_SCHEME = import.meta.env.VITE_BACKEND_SCHEME;
const VITE_BACKEND_DOMAN = import.meta.env.VITE_BACKEND_DOMAN;
const VITE_BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export const gatewayAxios = axios.create({
    withCredentials: true,
    baseURL: `${VITE_BACKEND_SCHEME}://${VITE_BACKEND_DOMAN}:${VITE_BACKEND_PORT}`
});