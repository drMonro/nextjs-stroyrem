import Head from 'next/head';
import Link from 'next/link';
import LayoutCommon, {siteTitle} from '../components/layoutCommon';
import styled from 'styled-components'
import {reduxWrapper} from '../lib/store';
import {getRandomOffers, getRunningOperationPromises} from '../store/api-reducer';
import {Offer as OfferModel} from '../../server/node_modules/@prisma/client';
import {Button, Card, List} from 'antd';
import Image from 'next/image'
import {useEffect, useState} from 'react';
import Heart from '../public/images/svg/heart.svg';
import SplitCells from '../public/images/svg/split-cells.svg';
import Ruble from '../public/images/svg/ruble.svg';

const HomeSection = styled.section`
  font-size: 1.2rem;
  line-height: 1.5;
  padding-top: 1px;
  //.ant-card-body {
  //  display: flex;
  //  flex-direction: column;
  //  justify-content: space-between;
  //}
`


type ServerData = {
  randomOffers: any

}
export default function Home({randomOffers}: ServerData) {
  const [randomOffersSlice, setRandomOffersSlice] = useState(randomOffers.slice(0, 10));
  const [randomOffersSliceCount, setRandomOffersSliceCount] = useState(10);

  // console.log(randomOffersSlice, 'testa')
  const onLoadMore = () => {
    let slice = randomOffersSliceCount + 5;
    setRandomOffersSliceCount(slice);
    // console.log(slice, 'slice')
  }

  useEffect(() => {
    // console.log(randomOffersSliceCount, 'count')
    setRandomOffersSlice(randomOffers.slice(0, randomOffersSliceCount));
  }, [randomOffersSliceCount])

  const loadMore = <Button type="primary" onClick={onLoadMore}>Показать ещё</Button>;
  return (
    <>

      <LayoutCommon home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <HomeSection>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 5,
              xxl: 5,
            }}
            loadMore={loadMore}
            dataSource={randomOffersSlice}
            renderItem={(item: any) => (
              <List.Item>
                <Card>
                  <div style={{minHeight: 470, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p>Код:<span>{item.id}</span></p>
                        <div>
                          <Heart/>
                          <SplitCells/>
                        </div>
                      </div>
                      <Image
                        // loader={myLoader}
                        src={item.images[0].img.imgUrl}
                        alt="Picture of the author"
                        layout="responsive"
                        width={477}
                        height={465}
                      />
                      <p>{item.title}</p>
                    </div>

                    <div style={{display: 'flex', alignItems:'center'}}>
                      <p style={{fontSize: '22px', fontWeight: '600', margin: '0', marginRight: '15px'}}>{item.price}</p>
                      <Ruble/>
                    </div>
                  </div>

                </Card>
              </List.Item>
            )}
          />
          {/*<h2>take a look at some pokemon</h2>*/}
          {/*<ul>*/}
          {/*  <li>*/}
          {/*    <Link href="/pokemon/bulbasaur">SSR</Link>{' '}*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <Link href="/pokemon/beedrill">SSR</Link>{' '}*/}
          {/*  </li>*/}
          {/*</ul>*/}
        </HomeSection>
      </LayoutCommon>

    </>
  );
}


export const getServerSideProps = reduxWrapper.getServerSideProps(
  (store) => async (context) => {
    let res = await store.dispatch(getRandomOffers.initiate(20));
    // const res = await Promise.all(getRunningOperationPromises());

    return {
      props: {randomOffers: res.data},
    };

  }
);


