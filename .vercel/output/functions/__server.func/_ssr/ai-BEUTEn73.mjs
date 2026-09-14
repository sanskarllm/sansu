import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-BEUTEn73.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var processWork = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("4714ca318d3df1fd32a97cabf031337efa7b6911933a67e7cdfa3012565cbc13"));
//#endregion
export { processWork as t };
