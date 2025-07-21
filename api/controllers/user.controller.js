import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found!");

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "User has been deleted!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
};
