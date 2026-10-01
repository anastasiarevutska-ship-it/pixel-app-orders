import { brand } from '../brand';
import { ArticleCard } from '../components/ArticleCard';
import { IntroCopy } from '../components/IntroCopy';
import { LabTestCard } from '../components/LabTestCard';
import { NextDoseCard } from '../components/NextDoseCard';
import { OtbCallCard } from '../components/OtbCallCard';
import { FulfillmentFeedItem } from '../components/prescription/FulfillmentFeedItem';
import { ProfileHeader } from '../components/ProfileHeader';
import { ScheduleCard } from '../components/ScheduleCard';
import { SecondaryButton } from '../components/SecondaryButton';
import { SectionHeading } from '../components/SectionHeading';
import { StoryCard } from '../components/StoryCard';
import {
  curatedStories,
  featuredResources,
  labTest,
  nextDose,
  otbCall,
  patient,
  todaySchedule,
  treatmentProgress,
} from '../data/home';
import styles from './HomeScreen.module.css';

/** Figma frame "Homescreen_Final" (390 wide, scrolls above the fixed Nav). */
export function HomeScreen() {
  return (
    <main className={styles.home}>
      {/* Decorative background layers, absolutely positioned as in Figma. */}
      {brand.bgFull ? (
        <img className={styles.bgFull} src={brand.bgGradient} alt="" />
      ) : (
        <>
          <img className={styles.bgTop} src={brand.bgGradient} alt="" />
          <img className={styles.bgMirrored} src={brand.bgGradient} alt="" />
        </>
      )}
      <div className={styles.sheet} />

      <ProfileHeader patient={patient} />
      <IntroCopy progress={treatmentProgress} />

      <div className={styles.cards}>
        <FulfillmentFeedItem />
        <NextDoseCard dose={nextDose} />
        <LabTestCard labTest={labTest} />
        <OtbCallCard call={otbCall} />
        <ScheduleCard schedule={todaySchedule} />
      </div>

      <section className={styles.section}>
        <SectionHeading>Just for You</SectionHeading>
        <div className={styles.storyRow}>
          {curatedStories.map((story) => (
            <StoryCard key={story.title} story={story} />
          ))}
        </div>
      </section>

      <section className={styles.resources}>
        <div className={styles.section}>
          <SectionHeading>Featured Resources</SectionHeading>
          <div className={styles.articleList}>
            {featuredResources.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
          </div>
        </div>
        <SecondaryButton>More Resources</SecondaryButton>
      </section>
    </main>
  );
}
