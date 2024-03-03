import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

// controllers for send messages
export const sendMessageController = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      //create new one
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // we use Socket.io for real time conversation

    // await conversation.save();
    // await newMessage.save();
    // this promise.all will run conversation and newMessage parallely
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sending message controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller for getting message
export const getMessageController = async (req, res) => {
  try {
    const { id: userChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get message controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
