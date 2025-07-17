import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found!");

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("You are not authenticated!");

    const payload = jwt.verify(token, process.env.JWT_KEY);

    if (payload.id !== user._id.toString()) {
      return res.status(403).send("You can delete only your account!");
    }

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "User has been deleted!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
};
