import type { Story } from '../data/home';
import { IconButton } from './IconButton';
import styles from './StoryCard.module.css';

/** Figma component "StoryCard" (147×198). */
export function StoryCard({ story }: { story: Story }) {
  return (
    <button type="button" className={`${styles.card} pressable`}>
      <span className={styles.imageLayer}>
        <img
          src={story.image}
          alt=""
          className={story.imageStyle ? styles.cropped : styles.cover}
          style={story.imageStyle}
        />
      </span>
      <span className={styles.content}>
        {story.isVideo && (
          <span className={styles.play}>
            <IconButton icon="play" size="sm" />
          </span>
        )}
        <span className={`${styles.title} t-caption`}>{story.title}</span>
      </span>
    </button>
  );
}
