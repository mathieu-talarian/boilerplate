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
const main = async (port)=>{
    const client = (0, _redis.createClient)({});
    await client.connect();
    app.use((request, _response, next)=>{
        request.client = async function() {
            return client;
        };
        next();
    });
    app.get("*", async (request, res, next)=>{
        try {
            const client = await request.client();
            const t0 = performance.now();
            for(let index = 0; index < 10; index++){
                await client.set(_faker.faker.string.uuid(), _faker.faker.hacker.noun());
            }
            const t1 = performance.now();
            // console.log(t1 - t0, 'milliseconds');
            // await client.disconnect();
            // await new Promise((resolve) => setTimeout(resolve, 200));
            res.status(200).send("OK");
        } catch (error) {
            _nodeconsole.error(error);
            res.status(500);
            res.json(JSON.parse(JSON.stringify(error)));
        }
    });
    return app.listen(port, ()=>{
        _nodeconsole.log("server is running on port " + port);
    });
};
_nodeconsole.log(_nodeprocess.default.pid);
Promise.all([
    8080,
    8081,
    8082,
    8083,
    8084
].map((p)=>main(p))).then(async ()=>{
//const axios = require('axios');
//for (let index = 0; index < 5000; index++) {
//await axios.get('http://localhost:8080');
//}
}).catch((error)=>{
    _nodeconsole.log(error);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb25zb2xlIGZyb20gJ25vZGU6Y29uc29sZSc7XG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuXG5pbXBvcnQgeyBmYWtlciB9IGZyb20gJ0BmYWtlci1qcy9mYWtlcic7XG5pbXBvcnQgZXhwcmVzcywgeyByZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAncmVkaXMnO1xuXG5kZWNsYXJlIG1vZHVsZSAnZXhwcmVzcy1zZXJ2ZS1zdGF0aWMtY29yZScge1xuXHRpbnRlcmZhY2UgUmVxdWVzdCB7XG5cdFx0Y2xpZW50OiAoKSA9PiBQcm9taXNlPFJldHVyblR5cGU8dHlwZW9mIGNyZWF0ZUNsaWVudD4+O1xuXHR9XG59XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuY29uc3QgbWFpbiA9IGFzeW5jIChwb3J0OiBudW1iZXIpID0+IHtcblx0Y29uc3QgY2xpZW50ID0gY3JlYXRlQ2xpZW50KHt9KTtcblx0YXdhaXQgY2xpZW50LmNvbm5lY3QoKTtcblx0YXBwLnVzZSgocmVxdWVzdCwgX3Jlc3BvbnNlLCBuZXh0KSA9PiB7XG5cdFx0cmVxdWVzdC5jbGllbnQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xpZW50O1xuXHRcdH07XG5cdFx0bmV4dCgpO1xuXHR9KTtcblxuXHRhcHAuZ2V0KCcqJywgYXN5bmMgKHJlcXVlc3QsIHJlcywgbmV4dCkgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBjbGllbnQgPSBhd2FpdCByZXF1ZXN0LmNsaWVudCgpO1xuXG5cdFx0XHRjb25zdCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDEwOyBpbmRleCsrKSB7XG5cdFx0XHRcdGF3YWl0IGNsaWVudC5zZXQoZmFrZXIuc3RyaW5nLnV1aWQoKSwgZmFrZXIuaGFja2VyLm5vdW4oKSk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdFx0Ly8gY29uc29sZS5sb2codDEgLSB0MCwgJ21pbGxpc2Vjb25kcycpO1xuXHRcdFx0Ly8gYXdhaXQgY2xpZW50LmRpc2Nvbm5lY3QoKTtcblx0XHRcdC8vIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMCkpO1xuXHRcdFx0cmVzLnN0YXR1cygyMDApLnNlbmQoJ09LJyk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0cmVzLnN0YXR1cyg1MDApO1xuXHRcdFx0cmVzLmpzb24oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlcnJvcikpKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBhcHAubGlzdGVuKHBvcnQsICgpID0+IHtcblx0XHRjb25zb2xlLmxvZygnc2VydmVyIGlzIHJ1bm5pbmcgb24gcG9ydCAnICsgcG9ydCk7XG5cdH0pO1xufTtcbmNvbnNvbGUubG9nKHByb2Nlc3MucGlkKTtcblxuUHJvbWlzZS5hbGwoWzgwODAsIDgwODEsIDgwODIsIDgwODMsIDgwODRdLm1hcCgocCkgPT4gbWFpbihwKSkpXG5cblx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdC8vY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuXHRcdC8vZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDUwMDA7IGluZGV4KyspIHtcblx0XHQvL2F3YWl0IGF4aW9zLmdldCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwJyk7XG5cdFx0Ly99XG5cdH0pXG5cdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdH0pO1xuIl0sIm5hbWVzIjpbImFwcCIsImV4cHJlc3MiLCJtYWluIiwicG9ydCIsImNsaWVudCIsImNyZWF0ZUNsaWVudCIsImNvbm5lY3QiLCJ1c2UiLCJyZXF1ZXN0IiwiX3Jlc3BvbnNlIiwibmV4dCIsImdldCIsInJlcyIsInQwIiwicGVyZm9ybWFuY2UiLCJub3ciLCJpbmRleCIsInNldCIsImZha2VyIiwic3RyaW5nIiwidXVpZCIsImhhY2tlciIsIm5vdW4iLCJ0MSIsInN0YXR1cyIsInNlbmQiLCJlcnJvciIsImNvbnNvbGUiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwibGlzdGVuIiwibG9nIiwicHJvY2VzcyIsInBpZCIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJwIiwidGhlbiIsImNhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7dUVBQXlCO3NFQUNMO3VCQUVFO2tFQUNZO3VCQUNMO0FBUTdCLE1BQU1BLE1BQU1DLElBQUFBLGdCQUFPO0FBRW5CLE1BQU1DLE9BQU8sT0FBT0M7SUFDbkIsTUFBTUMsU0FBU0MsSUFBQUEsbUJBQVksRUFBQyxDQUFDO0lBQzdCLE1BQU1ELE9BQU9FLE9BQU87SUFDcEJOLElBQUlPLEdBQUcsQ0FBQyxDQUFDQyxTQUFTQyxXQUFXQztRQUM1QkYsUUFBUUosTUFBTSxHQUFHO1lBQ2hCLE9BQU9BO1FBQ1I7UUFDQU07SUFDRDtJQUVBVixJQUFJVyxHQUFHLENBQUMsS0FBSyxPQUFPSCxTQUFTSSxLQUFLRjtRQUNqQyxJQUFJO1lBQ0gsTUFBTU4sU0FBUyxNQUFNSSxRQUFRSixNQUFNO1lBRW5DLE1BQU1TLEtBQUtDLFlBQVlDLEdBQUc7WUFDMUIsSUFBSyxJQUFJQyxRQUFRLEdBQUdBLFFBQVEsSUFBSUEsUUFBUztnQkFDeEMsTUFBTVosT0FBT2EsR0FBRyxDQUFDQyxZQUFLLENBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxJQUFJRixZQUFLLENBQUNHLE1BQU0sQ0FBQ0MsSUFBSTtZQUN4RDtZQUNBLE1BQU1DLEtBQUtULFlBQVlDLEdBQUc7WUFDMUIsd0NBQXdDO1lBQ3hDLDZCQUE2QjtZQUM3Qiw0REFBNEQ7WUFDNURILElBQUlZLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFDdEIsRUFBRSxPQUFPQyxPQUFPO1lBQ2ZDLGFBQVFELEtBQUssQ0FBQ0E7WUFDZGQsSUFBSVksTUFBTSxDQUFDO1lBQ1haLElBQUlnQixJQUFJLENBQUNDLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsU0FBUyxDQUFDTDtRQUNwQztJQUNEO0lBRUEsT0FBTzFCLElBQUlnQyxNQUFNLENBQUM3QixNQUFNO1FBQ3ZCd0IsYUFBUU0sR0FBRyxDQUFDLCtCQUErQjlCO0lBQzVDO0FBQ0Q7QUFDQXdCLGFBQVFNLEdBQUcsQ0FBQ0Msb0JBQU8sQ0FBQ0MsR0FBRztBQUV2QkMsUUFBUUMsR0FBRyxDQUFDO0lBQUM7SUFBTTtJQUFNO0lBQU07SUFBTTtDQUFLLENBQUNDLEdBQUcsQ0FBQyxDQUFDQyxJQUFNckMsS0FBS3FDLEtBRXpEQyxJQUFJLENBQUM7QUFDTCxpQ0FBaUM7QUFDakMsOENBQThDO0FBQzlDLDJDQUEyQztBQUMzQyxHQUFHO0FBQ0osR0FDQ0MsS0FBSyxDQUFDLENBQUNmO0lBQ1BDLGFBQVFNLEdBQUcsQ0FBQ1A7QUFDYiJ9