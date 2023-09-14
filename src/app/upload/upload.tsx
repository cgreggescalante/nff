import React, { useState, ChangeEvent } from "react";
import { WorkoutInput } from "@shared-ui";
import { Upload, Workout } from "@shared-data";


const UploadView: React.FC = () => {
    const [description, setDescription] = useState<string>("");
    const [workouts, setWorkouts] = useState<Workout[]>([{ type: "Running", duration: 0 }]);

    const handleWorkoutChange = (index: number, field: keyof Workout, value: string | number) => {
        const newWorkouts = [...workouts];
        newWorkouts[index][field] = value;
        setWorkouts(newWorkouts);
    };

    const deleteWorkout = (index: number) => {
        setWorkouts([...workouts.slice(0, index), ...workouts.slice(index + 1)]);
    }

    const addWorkout = () => setWorkouts([...workouts, { type: "Running", duration: 0 }]);

    const handleSubmit = () => {
        const data: Upload = {
            description,
            date: new Date(),
            workouts: workouts.filter(w => w.duration > 0),
        };

        // TODO: Perform API call or other action with the collected data
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

        {
            workouts.map((workout, index) => (
              <WorkoutInput
                key={index}
                index={index}
                workoutData={workout}
                handleWorkoutChange={handleWorkoutChange}
                handleDelete={() => deleteWorkout(index)}
              />
            ))
        }

        <button onClick={addWorkout}>Add Workout</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
};

export default UploadView;
