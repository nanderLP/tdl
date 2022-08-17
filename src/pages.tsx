// this file contains the server-side rendered page powered by preact
// https://deno.com/deploy/docs/resources-frameworks for some SSR examples

// -- imports --

// nanojsx for JSX and SSR
/** @jsx h */
import { Helmet, renderSSR, h } from "ssr";

// twind for styling
import { setup } from "twind/";
import { virtualSheet, getStyleTag, shim } from "twind/shim/server";

// -- setting up twind --
const sheet = virtualSheet();
setup({ sheet });

// -- components --
const App = () => {
  return (
    <div class="bg-red-200">
    </div>
  );
};

// -- build page --
sheet.reset();
const app = shim(renderSSR(<App />));
const styleTag = getStyleTag(sheet);
const { body, head, footer, attributes } = Helmet.SSR(app);

const html = `
<!DOCTYPE html>
<html ${attributes.html.toString()}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${styleTag}
    ${head.join("\n")}
  </head>
  <body ${attributes.body.toString()}>
    ${body}
    ${footer.join("\n")}
  </body>
</html>
`;

export default html;
