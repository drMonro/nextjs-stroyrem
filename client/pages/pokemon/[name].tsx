import Layout from '../../components/layout';
import Head from 'next/head';
import {skipToken} from '@reduxjs/toolkit/query';
import {useRouter} from 'next/dist/client/router';
import {getPokemonByName, getRunningOperationPromises, useGetPokemonByNameQuery} from '../../store/api-reducer';
import {reduxWrapper} from '../../lib/store';

export default function Pokemon() {
  const router = useRouter();
  const name = router.query.name;

  const {isLoading, error, data} = useGetPokemonByNameQuery(
    typeof name === 'string' ? name : skipToken,
    {
      skip: router.isFallback,
    }
  );

  return (
    <Layout>
      <Head>
        <title>{data?.species.name ?? ''}</title>
      </Head>
      <article>
        {error ? (
          <>Oh no, there was an error</>
        ) : router.isFallback || isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name}/>
          </>
        ) : null}
      </article>
    </Layout>
  );
}

export const getServerSideProps = reduxWrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;
    if (typeof name === "string") {
      store.dispatch(getPokemonByName.initiate(name));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);
