import { io } from 'socket.io-client';
import { BASE_URL } from './endpoints';

const socket = io(BASE_URL);

export default socket;
