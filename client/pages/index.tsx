import Head from 'next/head';
import Link from 'next/link';
import LayoutCommon, {siteTitle} from '../components/layoutCommon';
import styled, {createGlobalStyle} from 'styled-components'
import {reduxWrapper} from '../lib/store';

// const GlobalStyle = createGlobalStyle`
//   @font-face {
//     font-family: "Akrobat";
//     font-style: normal;
//     font-weight: 100 900;
//     font-display: optional;
//     src: url(/fonts/akrobat-bold.woff2) format("woff2");
//   }
//
//   ,
//   html,
//   body {
//     padding: 0;
//     margin: 0;
//     font-family: Akrobat, sans-serif;
//     //font-family: Akrobat, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
//     //Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
//     display: none;
//     line-height: 1.6;
//     font-size: 18px;
//   }
//
//   * {
//     box-sizing: border-box;
//   }
//
//   a {
//     color: plum;
//     text-decoration: none;
//   }
//
//   a:hover {
//     text-decoration: underline;
//   }
//
//   img {
//     max-width: 100%;
//     display: block;
//   }
//
//   title {
//     display:none;
//     font-size: 50px;
//   }
// `

const HomeSection = styled.section`
  font-size: 1.2rem;
  line-height: 1.5;
  padding-top: 1px;
`

export default function Home({}) {

  return (
    <>
      {/*<GlobalStyle/>*/}

      <LayoutCommon home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <HomeSection>
          <h2>take a look at some pokemon</h2>
          <ul>
            <li>
              <Link href="/pokemon/bulbasaur">SSR</Link>{' '}
            </li>
            <li>
              <Link href="/pokemon/beedrill">SSR</Link>{' '}
            </li>
          </ul>
        </HomeSection>
      </LayoutCommon>
    </>
  );
}


// export const getServerSideProps = reduxWrapper.getServerSideProps(
//
//   (store) => async (context) => {
//     // store.dispatch(getData.initiate());
//     // let res = await Promise.all(getRunningOperationPromises()).then(
//     //     result => result,
//     //     error => console.log("Rejected")
//     // );
//     console.log('привет')
//     console.log('привет')
//
//     return {props: {}};
//   }
// );


// export async function getStaticProps() {
//     return {
//         props: {},
//     };
// }
