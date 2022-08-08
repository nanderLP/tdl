// ✌️
// this file creates a development/production environment and loads the app

// -- imports --

// environment variables (dotenv)
import { config } from ".env";

// server application
import server from "./src/server.ts";

// -- startup --

// determine environment
const env = Deno.env.get("DENO_ENV");

// choose path based on environment
let pathString;
if (env === "prod") pathString = ".env.prod";
else if (env === "dev") pathString = ".env.dev";
else throw new Error(`Unknown environment: ${env}`);

const path = new URL(pathString, import.meta.url).pathname;

// addtionally load example .env file for validation
const examplePath = new URL(".env.example", import.meta.url).pathname;

// load appropriate environment variables into Deno.env
await config({ path, export: true, example: examplePath, safe: true });

// start the server on the appropriate port
const port = Deno.env.get("PORT");

console.log("Starting server on port " + port);
console.log("Local: http://localhost:" + port);

await server.listen({ port: Number(port) });
