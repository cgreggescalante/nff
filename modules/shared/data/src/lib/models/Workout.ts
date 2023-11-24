export interface Workout {
  type: string;
  duration: number;
}

export const DefaultWorkout = (): Workout => ({
  type: 'RUN',
  duration: 0,
});

export default Workout;
