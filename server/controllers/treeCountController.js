const axios = require("axios");

const treeCount = async (req, res) => {
    const { image } = req.body;

    try {
        const response = await axios({
            method: 'POST',
            url: `https://detect.roboflow.com/tree-count-c5uqe/1`,
            // url: `https://detect.roboflow.com/tree-counting-qiw3h/1`,
            params: {
                api_key: process.env.TREECOUNT_API_KEY,
                confidence: 7, // Set minimum confidence to 0%
                overlap: 7,
            },
            data: image.split(',')[1], // Send only base64 image without header
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        res.json({ predictions: response.data.predictions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error detecting trees');
    }
};

module.exports = { treeCount };