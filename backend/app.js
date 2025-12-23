const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const promptTemplates = [
  `Create a modern, professional website based on the following idea: {message}.
The website should clearly explain the purpose of the idea, highlight its key features, and present the content in a clean and user-friendly layout.
Focus on clarity, usability, and a strong visual hierarchy. The design should feel modern, trustworthy, and easy to navigate across all devices.
Include a clear call to action that guides users toward the next step.`,

  `Design a sleek and professional website inspired by the idea: {message}.
Ensure the website communicates the concept effectively, emphasizes key functionalities, and maintains a visually appealing layout.
Prioritize readability, intuitive navigation, and a professional aesthetic. 
Add a compelling call to action that encourages user engagement.`,

  `Develop a polished, modern website for the concept: {message}.
Highlight the main features clearly and organize content in a user-centric, accessible manner.
The design should be clean, trustworthy, and visually engaging on all screen sizes.
Include prominent calls to action to guide visitors toward desired outcomes.`,

  `Build a professional website reflecting the following idea: {message}.
Focus on presenting the idea clearly, showcasing its benefits, and ensuring the interface is intuitive and user-friendly.
Maintain a modern look and feel, with emphasis on clarity and hierarchy.
Guide users seamlessly with effective calls to action.`,

  `Craft a modern and professional website around the idea: {message}.
The layout should communicate the idea’s purpose, highlight important features, and provide a smooth user experience.
Ensure the design is visually appealing, easy to navigate, and maintains consistency across all devices.
Incorporate strong call-to-action elements that prompt user interaction.`
];

app.post("/improve", (req, res) => {
  try {
    const message = req.body.message;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const randomIndex = Math.floor(Math.random() * promptTemplates.length)
    const improvedMessage = promptTemplates[randomIndex].replace("{message}", message);
    return res.status(200).json({ improvedMessage });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred", message: err.message });
  }
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
