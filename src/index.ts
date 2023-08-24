import * as console from 'node:console';
import process from 'node:process';

import { faker } from '@faker-js/faker';
import express from 'express';
import { createClient } from 'redis';

declare module 'express-serve-static-core' {
	interface Request {
		client: () => Promise<ReturnType<typeof createClient>>;
	}
}

const app = express();

const doWorkOnRedis = async (client: ReturnType<typeof createClient>) => {
	const t0 = performance.now();
	for (let index = 0; index < 2; index++) {
		await client.set(faker.string.uuid(), faker.hacker.noun());
	}
	const t1 = performance.now();
	console.log(t1 - t0, 'milliseconds');
};

const main = async (port: number) => {
	app.get('*', async (_, res) => {
		try {
			/**
			 * One client per request
			 * Client not disconnected correctly
			 */
			const client = createClient({});
			await client.connect();
			await doWorkOnRedis(client);

			// await client.disconnect();
			// await new Promise((resolve) => setTimeout(resolve, 200));
			res.status(200).send('OK');
		} catch (error) {
			console.error(error);
			res.status(500);
			res.json(JSON.parse(JSON.stringify(error)));
		}
	});
	/**
	 * Client not disconnected correctly
	 */
	// app.get('*', async (_, res) => {
	// 	try {
	// 		const client = createClient({});
	// 		await client.connect();
	//
	// 		//const client = await request.client();
	//
	// 		const t0 = performance.now();
	// 		for (let index = 0; index < 10; index++) {
	// 			await client.set(faker.string.uuid(), faker.hacker.noun());
	// 		}
	// 		const t1 = performance.now();
	// 		console.log(t1 - t0, 'milliseconds');
	// 		res.status(200).send('OK');
	// 	} catch (error) {
	// 		console.error(error);
	// 		res.status(500);
	// 		res.json(JSON.parse(JSON.stringify(error)));
	// 	}
	// });

	return {
		client: undefined,
		app: app.listen(port, () => {
			console.log('server is running on port ' + port);
		}),
	};
};
console.log(process.pid);

Promise.all([8080, 8081, 8082, 8083, 8084].map((p) => main(p)))

	.then(async (servers) => {
		process.on('SIGTERM', async () => {
			await Promise.all(
				servers.map(async (s) => {
					s.app.close();

					// await s.client.disconnect();
				}),
			);
			process.exit(0);
		});
	})
	.catch((error) => {
		console.log(error);
	});
