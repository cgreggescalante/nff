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

export const WorkoutTypes = [
  RUN, BIKE, SKI, SWIM
]