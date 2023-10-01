const express = require('express');
const verifyToken = require('../utils/verifyToken');
const Pdf = require('../models/Pdf'); // Import your Pdf model
const { default: axios } = require('axios');

const router = express.Router();

router.get("/get-all-pdfs", verifyToken, async (req, res) => {
    try {
        // Get the userId from the decoded token
        const userId = req.user.userId; // Assuming your token includes the userId

        // Query the Pdf model to find all entries with the matching userId
        const pdfs = await Pdf.find({ userId });

        // Return the found entries as a JSON response
        res.status(200).json(pdfs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete("/delete-pdf/:id", verifyToken, async (req, res) => {
    try {
        const pdfId = req.params.id;
        const sourceId = req.body.sourceId;
        // Query the Pdf model to find all entries with the matching userId
        const config = {
            headers: {
                "x-api-key": process.env.CHATPDF_KEY
            }
        };
        await axios.post(`https://api.chatpdf.com/v1/sources/delete`, {
            "sources": [sourceId]
        }, config);

        const pdfDelete = await Pdf.findByIdAndDelete({ _id: pdfId });
        console.log(pdfDelete);
        // Return the found entries as a JSON response
        res.status(200).json({
            message: "Success"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;
