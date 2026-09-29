import type { Article } from '../data/home';
import { IconButton } from './IconButton';
import styles from './ArticleCard.module.css';

/** Figma component "ArticleCard" (326×112). */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <button type="button" className={`${styles.card} pressable`}>
      <span className={styles.image}>
        <img className={styles.cover} src={article.image} alt="" />
        <IconButton icon="play" size="sm" />
      </span>
      <span className={styles.text}>
        <span className={`${styles.title} t-body-small`}>{article.title}</span>
        <span className={styles.meta}>
          <span className="t-label-bold">{article.category}{'  •'}</span>
          {'  '}
          <span className={styles.duration}>{article.duration}</span>
        </span>
      </span>
    </button>
  );
}
