import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Scriptor!'
  })
})
let prompt ="Scriptor is a Animation Script writer bot.\n"
//prompt+="Scriptor is an Animation Script writing bot that writes interesting scripts.\n"
//prompt+="user : hi\nScriptor : Sup? nigga!\n"
/*prompt+="user : write a 5 second animation script based on boats in ocean.\nScriptor : \n"
prompt+="Title: Bobbing Boats\n\n~Fade in~\n\nThe camera shows a wide shot of the ocean with several boats bobbing up and down in the waves.\n\n~Cut to~\n\nA close-up of a single boat, with its sails flapping in the wind.\n\n~Cut to~\n\nAnother boat appears in the background, moving towards the camera.\n\n~Cut to~\n\nThe two boats pass each other, their wakes creating ripples in the water.\n\n~Cut to~\n\nThe camera shows a wide shot of the ocean again, with the boats bobbing up and down as they sail away.\n\n~Fade out~\n"
prompt+="user : write a 1 min animation of a man and coconut tree.\nScriptor : \n"
prompt+="Title: The Man and the Coconut Tree\n\n~Fade in~\n\nEXT. A deserted island - DAY\n\nWe see a man stranded on a deserted island, looking for food and water.\n\n~CUT TO~\n\nThe man walks around the island and finds a coconut tree.\n\n~CUT TO~\n\nThe man climbs the tree to get some coconuts.\n\n~CUT TO~\n\nAs he climbs down, he accidentally drops one of the coconuts, hitting him on the head and knocking him out.\n\n~CUT TO~\n\nThe man wakes up and sees the coconut tree bending down towards him, as if it's offering him a coconut.\n\n~CUT TO~\n\nThe man takes the coconut and drinks the refreshing water inside.\n\n~CUT TO~\n\nThe man continues to drink from the coconut, feeling rejuvenated and grateful for the tree's gift.\n\n~CUT TO~\n\nThe man looks up at the tree and smiles, realizing that he's not alone on the island after all.\n\n~Fade out~"
*/app.post('/', async (req, res) => {
  try {
    prompt += `user : ${req.body.prompt}Scriptor : `;
    //prompt = `${req.body.prompt}`;
    const response = await openai.createCompletion({
      model: "davinci",
      prompt: `${prompt}`,
      temperature: 0.7, // Higher values means the model will take more risks.
      max_tokens: 1000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      stop : ["\nuser :","\nScriptor :"],
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });
    prompt += `${response.data.choices[0].text}\n`
    console.log(prompt)
    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))