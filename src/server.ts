// this file handles the server creation and routes

// -- imports --

// web server (oak)
import { resolve } from "https://deno.land/std@0.140.0/path/win32.ts";
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

    // get tweet data
    const params = new URLSearchParams();
    params.set("id", tweetId);

    // see issue #2
    const endpoint =
      `https://api.twitter.com/1.1/statuses/show.json?${params.toString()}`;

    const tweetRes = await fetch(
      endpoint,
      {
        headers: {
          Authorization: "Bearer " + twitterToken,
        },
      },
    );

    if (!tweetRes.ok) return ctx.response.body = "Tweet not found";

    const tweet = await tweetRes.json();

    // get video link
    // this retrieves the last item in the video variants array, which is the highest quality video
    const video = tweet.extended_entities.media[0].video_info.variants.pop()

    // return video
    ctx.response.status = 302
    ctx.response.headers.set("Location", video.url) 

  } catch {
    next();
  }
});

// add routes to server
app.use(router.routes());
app.use(router.allowedMethods());

// return built server
export default app;
