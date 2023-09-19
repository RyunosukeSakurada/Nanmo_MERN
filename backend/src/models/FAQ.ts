import mongoose from "mongoose";
const {Schema,model} = mongoose;

const FAQSchema = new mongoose.Schema({
  question:{
    type: String,
    min: 1,
    required: true,
  },
  answer:{
    type: String,
    min: 1,
    required: true,
  },
},
);


module.exports = model("FAQ", FAQSchema);
