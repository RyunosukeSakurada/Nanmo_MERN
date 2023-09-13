import mongoose from "mongoose";
const {Schema,model} = mongoose;

const StoreSchema = new mongoose.Schema({
  storeName:{
    type: String,
    min: 1,
    max: 25,
    unique:true,
    sparse: true
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
  },
  requested:{
    type: Boolean,
    default: false
  },
  requestDeclined:{
    type: Boolean,
    default: false
  },
  isStore:{
    type: Boolean,
    default: true
  },
  isAdmin:{
    type: Boolean,
    default:false,
  },
},

  {timestamps: true}
);

module.exports = model("Store", StoreSchema);