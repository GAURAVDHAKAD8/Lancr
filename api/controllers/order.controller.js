import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);
  if (!gig) return next(createError(404, "Gig not found"));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(gig.price * 100),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

// export const createOrder = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.gigId);

//     if (!gig) {
//       return res.status(404).json({ error: "Gig not found" });
//     }

//     const newOrder = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       buyerId: req.userId,
//       sellerId: gig.userId,
//       price: gig.price,
//       payment_intent: "temp",
//     });

//     await newOrder.save();
//     res.status(200).send("successful");
//   } catch (error) {
//     console.error("Order creation error:", error.message);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

export const getOrders = async (req, res, next) => {
  try {
    const order = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).json(order);
  } catch (error) {}
};

export const confirm = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate({
      payment_intent: req.body.payment_intent
    },{$set:{
      isCompleted:true
    },
  })

    res.status(200).send("Order has been Confirmed");
  } catch (error) {}
};
