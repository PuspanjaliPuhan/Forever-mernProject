// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// const userModel = mongoose.model("User", userSchema);

// export default userModel;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  cartData: {
    type: Object,
    default: {}, // or use Map if you want stricter typing
  },
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;
