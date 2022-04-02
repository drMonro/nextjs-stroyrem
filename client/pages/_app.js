import {createGlobalStyle} from "styled-components";
import NextNProgress from 'nextjs-progressbar';
import {AppWrapper} from "../context/AppContext";

// const {default: AbortController} = require("abort-controller");
// const {default: fetch, Headers, Request, Response} = require("node-fetch");
import 'antd/dist/antd.css';

// Object.assign(globalThis, {
//     fetch,
//     Headers,
//     Request,
//     Response,
//     AbortController,
// });

const {reduxWrapper} = require("../lib/store");

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Akrobat";
    font-style: normal;
    font-weight: bold;
    font-display: optional;
    src: url(/fonts/akrobat-bold.woff2) format("woff2");
  }

  @font-face {
    font-family: "Akrobat";
    font-style: normal;
    font-weight: normal;
    font-display: optional;
    src: url(/fonts/akrobat.woff2) format("woff2");
  }
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Akrobat, sans-serif;
    line-height: 1.6;
    font-size: 18px;
    font-weight: normal;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: black;
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
    return (
        <>
            <GlobalStyle/>
            <NextNProgress
                color="#29D"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow
            />
            <AppWrapper>
                <Component {...pageProps} />

            </AppWrapper>

        </>
    );
}

export default reduxWrapper.withRedux(App);
