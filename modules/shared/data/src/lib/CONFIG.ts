export const WORKOUT_CONFIG: {
  name: string;
  pastTense: string;
  units: 'distance' | 'time';
  pointRate: number;
}[] = [
  {
    name: 'Run',
    pastTense: 'Ran',
    units: 'distance',
    pointRate: 1,
  },
  {
    name: 'Classic Roller Skiing',
    pastTense: 'Classic Roller Skied',
    units: 'distance',
    pointRate: 0.75,
  },
  {
    name: 'Skate Roller Skiing',
    pastTense: 'Skate Roller Skied',
    units: 'distance',
    pointRate: 0.5,
  },
  {
    name: 'Road Biking',
    pastTense: 'Road Biked',
    units: 'distance',
    pointRate: 1 / 3,
  },
  {
    name: 'Mountain Biking',
    pastTense: 'Mountain Biked',
    units: 'distance',
    pointRate: 1 / 1.5,
  },
  {
    name: 'Walking',
    pastTense: 'Walked',
    units: 'distance',
    pointRate: 1,
  },
  {
    name: 'Hiking With Packs',
    pastTense: 'Hiked',
    units: 'distance',
    pointRate: 2,
  },
  {
    name: 'Swimming',
    pastTense: 'Swam',
    units: 'distance',
    pointRate: 4,
  },
  {
    name: 'Paddling',
    pastTense: 'Paddled',
    units: 'distance',
    pointRate: 1.5,
  },
  {
    name: 'Strength Training',
    pastTense: 'Strength Trained',
    units: 'time',
    pointRate: 1 / 15,
  },
  {
    name: 'Aerobic Sports',
    pastTense: 'Exercised',
    units: 'time',
    pointRate: 1 / 30,
  },
];

export const DIVISIONS = [
  {
    value: 'Upperclassmen',
    label: 'students entering junior or senior year',
  },
  {
    value: 'Underclassmen',
    label: 'students entering freshman or sophomore year',
  },
  {
    value: 'Middle School',
    label: 'students entering grades 6 though 8',
  },
  { value: 'Staff & VIPs', label: 'coaches, teachers, and VIPs' },
  {
    value: 'Parents',
    label: 'parents of students (who are not staff)',
  },
  {
    value: 'Alumni',
    label: 'Highland alumni who do not fall into a category above',
  },
];
