import  Mongoose  from "mongoose";


const userSchema =  Mongoose.Schema({
 
  name: { type: String, require: true },
  email:{ type: String, require: true },
  password:{ type: String, require: true },
  id:{ type: String },
})

export default Mongoose.model("User",userSchema);