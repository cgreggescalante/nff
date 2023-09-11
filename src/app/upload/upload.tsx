import React, { useState, ChangeEvent } from "react";
import { WorkoutData, WorkoutInput } from "@shared-ui";


// Main component to add groups of workouts
const WorkoutGroup: React.FC = () => {
    const [description, setDescription] = useState<string>("");
    const [workouts, setWorkouts] = useState<WorkoutData[]>([{ type: "Running", duration: 0 }]);

    const handleWorkoutChange = (index: number, field: keyof WorkoutData, value: string | number) => {
        const newWorkouts = [...workouts];
        newWorkouts[index][field] = value;
        setWorkouts(newWorkouts);
    };

    const addWorkout = () => {
        setWorkouts([...workouts, { type: "Running", duration: 0 }]);
    };

    const handleSubmit = () => {
        const data = { 
            description, 
            workouts,
        };
        // Perform API call or other action with the collected data
        console.log("Submitting data:", data);
    };

    return (
      <div>
        <h1>Upload</h1>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
        }
        />

        {workouts.map((workout, index) => (
          <WorkoutInput
            key={index}
            index={index}
            handleWorkoutChange={handleWorkoutChange}
          />
        ))}

        <button onClick={addWorkout}>Add Workout</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
};

export default WorkoutGroup;
