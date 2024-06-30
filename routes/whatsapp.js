// backend/routes/whatsapp.js
const express = require('express');
const router = express.Router();
const { sendWhatsAppMessage } = require('../utils/whatsapp');

// Route to handle incoming WhatsApp messages from WBM
router.post('/incoming', async (req, res) => {
    const { Body, From } = req.body;

    console.log(`Received message from ${From}: ${Body}`);

    // Process the incoming message as needed
    res.send('<Response></Response>');
});

// Route to handle WhatsApp message status updates from WBM
router.post('/status', async (req, res) => {
    const { MessageStatus, MessageSid } = req.body;

    console.log(`Message SID ${MessageSid} status: ${MessageStatus}`);

    // Process the message status update as needed
    res.send('<Response></Response>');
});

module.exports = router;
