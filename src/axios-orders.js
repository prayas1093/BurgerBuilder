import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-a28a3.firebaseio.com/'
});

export default instance;