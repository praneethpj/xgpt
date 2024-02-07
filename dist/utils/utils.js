"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
module.exports = {
    generateAI21Text: function (inputText) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = process.env.AI21_URL || "https://api.ai21.com/studio/v1/j2-ultra/chat";
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
                const response = yield axios_1.default.post(url, payload, { headers });
                console.log(response.data);
                return response.data.outputs[0].text;
            }
            catch (error) {
                console.error(error);
                return "An error occurred while generating text.";
            }
        });
    }
};
//# sourceMappingURL=utils.js.map