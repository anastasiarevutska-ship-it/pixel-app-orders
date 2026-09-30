/**
 * Mock product data for the Home screen, taken verbatim from the Figma frame
 * (⭐️ NEW Patient App › Homescreem, node 16940:94628). Kept separate from the
 * presentation components so later iterations can swap in other scenarios.
 */
import article1 from '../assets/figma/article-1.png';
import article2 from '../assets/figma/article-2.png';
import article3 from '../assets/figma/article-3.png';
import article4 from '../assets/figma/article-4.png';
import profilePhoto from '../assets/figma/profile-photo.jpg';
import story1 from '../assets/figma/story-1.jpg';
import story2 from '../assets/figma/story-2.jpg';
import story3 from '../assets/figma/story-3.jpg';
import type { CSSProperties } from 'react';

export type Patient = {
  firstName: string;
  photo: string;
};

export type TreatmentProgress = {
  day: number;
  treatmentName: string;
  message: string;
};

export type NextDose = {
  time: string;
  medication: string;
  dosage: string;
};

export type LabTest = {
  title: string;
  dateTime: string;
  location: string;
};

export type OtbCall = {
  title: string;
  time: string;
  provider: string;
};

export type ScheduleStatus = 'taken' | 'skipped' | 'upcoming';

export type ScheduleEntry = {
  medication: string;
  dosage: string;
  time: string;
  status: ScheduleStatus;
};

export type TodaySchedule = {
  eyebrow: string;
  date: string;
  entries: ScheduleEntry[];
};

export type Story = {
  title: string;
  image: string;
  /** Image placement inside the 147×216 story image layer, when Figma crops it. */
  imageStyle?: CSSProperties;
  isVideo: boolean;
};

export type Article = {
  title: string;
  category: string;
  duration: string;
  image: string;
};

export const patient: Patient = {
  firstName: 'Samantha',
  photo: profilePhoto,
};

export const treatmentProgress: TreatmentProgress = {
  day: 12,
  treatmentName: 'In Vitro Fertilization',
  message: 'You’re on a remarkable journey and every day is another step.',
};

export const nextDose: NextDose = {
  time: '2pm',
  medication: 'Menopur',
  dosage: '75iu injection',
};

export const labTest: LabTest = {
  title: 'Lab Test',
  dateTime: 'Wednesday, Sept. 27 | 3:30pm',
  location: 'Columbus Center for Reproductive Endocrinology & Infertility',
};

export const otbCall: OtbCall = {
  title: 'OTB® Call',
  time: '3:30pm',
  provider: 'Jeremy Sanders, Physician',
};

export const todaySchedule: TodaySchedule = {
  eyebrow: 'Today’s Schedule',
  date: 'Wednesday, Sept. 27',
  entries: [
    { medication: 'Estradiol', dosage: '0.1mg patch', time: '8:00a', status: 'taken' },
    { medication: 'Ganirellix', dosage: '250mcg injection', time: '8:00a', status: 'skipped' },
    { medication: 'Menopur', dosage: '75iu injection', time: '2:00p', status: 'upcoming' },
    { medication: 'Omnitrope', dosage: '2.5mg injection', time: '6:00p', status: 'upcoming' },
    { medication: 'Letrozole', dosage: '2.5mg tablet', time: '6:00p', status: 'upcoming' },
  ],
};

export const curatedStories: Story[] = [
  // Title copied exactly as it appears in the Figma text layer.
  { title: 'Anxiety Re --es', image: story1, isVideo: true },
  {
    title: 'What to Expect: Week 3',
    image: story2,
    isVideo: false,
    imageStyle: { width: '131.95%', height: '134.88%', left: '-17.63%', top: '-31.53%' },
  },
  { title: '7 Tips for IVF Self Care', image: story3, isVideo: true },
];

export const featuredResources: Article[] = [
  { title: '5 Tips for Managing Stress During IVF', category: 'IVF', duration: '5 Minutes', image: article1 },
  {
    title: 'You Should Feel Good About Taking ‘You’ Time',
    category: 'Anxiety',
    duration: '2 Minutes',
    image: article2,
  },
  {
    title: '3 Positive Affirmations to Practice as You Start Your Cycle',
    category: 'IVF',
    duration: '10 Minutes',
    image: article3,
  },
  {
    title: 'Try These 5 Simple Exercises to Ease Bloating',
    category: 'Bloating',
    duration: '3 Minutes',
    image: article4,
  },
];
