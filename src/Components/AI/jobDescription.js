// aiService.js
import axios from 'axios'; // Ensure correct import

const OPENAI_API_KEY = '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'; 

const generateJobDescription = async ({ title, location, jobType, salary, urgency }) => {
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant that generates detailed job descriptions based on user input.',
    },
    {
      role: 'user',
      content: `Generate a job description for the following job details:\nTitle: ${title}\nLocation: ${location}\nJob Type: ${jobType}\nSalary: ${salary}\nUrgency: ${urgency}`,
    },
  ];

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // or 'gpt-4'
        messages,
        max_tokens: 150, // Adjust as needed
        temperature: 0.7, // Adjust as needed
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating job description:', error);
    return 'An error occurred while generating the job description.';
  }
};

export default generateJobDescription; // Ensure you export the function
