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

// root (/)
router.get("/", (ctx) => {
  ctx.response.body = "Hello world!";
});

// custom route (/*), this "route" won't be handled by the router, because trying to match an url-path with the router regex is very difficult
app.use((ctx, next) => {
  // try to parse the path as a url
  // if it works then it's the dynamic route, which should parse the tweet and return the video file
  // if it doesn't then just continue the middleware chain
  try {
    const url = new URL(ctx.request.url.pathname.substring(1));

    // see issue #1
    const pathSegments = url.pathname.split("/");
    console.log(pathSegments);
  } catch {
    next();
  }
});

// add routes to server
app.use(router.routes());
app.use(router.allowedMethods());

// return built server
export default app;
