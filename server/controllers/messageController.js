const Message = require("../models/Message");

const sendMessage = async (req, res) => {

  try {

    const message = await Message.create({

      sender: req.user.id,

      receiver: req.body.receiver,

      text: req.body.text

    });

    res.status(201).json(message);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getMessages = async (req, res) => {

  try {

    const messages = await Message.find({

      $or: [

        {
          sender: req.user.id,
          receiver: req.params.userId
        },

        {
          sender: req.params.userId,
          receiver: req.user.id
        }

      ]

    }).sort({ createdAt: 1 });

    res.json(messages);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  sendMessage,
  getMessages
};