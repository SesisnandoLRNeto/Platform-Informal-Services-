import axios from 'axios';
import Constants from 'expo-constants';

const { debuggerHost } = Constants.manifest;

const uri = debuggerHost && `http://${debuggerHost.split(':').shift()}:3000`;

const api = axios.create({
  baseURL: uri,
});

export default api;
