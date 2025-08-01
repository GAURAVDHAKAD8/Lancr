import gigModel from "../models/gig.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only your gig!"));
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).json("Gig has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));
    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;

  const filter = {};

  if (q.userId) {
    filter.userId = q.userId;
  }

  if (q.category) {
    filter.category = q.category;
  }

  if (q.search) {
    filter.title = { $regex: q.search, $options: "i" };
  }

  if (q.min || q.max) {
    filter.price = {};
    if (q.min) filter.price.$gte = parseInt(q.min);
    if (q.max) filter.price.$lte = parseInt(q.max);
  }

  const sortOption = {};
  if (q.sort) {
    sortOption[q.sort] = -1; // descending
  }

  try {
    const gigs = await Gig.find(filter).sort(sortOption);
    res.status(200).json(gigs);
  } catch (error) {
    next(error);
  }
};
