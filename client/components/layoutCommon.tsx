import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import React, {useContext} from 'react';
import Navigation from './common/navigation';
import {Layout} from 'antd';
import styled, {createGlobalStyle} from 'styled-components';
import {Content, Footer} from 'antd/lib/layout/layout';

const name = 'RTK-Query SSR example';
export const siteTitle = name;

const StyledLayout = styled(Layout)`
  background-color: white;
  //font-weight: bold;
  //padding: 0 50px;
`;

const StyledHeader = styled('header')`
  background-color: #00408C;
  //font-weight: bold;
  padding: 0 50px;
  
`;

import {useAppContext} from '../context/AppContext'
export default function LayoutCommon(props: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const {children, home} = props;
  // console.log(test)


  const [data, setData] = useAppContext();
  console.log('context')
  console.log(data)

  return (

    <StyledLayout className="layout">
      {/*<GlobalStyle/>*/}
      <StyledHeader>
        {/*<header>*/}
          <Navigation/>

          {home ? (
            <>
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </>
          )}
        {/*</header>*/}
      </StyledHeader>
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
