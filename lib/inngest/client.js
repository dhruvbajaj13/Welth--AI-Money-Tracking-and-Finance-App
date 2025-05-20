import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: " welth finance-platform", // Unique app ID
  name: "Welth Finance Platform",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});