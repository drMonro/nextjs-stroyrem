import Document, {Html, Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from "styled-components";
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
            });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps, styles: (<>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (<Html>

            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="yandex" content="noindex, nofollow"/>
                <meta name="googlebot" content="noindex, nofollow"/>
                <link rel="icon" href="/favicon.ico"/>

                <link rel="preload" href="./fonts/akrobat-bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
                <link rel="preload" href="./fonts/akrobat-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
                <link rel="preload" href="./fonts/firaSans-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>

                {/*<link rel="preconnect" href="https://fonts.googleapis.com"/>*/}
                {/*<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>*/}
                {/*<link href="./styles/global.css" rel="stylesheet"/>*/}
            </Head>

            <body>

            <Main/>

            <NextScript/>
            </body>
        </Html>)
    }
}


export default MyDocument
