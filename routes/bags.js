// backend/routes/bags.js
const express = require('express');
const router = express.Router();
const Bag = require('../models/Bag');
const { sendWhatsAppMessage } = require('../utils/whatsapp');

// GET all bags
router.get('/', async (req, res) => {
    try {
        const bags = await Bag.find();
        res.json(bags);
    } catch (error) {
        console.error('Error fetching bags:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST a new bag
router.post('/', async (req, res) => {
    try {
        const { customerName, description, customerPhone } = req.body;
        const newBag = new Bag({ customerName, description, customerPhone });
        const savedBag = await newBag.save();
        res.status(201).json(savedBag);
    } catch (error) {
        console.error('Error creating bag:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT update a bag's status
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, price, description } = req.body;

    try {
        const updateData = { status };
        if (status === 'repaired') {
            updateData.bagRepairedDate = new Date();
        }

        const updatedBag = await Bag.findByIdAndUpdate(id, { ...updateData, price, description }, { new: true });

        if (!updatedBag) {
            return res.status(404).json({ message: 'Bag not found' });
        }

        // Send WhatsApp message if status is 'repaired'
        if (status === 'repaired') {
            await sendWhatsAppMessage(updatedBag.customerPhone, `Your bag is now repaired and ready for pickup!`);
        }

        res.json(updatedBag);
    } catch (error) {
        console.error('Error updating bag status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
