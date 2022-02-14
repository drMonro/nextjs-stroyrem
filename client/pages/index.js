import Head from "next/head";
import Link from "next/link";
import Layout, {siteTitle} from "../components/layout";
import styled from 'styled-components'

const HomeSection = styled.section`
  font-size: 1.2rem;
  line-height: 1.5;
  padding-top: 1px;
`

export default function Home({}) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <HomeSection>
                <h2>take a look at some pokemon</h2>
                <ul>
                    <li>
                        <Link href="/pokemon/bulbasaur">SSR</Link>{" "}
                    </li>
                    <li>
                        <Link href="/pokemon/beedrill">SSR</Link>{" "}
                    </li>
                </ul>
            </HomeSection>
        </Layout>
    );
}

export async function getStaticProps() {
    return {
        props: {},
    };
}
