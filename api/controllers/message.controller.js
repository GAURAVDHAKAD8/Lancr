import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res, next) => {
  console.log("req.userId in controller:", req.userId);
  console.log("🔥 req.body:", req.body);

  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    const savedMessage = await newMessage.save();

    try {
      const updatedConversation = await Conversation.findOneAndUpdate(
        { id: req.body.conversationId },
        {
          $set: {
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
            lastMessage: req.body.desc,
          },
        },
        { new: true }
      );

      // Emit the new message to all clients in this conversation
      req.io.to(req.body.conversationId).emit("receiveMessage", {
        _id: savedMessage._id,
        conversationId: savedMessage.conversationId,
        userId: savedMessage.userId,
        desc: savedMessage.desc,
        createdAt: savedMessage.createdAt,
        // Add any other fields your frontend expects
      });
     
    } catch (updateErr) {
      console.error("❌ Error updating conversation:", updateErr);
      return next(updateErr);
    }

    res.status(201).send(savedMessage);
  } catch (err) {
    console.error("❌ Message creation error:", err);
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};