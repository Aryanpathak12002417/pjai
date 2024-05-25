const Tesseract = require('tesseract.js')

class ImageToText{

    async extractTextFromBase64Image(base64ImageData) {
        try {
            const { data } = await Tesseract.recognize(
                base64ImageData,
                'eng',
            )
           return data.text
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async imageToBase64(filePath) {
        try {
            const data = await fs.readFile(filePath);
            const base64String = data.toString('base64');
            const mimeType = 'image/png';
            return `data:${mimeType};base64,${base64String}`;
        } catch (error) {
            throw new Error(`Error converting image to Base64: ${error.message}`);
        }
    }

};

module.exports = new ImageToText();