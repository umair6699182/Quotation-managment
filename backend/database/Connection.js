import mongoose from "mongoose";

const URL = 'mongodb+srv://um83414:malik@cluster0.nopoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const Connection = async ()=>{

        try{
           await mongoose.connect(URL);
            console.log("Database Connected Succesfully");
        } catch(error){
            console.log("Database Connection Failed" , error.message);
        }
}

export default Connection;