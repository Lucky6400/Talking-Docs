const { default: axios } = require('axios');
const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');
const FormData = require('form-data');
const Pdf = require('../models/Pdf');
const pdf = require('pdf-parse');
const fasttext = require('fasttext');

router.post('/upload-pdf', async (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        try {

            if (err) {
                next(err)
                return;
            }
            const formData = new FormData();
            formData.append(
                "file",
                fs.createReadStream(files?.file?.[0]?.filepath)
            );

            const options = {
                headers: {
                    "x-api-key": process.env.CHATPDF_KEY,
                    ...formData.getHeaders(),
                },
            };

            /*

            ? I DID NOT DO VECTOR EMBEDDINGS SINCE A LARGE MODEL PROBABLY 600-700MB MINIMUM SIZE WILL HAVE TO BE 
            ? LOADED. IN THIS CASE THERE ARE POSSIBILITIES OF API FAILURE, ALSO I HAVE TO PUSH CODE TO GITHUB FROM 
            ? WHERE I WILL DEPLOY MY CODE!


             const pdfData = fs.readFileSync(files?.file?.[0]?.filepath);
             const pdfText = await pdf(pdfData);

            Split the text into sentences (Word2Vec takes sentences as input)

             const sentences = pdfText.text.split(/[.!?]/);

            Create a temporary file containing the text

             fs.writeFileSync('temp.txt', sentences.join('\n'));

            Train Word2Vec model

             const model = word2vec('temp.txt', 'output.bin', {
             size: 100, // Set the dimensionality of the embeddings
             min_count: 1, // Minimum number of occurrences for a word to be included
        

            Load the trained model
             model.load('output.bin');

            Perform Word2Vec embedding for a specific word (e.g., 'example')
             const embedding = model.getVector('example');

            'embedding' now contains the Word2Vec embedding for the specified word

            */


            // 'fields' contains text fields, and 'files' contains uploaded files

            const response = await axios.post("https://api.chatpdf.com/v1/sources/add-file", formData, options);
            const data = await response.data;
            //console.log("data from chatPDF",data)
            if (data && data?.sourceId) {
                const newPdf = new Pdf({
                    sourceId: data.sourceId,
                    userId: fields?.userId?.[0],
                    name: files?.file?.[0]?.originalFilename
                })

                await newPdf.save();
                res.json({
                    message: 'Success', fields, files, data: {
                        ...data,
                        name: files?.file?.[0]?.originalFilename
                    }
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    data
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Error",
                error
            })
        }
    });
});

module.exports = router