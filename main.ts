import Lifi, * as lifi from "@lifi/sdk";

const optionalConfigs: lifi.ConfigUpdate = {};

const lifiClient = new Lifi(optionalConfigs);

const routeOptions: lifi.RouteOptions = {
  slippage: 3 / 100, // 3%
  order: "RECOMMENDED",
};

const routeRequest: lifi.RoutesRequest = {
  fromChainId: 1, // Ethereum
  fromAmount: "1000000000", // 1,000 USDC with 6 decimals
  fromTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
  toChainId: 56, // BSC
  toTokenAddress: "0x55d398326f99059fF775485246999027B3197955", // USDT
  options: routeOptions,
};

async function requestRoutes() {
  const result = await lifiClient.getRoutes(routeRequest);
  if (result.errors) {
    console.log(result.errors);
  }
  const routes = result.routes;
  console.log(routes);
  return routes;
}

function pickRoute(routes: lifi.Route[]): lifi.Route {
  return routes[0];
}

async function demo() {
  const routes = await requestRoutes();
  const bestRoute = pickRoute(routes);
  console.log(bestRoute);
}

console.log("Starting demo");
demo();
