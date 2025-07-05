import mongoose from "mongoose"
import fs from "fs";
import path from "path";

const defaultProfilePicPath = path.resolve(
  process.cwd(),
  "assets/user.svg"
);

let defaultProfilePic;
try {
  defaultProfilePic = fs.readFileSync(defaultProfilePicPath, "utf8");
} catch (err) {
  // fallback to online URL if local file not found
  defaultProfilePic = "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/user.svg";
}  

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minLength: 6
    },
    profilePic: {
      type: String,
      // Use local SVG data or fallback URL
      default: defaultProfilePic,
    },
  },
  { timestamps: true }
);
const User=mongoose.model("User",userSchema);
export default User;