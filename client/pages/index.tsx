import Head from 'next/head';
import Link from 'next/link';
import LayoutCommon, {siteTitle} from '../components/layoutCommon';
import styled from 'styled-components'

const HomeSection = styled.section`
  font-size: 1.2rem;
  line-height: 1.5;
  padding-top: 1px;
`

export default function Home({}) {

  return (
    <>

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


