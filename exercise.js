import mongoose from 'mongoose'


const ExerciseSchema = new mongoose.Schema({
  
    name:{
        type:String
        
    },
    description:{
        type:String
       

    },
    
    imageUrls:{
        type:Array
    },
    difficulty:{
        type:String
    }

    

},{timestamps:true})



const Exercise = mongoose.model("Exercise", ExerciseSchema);

export default Exercise




