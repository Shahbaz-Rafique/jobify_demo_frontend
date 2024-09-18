import axios from 'axios';
import Cookies from 'js-cookie';

export async function generateCompletion(title, location, jobType, salary, urgency, company) {
  try {
    const maxTokens = 50;
    const prompt = `
      We looking for a ${urgency.toLowerCase()} ${jobType.toLowerCase()} ${title.toLowerCase()} located in ${location}. 
      The salary for this position is ${salary}. 
      This is a great opportunity for those interested in ${title.toLowerCase()} roles.
    `;

    const config = {
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/admin/openai`,
      { prompt, maxTokens },
      config
    );

    return response.data;
  } catch (error) {
    console.error('Error generating completion:', error);
    throw error; 
  }
}

export default generateCompletion;