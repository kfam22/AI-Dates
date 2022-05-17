import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: generatePrompt(req.body.date),
    temperature: 1,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(date) {
  const capitalizedInput =
    date[0].toUpperCase() + date.slice(1).toLowerCase();
  return `Suggest 3 romantic date ideas that take place at the ${capitalizedInput}.

  Date Input: Park
  Date Ideas: 1) A relaxing picnic with a blanket, charcuterie board, flowers, and champagne. 2) A bike ride through some scenic sites. 3) Ice cream and an evening stroll through the park.

  Date Input: Beach
  Date Ideas: 1) Couples surfing lessons. 2) An evening beach bonfire, with s'mores. 3) A relaxing beach day of swimming, sun bathing, and snacks.
  Date Input: ${capitalizedInput}
  Date Ideas:`;
}