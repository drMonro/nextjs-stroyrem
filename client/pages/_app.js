import {createGlobalStyle} from "styled-components";
import NextNProgress from 'nextjs-progressbar';

const {default: AbortController} = require("abort-controller");
const {default: fetch, Headers, Request, Response} = require("node-fetch");

Object.assign(globalThis, {
    fetch,
    Headers,
    Request,
    Response,
    AbortController,
});

const {reduxWrapper} = require("../lib/store");

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.6;
    font-size: 18px;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: plum;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    display: block;
  }
`

function App({Component, pageProps}) {
    return <>
        <GlobalStyle/>
        <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow
        />
        <Component {...pageProps} />
    </>;
}

export default reduxWrapper.withRedux(App);
