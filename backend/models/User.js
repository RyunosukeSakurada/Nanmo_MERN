const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
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
  isAdmin:{
    type: Boolean,
    default:false,
  },
  blocked: {
    type: Boolean,
    default: false
  },
  suspended: {
    type: Boolean,
    default: false
  },
},

  {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);