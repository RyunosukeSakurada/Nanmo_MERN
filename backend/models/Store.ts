import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  storeName:{
    type: String,
    require: true,
    min: 1,
    max: 25,
    unique:true,
  },
  address: {
    type: String,
    required: true,
  },
  detailedAddress: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    require: true,
    unique:true,
  },
  password:{
    type:String,
    require: true,
    min:8,
    max:20,
  },
  storeLogo:{
    type: String,
    default: ""
  },
  blocked: {
    type: Boolean,
    default: false
  },
  suspended: {
    type: Boolean,
    default: false
  },
  approved: {
    type: Boolean,
    default: false
  }
},

  {timestamps: true}
);

module.exports = mongoose.model("Store", StoreSchema);