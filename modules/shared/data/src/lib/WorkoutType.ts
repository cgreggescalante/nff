export interface WorkoutType {
  name: string;
  pastTense: string;
  units: string;
  pointsFunction: (duration: number) => number;
}

export default WorkoutType;

type WorkoutTypesCollection = {
  RUN: WorkoutType;
  BIKE: WorkoutType;
  SKI: WorkoutType;
  SWIM: WorkoutType;
};

export const WorkoutTypes: WorkoutTypesCollection = {
  RUN: {
    name: 'Run',
    pastTense: 'Ran',
    units: 'Miles',
    pointsFunction: (d) => d,
  },
  BIKE: {
    name: 'Bike',
    pastTense: 'Biked',
    units: 'Miles',
    pointsFunction: (d) => d / 3,
  },
  SKI: {
    name: 'Ski',
    pastTense: 'Skied',
    units: 'Miles',
    pointsFunction: (d) => d / 2,
  },
  SWIM: {
    name: 'Swim',
    pastTense: 'Swam',
    units: 'Miles',
    pointsFunction: (d) => d * 4,
  },
};

const BAD_WORKOUT_TYPE: WorkoutType = {
  name: 'INVALID',
  pastTense: 'INVALID',
  units: 'INVALID',
  pointsFunction: () => -1,
};

export const WorkoutTypeFromName = (name: string): WorkoutType => {
  switch (name) {
    case 'Run':
      return WorkoutTypes.RUN;
    case 'Bike':
      return WorkoutTypes.BIKE;
    case 'Ski':
      return WorkoutTypes.SKI;
    case 'Swim':
      return WorkoutTypes.SWIM;
    default:
      return BAD_WORKOUT_TYPE;
  }
};
