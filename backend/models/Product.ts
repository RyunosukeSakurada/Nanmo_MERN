import mongoose from "mongoose";
const {Schema,model} = mongoose;

const ProductSchema = new mongoose.Schema({
  name:{
    type: String,
    min: 1,
    max: 50,
    required: true,
  },
  description:{
    type: String,
    min: 1,
    max: 50,
    required: true,
  },
  stocks:{
    type: Number,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  originalPrice:{
    type: Number,
    required: true,
  },
  productImage:{
    type: String,
    default: ""
  },
  pickupDate: {
    type: String,
    required: true,
  },
  pickupTime: {
    start: {type: String, required: true},
    end: {type: String, required: true}
  },
  isSold: {
    type: Boolean,
    default: false,
    required: true,
  },
  store:{
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  }
},

  {timestamps: true}
);


module.exports = model("Product", ProductSchema);
