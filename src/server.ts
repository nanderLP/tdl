// this file handles the server creation and routes

// -- imports --

// web server (oak)
import { Application, Router } from "oak";

// -- twitter --

// load twitter api bearer token
const twitterToken = Deno.env.get("TWITTER_BEARER");

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
app.use(async (ctx, next) => {
  // try to parse the path as a url
  // if it works then it's the dynamic route, which should parse the tweet and return the video file
  // if it doesn't then just continue the middleware chain
  try {
    const url = new URL(ctx.request.url.pathname.substring(1));

    const pathSegments = url.pathname.split("/");

    // see issue #1
    const tweetId = pathSegments.find((v, i, o) =>
      /^\d+$/.test(v) && o[i - 1] === "status"
    );

    // ignore request if no tweet id was found
    if (!tweetId) return next();

    // get tweet video link
  } catch {
    next();
  }
});

// add routes to server
app.use(router.routes());
app.use(router.allowedMethods());

// return built server
export default app;
