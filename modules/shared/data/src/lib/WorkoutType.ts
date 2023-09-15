export class WorkoutType {
  name: string;
  pastTense: string;

  units: string;
  pointsFunction: (duration: number) => number;

  constructor(name: string, pastTense: string, units: string, pointsFunction: (duration: number) => number) {
    this.name = name;
    this.pastTense = pastTense;
    this.units = units;
    this.pointsFunction = pointsFunction;
  }
}

export const RUN = new WorkoutType("Run", "Ran", "Miles", (d) => d)
export const BIKE = new WorkoutType("Bike", "Biked", "Miles", (d) => d / 3)
export const SKI = new WorkoutType("Ski", "Skied", "Miles", (d) => d / 2)
export const SWIM = new WorkoutType("Swim", "Swam", "Miles", (d) => d * 4)
export const BAD_WORKOUT_TYPE = new WorkoutType("INVALID", "INVALID", "INVALID", (d) => -1);

export const WorkoutTypes = [
  RUN, BIKE, SKI, SWIM
]

export const WorkoutTypeFromName = (name: string): WorkoutType => {
  switch (name) {
    case "Run": return RUN;
    case "Bike": return BIKE;
    case "Ski": return SKI;
    case "Swim": return SWIM;
    default: return BAD_WORKOUT_TYPE
  }
}