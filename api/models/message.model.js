import mongoose from "mongoose";
const {Schema} = mongoose;

const MessageSchema = new Schema({
    username:{
        type:String,
        requireed:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    img:{  
        type:String,
        required:false,
    },
    country:{
        type:String,
        required:true,
    },
    phone:{
        type:String,       
        required:true
    },
    desc:{
        type:String,    
        required:false
    },
    isSeller:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export default mongoose.model("Message", MessageSchema);