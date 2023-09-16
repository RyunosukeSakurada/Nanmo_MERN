import mongoose from "mongoose";
const {Schema,model} = mongoose;

const ContactSchema = new mongoose.Schema({
  name:{
    type: String,
    min: 1,
    required: true,
    unique:false
  },
  storeName:{
    type: String,
    min: 1,
    required: true,
    unique:false
  },
  email:{
    type:String,
    required: true,
    unique:false
  },
  message:{
    type: String,
    min: 1,
    max:250,
    required: true,
    unique:false
  },
  isRead:{
    type:Boolean,
    default:false,
  },
  isHandled:{
    type:Boolean,
    default:false,
  }
},
);


module.exports = model("Contact", ContactSchema);