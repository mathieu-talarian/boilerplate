import * as console from 'node:console';
import process from 'node:process';

import { faker } from '@faker-js/faker';
import express, { response } from 'express';
import { createClient } from 'redis';

declare module 'express-serve-static-core' {
	interface Request {
		client: () => Promise<ReturnType<typeof createClient>>;
	}
}

const app = express();

const main = async (port: number) => {
	const client = createClient({});
	await client.connect();
	app.use((request, _response, next) => {
		request.client = async function () {
			return client;
		};
		next();
	});

	app.get('*', async (request, res, next) => {
		try {
			const client = await request.client();

			const t0 = performance.now();
			for (let index = 0; index < 10; index++) {
				await client.set(faker.string.uuid(), faker.hacker.noun());
			}
			const t1 = performance.now();
			// console.log(t1 - t0, 'milliseconds');
			// await client.disconnect();
			// await new Promise((resolve) => setTimeout(resolve, 200));
			res.status(200).send('OK');
		} catch (error) {
			console.error(error);
			res.status(500);
			res.json(JSON.parse(JSON.stringify(error)));
		}
	});

	return app.listen(port, () => {
		console.log('server is running on port ' + port);
	});
};
console.log(process.pid);

Promise.all([8080, 8081, 8082, 8083, 8084].map((p) => main(p)))

	.then(async () => {
		//const axios = require('axios');
		//for (let index = 0; index < 5000; index++) {
		//await axios.get('http://localhost:8080');
		//}
	})
	.catch((error) => {
		console.log(error);
	});
