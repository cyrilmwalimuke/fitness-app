import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Exercise from "./exercise.js";

import Workout from "./workout.js";


const app = express()
mongoose.connect('mongodb+srv://cyrilmwalimuke:zfrMsQiuENR8wsH7@fitness-carrier.0xl1dsf.mongodb.net/?retryWrites=true&w=majority&appName=fitness-carrier').then(()=>console.log("connected to mongodb")).catch((err)=>console.log(err))
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post("/add-exercise", async (req, res) => {
    const {name,description,imageUrl,difficulty,targetedMuscleGroups}=req.body
    const workout =Exercise({name,description,imageUrl,difficulty,targetedMuscleGroups});
    await workout.save();
    res.json("new workout added successfully")
  })


  app.get("/exercises", async (req, res) => {
    try {
      const exercises = await Exercise.find();
      res.status(200).json(exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      res.status(500).json({ error: "Failed to fetch exercises" });
    }
  });

  app.post('/create-workout', async (req,res)=>{

  }
  )

  app.get('/exercises/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const workout = await Exercise.findById(id);
        if(!workout){
            return res.status(404).json({error:"Exercise not found"})
        }
        res.status(200).json(workout)
    }catch(error){
        console.error("Error fetching workout:",error);
        res.status(500).json({error:"Failed to fetch workout"})
    }
  })


  app.post("/post-workout-exercises", async (req, res) => {
    console.log("hello world")
    try {
      const { duration, workoutExercises } = req.body;
  
      if (!duration || !workoutExercises) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      // Convert reps/weight to Number (since they’re coming as strings in your example)
      const sanitizedExercises = workoutExercises.map(ex => ({
        name: ex.name,
        databaseId: ex.databaseId,
        sets: ex.sets.map(set => ({
          reps: Number(set.reps),
          weight: Number(set.weight),
          weightUnit: set.weightUnit,
          isCompleted: set.isCompleted
        }))
      }));
  
      const workout = new Workout({
        duration,
        workoutExercises: sanitizedExercises
      });
  
      await workout.save();
  
      res.status(201).json({
        success: true,
        message: "Workout saved successfully",
        data: workout
      });
    } catch (error) {
      console.error("Error saving workout:", error);
      res.status(500).json({
        success: false,
        message: "Server error while saving workout",
        error: error.message
      });
    }
  });

  app.post("/post-custom-workout", async (req, res) => {
    console.log("hello world")
    try {
      const { duration, workoutExercises } = req.body;
  
      if (!duration || !workoutExercises) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      // Convert reps/weight to Number (since they’re coming as strings in your example)
      const sanitizedExercises = workoutExercises.map(ex => ({
        name: ex.name,
        databaseId: ex.databaseId,
        sets: ex.sets.map(set => ({
          reps: Number(set.reps),
          weight: Number(set.weight),
          weightUnit: set.weightUnit,
          isCompleted: set.isCompleted
        }))
      }));
  
      const workout = new CustomWorkout({
        duration,
        workoutExercises: sanitizedExercises
      });
  
      await workout.save();
  
      res.status(201).json({
        success: true,
        message: "Workout saved successfully",
        data: workout
      });
    } catch (error) {
      console.error("Error saving workout:", error);
      res.status(500).json({
        success: false,
        message: "Server error while saving workout",
        error: error.message
      });
    }
  });



  app.get("/workouts", async (req, res) => {
    try {
      const workouts = await Workout.find();
      res.status(200).json(workouts);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      res.status(500).json({ error: "Failed to fetch exercises" });
    }
  });


  
  app.get('/workouts/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(404).json({error:"Exercise not found"})
        }
        res.status(200).json(workout)
    }catch(error){
        console.error("Error fetching workout:",error);
        res.status(500).json({error:"Failed to fetch workout"})
    }
  })



  app.delete("/delete-workout/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedWorkout = await Workout.findByIdAndDelete(id);
  
      if (!deletedWorkout) {
        return res.status(404).json({ success: false, message: "Workout not found" });
      }
  
      res.json({ success: true, message: "Workout deleted successfully" });
    } catch (err) {
      console.error("Delete workout error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });


  app.post("/post-custom-workout-exercises", async (req, res) => {
    console.log("hello world")
    try {
      const { duration, workoutExercises } = req.body;
  
      if (!duration || !workoutExercises) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      // Convert reps/weight to Number (since they’re coming as strings in your example)
      const sanitizedExercises = workoutExercises.map(ex => ({
        name: ex.name,
        databaseId: ex.databaseId,
        sets: ex.sets.map(set => ({
          reps: Number(set.reps),
          weight: Number(set.weight),
          weightUnit: set.weightUnit,
          isCompleted: set.isCompleted
        }))
      }));
  
      const workout = new Workout({
        duration,
        workoutExercises: sanitizedExercises
      });
  
      await workout.save();
  
      res.status(201).json({
        success: true,
        message: "Workout saved successfully",
        data: workout
      });
    } catch (error) {
      console.error("Error saving workout:", error);
      res.status(500).json({
        success: false,
        message: "Server error while saving workout",
        error: error.message
      });
    }
  });




app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})