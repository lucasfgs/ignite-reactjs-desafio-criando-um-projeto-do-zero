import { GetStaticProps } from 'next';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <div className={commonStyles.contentContainer}>
      <header className={commonStyles.headerContainer}>
        <img src="/images/logo.svg" alt="spacetraveling" />
      </header>
      <main>
        <article className={styles.post}>
          <h3>Como Utilizar Hooks</h3>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.postInfo}>
            <p>
              <AiOutlineCalendar />
              15 Mar 2021
            </p>
            <p>
              <AiOutlineUser />
              Joseph Oliveira
            </p>
          </div>
        </article>
        <article className={styles.post}>
          <h3>Como Utilizar Hooks</h3>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.postInfo}>
            <p>
              <AiOutlineCalendar />
              15 Mar 2021
            </p>
            <p>
              <AiOutlineUser />
              Joseph Oliveira
            </p>
          </div>
        </article>
        <article className={styles.post}>
          <h3>Como Utilizar Hooks</h3>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.postInfo}>
            <p>
              <AiOutlineCalendar />
              15 Mar 2021
            </p>
            <p>
              <AiOutlineUser />
              Joseph Oliveira
            </p>
          </div>
        </article>
        <article className={styles.post}>
          <h3>Como Utilizar Hooks</h3>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.postInfo}>
            <p>
              <AiOutlineCalendar />
              15 Mar 2021
            </p>
            <p>
              <AiOutlineUser />
              Joseph Oliveira
            </p>
          </div>
        </article>
        <a className={styles.loadMore}>Carregar mais posts</a>
      </main>
    </div>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
