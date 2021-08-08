import { GetStaticPaths, GetStaticPropsContext, GetStaticProps } from 'next';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import Prismic from '@prismicio/client';
import { BiTime } from 'react-icons/bi';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useEffect } from 'react';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

import Header from '../../components/Header';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    reading_time: string;
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) return <div>Carregando...</div>;
  return (
    <main>
      <Header />
      <img src="/images/banner.png" alt="banner" className={styles.banner} />
      <div className={commonStyles.contentContainer}>
        <article className={styles.postContent}>
          <header>
            <h2>{post.data.title}</h2>
            <div className={styles.postInfo}>
              <p>
                <AiOutlineCalendar />
                {post.first_publication_date}
              </p>
              <p>
                <AiOutlineUser />
                {post.data.author}
              </p>
              <p>
                <BiTime />
                {post.data.reading_time} min
              </p>
            </div>
          </header>
          {post.data.content.map(content => (
            <section className={styles.postArcticle} key={content.heading}>
              <h3>{content.heading}</h3>
              {content.body.map(body => (
                <p key={body.text}>{body.text}</p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'post'),
  ]);

  const paths = posts.results.map(post => {
    return {
      params: { slug: post.uid.toString() },
    };
  });

  return { paths, fallback: true };
};

interface GetStaticPropsParams {
  params: { slug: string };
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsParams) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', slug, null);

  const amounOfWordsHeading = response.data.content.reduce(
    (acc, currentValue) => {
      if (currentValue.heading) {
        return [...acc, ...currentValue.heading.split(' ')];
      }

      return [...acc];
    },
    []
  ).length;

  const amountOfWordsOfBody = RichText.asText(
    response.data.content.reduce((acc, data) => [...acc, ...data.body], [])
  ).split(' ').length;

  response.data.reading_time = Math.ceil(
    (amounOfWordsHeading + amountOfWordsOfBody) / 200
  );

  response.first_publication_date = format(
    parseISO(response.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR,
    }
  );

  console.log(response.first_publication_date);

  return { props: { post: response } };
};
