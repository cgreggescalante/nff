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

  static RUN = new WorkoutType("Run", "Ran", "Miles", (d) => d);
  static BIKE = new WorkoutType("Bike", "Biked", "Miles", (d) => d / 3)
  static SKI = new WorkoutType("Ski", "Skied", "Miles", (d) => d / 2)
  static SWIM = new WorkoutType("Swim", "Swam", "Miles", (d) => d * 4)
  static BAD_WORKOUT_TYPE = new WorkoutType("INVALID", "INVALID", "INVALID", (d) => -1);
}

export const WorkoutTypes = [
  WorkoutType.RUN, WorkoutType.BIKE, WorkoutType.SKI, WorkoutType.SWIM
]

export const WorkoutTypeFromName = (name: string): WorkoutType => {
  switch (name) {
    case "Run": return WorkoutType.RUN;
    case "Bike": return WorkoutType.BIKE;
    case "Ski": return WorkoutType.SKI;
    case "Swim": return WorkoutType.SWIM;
    default: return WorkoutType.BAD_WORKOUT_TYPE
  }
}