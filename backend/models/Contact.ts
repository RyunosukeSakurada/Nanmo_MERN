import mongoose from "mongoose";
const {Schema,model} = mongoose;

const ContactSchema = new mongoose.Schema({
  name:{
    type: String,
    min: 1,
    required: true,
  },
  storeName:{
    type: String,
    min: 1,
    required: true,
  },
  email:{
    type:String,
    required: true,
  },
  message:{
    type: String,
    min: 1,
    max:250,
    required: true,
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