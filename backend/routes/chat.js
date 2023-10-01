const express = require('express');
const verifyToken = require('../utils/verifyToken');
const Message = require('../models/Message');
const { default: axios } = require('axios');
const router = express.Router();

router.post("/send-message", verifyToken, async (req, res, next) => {
    try {
        const { content, from, to } = req.body;
        const newMessage = new Message({
            to, from, content: content?.[content.length - 1]?.content || ""
        });
        await newMessage.save();

        const config = {
            headers: {
                "x-api-key": process.env.CHATPDF_KEY,
                "Content-Type": "application/json",
            },
        };

        const data = {
            "sourceId": to,
            "messages": content,
            "referenceSources": true
        };
        const sendMessageResponse = await axios.post(`https://api.chatpdf.com/v1/chats/message`, data, config);
        const sendMsgData = await sendMessageResponse.data;
        console.log(sendMsgData)
        const receivedMessage = new Message({
            from: to,
            to: from,
            content: sendMsgData?.content,
            references: sendMsgData?.references
        })

        await receivedMessage.save();

        res.status(200).json({
            message: "Success",
            content: sendMsgData?.content,
            references: sendMsgData?.references,
            createdAt: Date.now()
        })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error })
    }
})

router.post("/get-all-messages", verifyToken, async (req, res) => {
    const { sourceId, userId } = req.body;
    const messages = await Message.find({
        $or: [
            { from: userId, to: sourceId },
            { from: sourceId, to: userId },
        ],
    });
    res.status(200).json(messages);
})

module.exports = router