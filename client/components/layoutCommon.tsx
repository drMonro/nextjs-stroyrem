import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import React from 'react';
import HeaderTopNavigation from './common/navigation';
import {Affix, Layout} from 'antd';
import styled from 'styled-components';
import {Content, Footer} from 'antd/lib/layout/layout';

// import Logo from './logo.svg'
import Logo from '../public/images/svg/logo-white.svg';
// import Logo from '../Logo.svg'
import {useAppContext} from '../context/AppContext'
import HeaderMainPanel from './common/HeaderMainPanel';

// import {ReactComponent as IconBookmark} from '../Logo.svg'
const name = 'RTK-Query SSR example';
export const siteTitle = name;

const StyledLayout = styled(Layout)`
  background-color: white;
  //font-weight: bold;
  //padding: 0 50px;
`;

const StyledHeader = styled('header')`

  //padding: 0 50px;
`;




export default function LayoutCommon(props: { children: React.ReactNode; home?: boolean; }) {
  const {children, home} = props;
  // const [data, setData] = useAppContext();
  //
  // console.log('context');
  // console.log(data);

  return (

    <StyledLayout>
      <Affix offsetTop={0}>

        <StyledHeader>
          <HeaderTopNavigation/>
          <HeaderMainPanel/>

          {/*{home ? (*/}
          {/*  <>*/}
          {/*    <h1 className={utilStyles.heading2Xl}>{name}</h1>*/}
          {/*  </>*/}
          {/*) : (*/}
          {/*  <>*/}
          {/*    <h2 className={utilStyles.headingLg}>*/}
          {/*      <Link href="/">*/}
          {/*        <a className={utilStyles.colorInherit}>{name}</a>*/}
          {/*      </Link>*/}
          {/*    </h2>*/}
          {/*  </>*/}
          {/*)}*/}
        </StyledHeader>
      </Affix>
      <Content style={{padding: '0 50px'}}>
        {children}
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </Content>
      <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
    </StyledLayout>
  );
}

// export function getServerSideProps() {
//   const data = `Data from server: ${Date.now()}`;
//
//   return {
//     props: {
//       initialData: data,
//     },
//   };
// }
//
// export async function getServerSideProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   // const res = await fetch('https://.../posts')
//   const posts = ["dfsf", 'dasdasd']
//   console.log("huy")
//   console.log("huy")
//   console.log("huy")
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       initialData: posts,
//     },
//   };


// }
