// backend/utils/whatsapp.js
const twilio = require('twilio');
// Replace with your Twilio Account SID and Auth Token
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Replace with your actual Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Replace with your actual Auth Token
const client = new twilio.Twilio(accountSid, authToken);

const sendWhatsAppMessage = async (to, message) => {
    try {
        const client = require('twilio')(accountSid, authToken);

        const result = await client.messages.create({
            from: `whatsapp:+${process.env.TWILIO_PHONE_NUMBER}`,  // Replace with your Twilio WhatsApp number
            to: `whatsapp:+91${to}`,
            body: message,
        });

        console.log('WhatsApp message sent:', result.sid);
        return result;
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        throw error;  // Ensure the error is propagated to handle it in your frontend or other parts of your backend.
    }
};

module.exports = {
    sendWhatsAppMessage
};


// WBM CODE
// const axios = require('axios');

// const sendWhatsAppMessage = async (to, message) => {
//     const baseUrl = 'https://api.whatsapp.com'; // Replace with WBM base URL
//     const accessToken = process.env.WBM_ACCESS_TOKEN; // Replace with your WBM access token

//     try {
//         const response = await axios.post(
//             `${baseUrl}/v1/messages`,
//             {
//                 to: `whatsapp:${to}`,
//                 message: {
//                     content: {
//                         type: 'text',
//                         text: message
//                     }
//                 }
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${accessToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         console.log('WhatsApp message sent:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error sending WhatsApp message:', error);
//         throw error;
//     }
// };

// module.exports = {
//     sendWhatsAppMessage
// };
