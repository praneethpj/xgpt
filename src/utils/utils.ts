import axios from 'axios';

module.exports = {
 
    generateAI21Text: async function (inputText:string) {
        const url = process.env.AI21_URL||"https://api.ai21.com/studio/v1/j2-ultra/chat";

        const payload = {
            "numResults": 1,
            "temperature": 0.7,
            "messages": [
                {
                    "text": inputText,
                    "role": "user"
                }
            ],
            "system": "You are an AI assistant for business research. Your responses should be informative and concise."
        };

        const headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": "Bearer Xuf8got4ofvxdjpI3qZDWh53owl7p1cM"
        };

        try {
            const response = await axios.post(url, payload, { headers });
            console.log(response.data);
            return response.data.outputs[0].text;
        } catch (error) {
            console.error(error);
            return "An error occurred while generating text.";
        }
    }
 
};