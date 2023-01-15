import express from 'express';
import mongoose from 'mongoose';
import router from './router';
import http from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017').then(() => {
	console.log('mongodb connected.');
	const port = process.env.PORT || 3333;

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', '*');
		res.setHeader('Access-Control-Allow-Headers', '*');
		next();
	})
	app.use('/uploads', express.static('uploads'));
	app.use(express.urlencoded());
	app.use(express.json());
	app.use(router);
	server.listen(port, () => console.log(`listening on port ${port}`));
}).catch((err) => console.log(`Error connecting to mongo: ${err}`));