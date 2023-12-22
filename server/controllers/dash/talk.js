const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
// const {
//   GoogleGenerativeAI,
//   HarmBlockThreshold,
//   HarmCategory,
// } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.BARD_API_KEY);

const talk = async (req, res) => {
  const {input} = req.body;
  const modifiedPrompt = input + " Please summarize your response in no more than 150 words. Respond as if you are an expert doctor or health care specalist. If you feel that the question is not related to health and medicine then do not answer to the question and ask the to ask medical related problem";
  // console.log(input);

  const generationConfig = {
    temperature: 0.4,
    topP: 0.3,
    topK: 16,
  };
  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});

  const result = await model.generateContent(modifiedPrompt);
  const response = await result.response;
  const text = response.text();
  // console.log(text);
  res.send({ message: text });
};

module.exports = talk;
