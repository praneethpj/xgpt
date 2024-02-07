import { Configuration } from "openai";

export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: "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",
    organization: "org-MXW1UU9qyBxAlh8A2FJPRxOe",
  });
  return config;
};