import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import Prismic from '@prismicio/client';
import Link from 'next/link';

import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

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

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(postsPagination);

  function loadMore() {
    fetch(posts.next_page).then(response =>
      response.json().then(data => {
        setPosts({
          next_page: data.next_page,
          results: [...posts.results, ...data.results],
        });
      })
    );
  }

  return (
    <div className={commonStyles.contentContainer}>
      <Header />
      <main>
        {posts.results.map(post => (
          <Link href={`post/${post.uid}`} key={post.uid}>
            <article className={styles.post}>
              <h3>{post.data.title}</h3>
              <p>{post.data.subtitle}</p>
              <div className={styles.postInfo}>
                <p>
                  <AiOutlineCalendar />
                  {new Date(post.first_publication_date).toLocaleDateString(
                    'pt-BR',
                    {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
                </p>
                <p>
                  <AiOutlineUser />
                  {post.data.author}
                </p>
              </div>
            </article>
          </Link>
        ))}
        {posts.next_page && (
          <button className={styles.loadMore} onClick={loadMore} type="button">
            Carregar mais posts
          </button>
        )}
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1,
    }
  );

  return {
    props: {
      postsPagination: response,
    },
  };
};
