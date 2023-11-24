import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData, //これをHomeに渡す
    },
  };
}

//SSRの場合(contextにはrequestされたときのパラメータが入る)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          私はITエンジニアとしてUdemyの講座をうけています。好きな言語はJavaScriptです。
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>📝エンジニアのブログ</h2>

        <div className={`${styles.grid}`}>
          {/* 1つ１つのブログをdivで生成してgrid適用させる */}
          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={`${styles.thumbnailImage}`}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <span className={utilStyles.boldText}>{title}</span>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
