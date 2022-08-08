// this file handles the server creation and routes

// -- imports --

// web server (oak)
import { Application, Router } from "oak";

// twitter api (twitter-api-sdk)
import { Client } from "twitter";

// -- twitter --

// load twitter api bearer token
const twitterToken = Deno.env.get("TWITTER_BEARER");

// create twitter client
if (!twitterToken) throw new Error("Missing twitter bearer token");
const twitter = new Client(twitterToken);

// -- server --

// initialize app and router
const app = new Application();
const router = new Router();

// -- routes --

// add routes to server
app.use(router.routes());
app.use(router.allowedMethods());

// return built server
export default app;
