"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _nodeconsole = /*#__PURE__*/ _interop_require_wildcard._(require("node:console"));
const _nodeprocess = /*#__PURE__*/ _interop_require_default._(require("node:process"));
const _faker = require("@faker-js/faker");
const _express = /*#__PURE__*/ _interop_require_default._(require("express"));
const _redis = require("redis");
const app = (0, _express.default)();
const doWorkOnRedis = async (client)=>{
    const t0 = performance.now();
    for(let index = 0; index < 2; index++){
        await client.set(_faker.faker.string.uuid(), _faker.faker.hacker.noun());
    }
    const t1 = performance.now();
    _nodeconsole.log(t1 - t0, "milliseconds");
};
const main = async (port)=>{
    app.get("*", async (_, res)=>{
        try {
            /**
			 * One client per request
			 * Client not disconnected correctly
			 */ const client = (0, _redis.createClient)({});
            await client.connect();
            await doWorkOnRedis(client);
            // await client.disconnect();
            // await new Promise((resolve) => setTimeout(resolve, 200));
            res.status(200).send("OK");
        } catch (error) {
            _nodeconsole.error(error);
            res.status(500);
            res.json(JSON.parse(JSON.stringify(error)));
        }
    });
    /**
	 * Client not disconnected correctly
	 */ // app.get('*', async (_, res) => {
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
        app: app.listen(port, ()=>{
            _nodeconsole.log("server is running on port " + port);
        })
    };
};
_nodeconsole.log(_nodeprocess.default.pid);
Promise.all([
    8080,
    8081,
    8082,
    8083,
    8084
].map((p)=>main(p))).then(async (servers)=>{
    _nodeprocess.default.on("SIGTERM", async ()=>{
        await Promise.all(servers.map(async (s)=>{
            s.app.close();
        // await s.client.disconnect();
        }));
        _nodeprocess.default.exit(0);
    });
}).catch((error)=>{
    _nodeconsole.log(error);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb25zb2xlIGZyb20gJ25vZGU6Y29uc29sZSc7XG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuXG5pbXBvcnQgeyBmYWtlciB9IGZyb20gJ0BmYWtlci1qcy9mYWtlcic7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ3JlZGlzJztcblxuZGVjbGFyZSBtb2R1bGUgJ2V4cHJlc3Mtc2VydmUtc3RhdGljLWNvcmUnIHtcblx0aW50ZXJmYWNlIFJlcXVlc3Qge1xuXHRcdGNsaWVudDogKCkgPT4gUHJvbWlzZTxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+Pjtcblx0fVxufVxuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmNvbnN0IGRvV29ya09uUmVkaXMgPSBhc3luYyAoY2xpZW50OiBSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+KSA9PiB7XG5cdGNvbnN0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAyOyBpbmRleCsrKSB7XG5cdFx0YXdhaXQgY2xpZW50LnNldChmYWtlci5zdHJpbmcudXVpZCgpLCBmYWtlci5oYWNrZXIubm91bigpKTtcblx0fVxuXHRjb25zdCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRjb25zb2xlLmxvZyh0MSAtIHQwLCAnbWlsbGlzZWNvbmRzJyk7XG59O1xuXG5jb25zdCBtYWluID0gYXN5bmMgKHBvcnQ6IG51bWJlcikgPT4ge1xuXHRhcHAuZ2V0KCcqJywgYXN5bmMgKF8sIHJlcykgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHQvKipcblx0XHRcdCAqIE9uZSBjbGllbnQgcGVyIHJlcXVlc3Rcblx0XHRcdCAqIENsaWVudCBub3QgZGlzY29ubmVjdGVkIGNvcnJlY3RseVxuXHRcdFx0ICovXG5cdFx0XHRjb25zdCBjbGllbnQgPSBjcmVhdGVDbGllbnQoe30pO1xuXHRcdFx0YXdhaXQgY2xpZW50LmNvbm5lY3QoKTtcblx0XHRcdGF3YWl0IGRvV29ya09uUmVkaXMoY2xpZW50KTtcblxuXHRcdFx0Ly8gYXdhaXQgY2xpZW50LmRpc2Nvbm5lY3QoKTtcblx0XHRcdC8vIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMCkpO1xuXHRcdFx0cmVzLnN0YXR1cygyMDApLnNlbmQoJ09LJyk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0cmVzLnN0YXR1cyg1MDApO1xuXHRcdFx0cmVzLmpzb24oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlcnJvcikpKTtcblx0XHR9XG5cdH0pO1xuXHQvKipcblx0ICogQ2xpZW50IG5vdCBkaXNjb25uZWN0ZWQgY29ycmVjdGx5XG5cdCAqL1xuXHQvLyBhcHAuZ2V0KCcqJywgYXN5bmMgKF8sIHJlcykgPT4ge1xuXHQvLyBcdHRyeSB7XG5cdC8vIFx0XHRjb25zdCBjbGllbnQgPSBjcmVhdGVDbGllbnQoe30pO1xuXHQvLyBcdFx0YXdhaXQgY2xpZW50LmNvbm5lY3QoKTtcblx0Ly9cblx0Ly8gXHRcdC8vY29uc3QgY2xpZW50ID0gYXdhaXQgcmVxdWVzdC5jbGllbnQoKTtcblx0Ly9cblx0Ly8gXHRcdGNvbnN0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdC8vIFx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMTA7IGluZGV4KyspIHtcblx0Ly8gXHRcdFx0YXdhaXQgY2xpZW50LnNldChmYWtlci5zdHJpbmcudXVpZCgpLCBmYWtlci5oYWNrZXIubm91bigpKTtcblx0Ly8gXHRcdH1cblx0Ly8gXHRcdGNvbnN0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdC8vIFx0XHRjb25zb2xlLmxvZyh0MSAtIHQwLCAnbWlsbGlzZWNvbmRzJyk7XG5cdC8vIFx0XHRyZXMuc3RhdHVzKDIwMCkuc2VuZCgnT0snKTtcblx0Ly8gXHR9IGNhdGNoIChlcnJvcikge1xuXHQvLyBcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdC8vIFx0XHRyZXMuc3RhdHVzKDUwMCk7XG5cdC8vIFx0XHRyZXMuanNvbihKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVycm9yKSkpO1xuXHQvLyBcdH1cblx0Ly8gfSk7XG5cblx0cmV0dXJuIHtcblx0XHRjbGllbnQ6IHVuZGVmaW5lZCxcblx0XHRhcHA6IGFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coJ3NlcnZlciBpcyBydW5uaW5nIG9uIHBvcnQgJyArIHBvcnQpO1xuXHRcdH0pLFxuXHR9O1xufTtcbmNvbnNvbGUubG9nKHByb2Nlc3MucGlkKTtcblxuUHJvbWlzZS5hbGwoWzgwODAsIDgwODEsIDgwODIsIDgwODMsIDgwODRdLm1hcCgocCkgPT4gbWFpbihwKSkpXG5cblx0LnRoZW4oYXN5bmMgKHNlcnZlcnMpID0+IHtcblx0XHRwcm9jZXNzLm9uKCdTSUdURVJNJywgYXN5bmMgKCkgPT4ge1xuXHRcdFx0YXdhaXQgUHJvbWlzZS5hbGwoXG5cdFx0XHRcdHNlcnZlcnMubWFwKGFzeW5jIChzKSA9PiB7XG5cdFx0XHRcdFx0cy5hcHAuY2xvc2UoKTtcblxuXHRcdFx0XHRcdC8vIGF3YWl0IHMuY2xpZW50LmRpc2Nvbm5lY3QoKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXHRcdFx0cHJvY2Vzcy5leGl0KDApO1xuXHRcdH0pO1xuXHR9KVxuXHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR9KTtcbiJdLCJuYW1lcyI6WyJhcHAiLCJleHByZXNzIiwiZG9Xb3JrT25SZWRpcyIsImNsaWVudCIsInQwIiwicGVyZm9ybWFuY2UiLCJub3ciLCJpbmRleCIsInNldCIsImZha2VyIiwic3RyaW5nIiwidXVpZCIsImhhY2tlciIsIm5vdW4iLCJ0MSIsImNvbnNvbGUiLCJsb2ciLCJtYWluIiwicG9ydCIsImdldCIsIl8iLCJyZXMiLCJjcmVhdGVDbGllbnQiLCJjb25uZWN0Iiwic3RhdHVzIiwic2VuZCIsImVycm9yIiwianNvbiIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInVuZGVmaW5lZCIsImxpc3RlbiIsInByb2Nlc3MiLCJwaWQiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwicCIsInRoZW4iLCJzZXJ2ZXJzIiwib24iLCJzIiwiY2xvc2UiLCJleGl0IiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozt1RUFBeUI7c0VBQ0w7dUJBRUU7a0VBQ0Y7dUJBQ1M7QUFRN0IsTUFBTUEsTUFBTUMsSUFBQUEsZ0JBQU87QUFFbkIsTUFBTUMsZ0JBQWdCLE9BQU9DO0lBQzVCLE1BQU1DLEtBQUtDLFlBQVlDLEdBQUc7SUFDMUIsSUFBSyxJQUFJQyxRQUFRLEdBQUdBLFFBQVEsR0FBR0EsUUFBUztRQUN2QyxNQUFNSixPQUFPSyxHQUFHLENBQUNDLFlBQUssQ0FBQ0MsTUFBTSxDQUFDQyxJQUFJLElBQUlGLFlBQUssQ0FBQ0csTUFBTSxDQUFDQyxJQUFJO0lBQ3hEO0lBQ0EsTUFBTUMsS0FBS1QsWUFBWUMsR0FBRztJQUMxQlMsYUFBUUMsR0FBRyxDQUFDRixLQUFLVixJQUFJO0FBQ3RCO0FBRUEsTUFBTWEsT0FBTyxPQUFPQztJQUNuQmxCLElBQUltQixHQUFHLENBQUMsS0FBSyxPQUFPQyxHQUFHQztRQUN0QixJQUFJO1lBQ0g7OztJQUdDLEdBQ0QsTUFBTWxCLFNBQVNtQixJQUFBQSxtQkFBWSxFQUFDLENBQUM7WUFDN0IsTUFBTW5CLE9BQU9vQixPQUFPO1lBQ3BCLE1BQU1yQixjQUFjQztZQUVwQiw2QkFBNkI7WUFDN0IsNERBQTREO1lBQzVEa0IsSUFBSUcsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztRQUN0QixFQUFFLE9BQU9DLE9BQU87WUFDZlgsYUFBUVcsS0FBSyxDQUFDQTtZQUNkTCxJQUFJRyxNQUFNLENBQUM7WUFDWEgsSUFBSU0sSUFBSSxDQUFDQyxLQUFLQyxLQUFLLENBQUNELEtBQUtFLFNBQVMsQ0FBQ0o7UUFDcEM7SUFDRDtJQUNBOztFQUVDLEdBQ0QsbUNBQW1DO0lBQ25DLFNBQVM7SUFDVCxxQ0FBcUM7SUFDckMsNEJBQTRCO0lBQzVCLEVBQUU7SUFDRiw2Q0FBNkM7SUFDN0MsRUFBRTtJQUNGLGtDQUFrQztJQUNsQywrQ0FBK0M7SUFDL0MsaUVBQWlFO0lBQ2pFLE1BQU07SUFDTixrQ0FBa0M7SUFDbEMsMENBQTBDO0lBQzFDLGdDQUFnQztJQUNoQyxxQkFBcUI7SUFDckIsMEJBQTBCO0lBQzFCLHFCQUFxQjtJQUNyQixpREFBaUQ7SUFDakQsS0FBSztJQUNMLE1BQU07SUFFTixPQUFPO1FBQ052QixRQUFRNEI7UUFDUi9CLEtBQUtBLElBQUlnQyxNQUFNLENBQUNkLE1BQU07WUFDckJILGFBQVFDLEdBQUcsQ0FBQywrQkFBK0JFO1FBQzVDO0lBQ0Q7QUFDRDtBQUNBSCxhQUFRQyxHQUFHLENBQUNpQixvQkFBTyxDQUFDQyxHQUFHO0FBRXZCQyxRQUFRQyxHQUFHLENBQUM7SUFBQztJQUFNO0lBQU07SUFBTTtJQUFNO0NBQUssQ0FBQ0MsR0FBRyxDQUFDLENBQUNDLElBQU1yQixLQUFLcUIsS0FFekRDLElBQUksQ0FBQyxPQUFPQztJQUNaUCxvQkFBTyxDQUFDUSxFQUFFLENBQUMsV0FBVztRQUNyQixNQUFNTixRQUFRQyxHQUFHLENBQ2hCSSxRQUFRSCxHQUFHLENBQUMsT0FBT0s7WUFDbEJBLEVBQUUxQyxHQUFHLENBQUMyQyxLQUFLO1FBRVgsK0JBQStCO1FBQ2hDO1FBRURWLG9CQUFPLENBQUNXLElBQUksQ0FBQztJQUNkO0FBQ0QsR0FDQ0MsS0FBSyxDQUFDLENBQUNuQjtJQUNQWCxhQUFRQyxHQUFHLENBQUNVO0FBQ2IifQ==