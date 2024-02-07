"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAI = void 0;
const openai_1 = require("openai");
const configureOpenAI = () => {
    const config = new openai_1.Configuration({
        apiKey: "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",
        organization: "org-MXW1UU9qyBxAlh8A2FJPRxOe",
    });
    return config;
};
exports.configureOpenAI = configureOpenAI;
//# sourceMappingURL=openai-config.js.map