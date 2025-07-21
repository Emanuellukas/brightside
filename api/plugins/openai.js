import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `
  You are a assistant that analyse and filter news articles in portuguese, in order to filter the news that evoke positive emotions.
  You will recieve a array of articles [{title, description}] and I expect you to return a object with 'approved' and 'rejected' arrays,
  with the articles that were approved and the rejected indexes with the following format:
  {
    "approved": [
      {
        "title": "...",
        "content": "...",
        "score": 8.5
      }
    ],
    "rejected_indexes": [2, 5, 9]
  }
`

export async function createCompletion(content) {
  let completion;
  try {
    completion = await openai.chat.completions.create({
      "messages": [
        { "role": "system", content: systemPrompt },
        { "role": "user", content: JSON.stringify(content) }
      ],
      model: "gpt-4.1",
    });
    console.log('completion', completion.choices);
  } catch (error) {
    console.error('Erro ao criar completion com OpenAI:', error);
    throw error; // relança o erro para tratamento posterior, se necessário
  }
  return completion.choices[0].message.content;
}