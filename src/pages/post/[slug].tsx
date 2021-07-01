import { GetStaticPaths, GetStaticProps } from 'next';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { IoMdTime } from 'react-icons/io';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
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

export default function Post() {
  return (
    <main>
      <header className={commonStyles.headerContainer}>
        <img src="/images/logo.svg" alt="spacetraveling" />
      </header>
      <img src="/images/banner.png" alt="banner" className={styles.banner} />
      <div className={commonStyles.contentContainer}>
        <article className={styles.postContent}>
          <header>
            <h2>Criando um APP CRA do zero</h2>
            <div className={styles.postInfo}>
              <p>
                <AiOutlineCalendar />
                15 Mar 2021
              </p>
              <p>
                <AiOutlineUser />
                Joseph Oliveira
              </p>
              <p>
                <BiTime />4 min
              </p>
            </div>
          </header>
          <section className={styles.postArcticle}>
            <h3>Porin et varius</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
              incidunt dolores doloribus at quae nesciunt quaerat dolore
              repudiandae eos consequatur esse ipsa sint animi, numquam quas
              itaque hic nihil! At?
            </p>
          </section>
          <section className={styles.postArcticle}>
            <h3>Porin et varius</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
              incidunt dolores doloribus at quae nesciunt quaerat dolore
              repudiandae eos consequatur esse ipsa sint animi, numquam quas
              itaque hic nihil! At?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
              incidunt dolores doloribus at quae nesciunt quaerat dolore
              repudiandae eos consequatur esse ipsa sint animi, numquam quas
              itaque hic nihil! At?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
              incidunt dolores doloribus at quae nesciunt quaerat dolore
              repudiandae eos consequatur esse ipsa sint animi, numquam quas
              itaque hic nihil! At?
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
