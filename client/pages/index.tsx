import Head from 'next/head';
import Link from 'next/link';
import LayoutCommon, {siteTitle} from '../components/layoutCommon';
import styled from 'styled-components'
import Logo from '../public/images/svg/logo-white.svg';

const HomeSection = styled.section`
  font-size: 1.2rem;
  line-height: 1.5;
  text-align:center;
  color: white;
  height: 100vh;

  a {
    color: white;
    
  }
  //height: 100%;
`

const StyledLogo = styled(Logo)`
  width: 250px;
`;

export default function Home({}) {

  return (
    <>

      <LayoutCommon home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <HomeSection>
          <section className="construction-message">
                <StyledLogo/>

            {/*<img src="image/catalog/logo-white13+.png" alt="">*/}
              <p>Здравствуйте!</p>
              <p>Наш сайт находится в разработке.</p>
              <p className="construction-padding">Но вы можете ознакомться с товарами и ценами на них, а так-же сделать заказ на нашей странице на сайте AU.RU.</p>
              <Link href="https://au.ru/user/cks24/shop/">Ссылка на нашу страницу на AU.RU:  https://au.ru/user/cks24/shop/ </Link>{''}
              {/*<a href="https://au.ru/user/cks24/shop/">Ссылка на нашу страницу на AU.RU: </br> https://au.ru/user/cks24/shop/</a>*/}
              <p className="construction-padding">А если будут вопросы, связанные с нашими услугами, звоните по телефону:</p>
              <p className="construction-padding">+7 (391) 205-24-29</p>
              <p className="construction-padding">или напишите в службу поддержки: biz@stroy24.com</p>
          </section>
          {/*<h2>take a look at some pokemon</h2>*/}
          {/*<h2>take a look at some pokemon</h2>*/}
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


