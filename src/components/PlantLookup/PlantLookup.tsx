import React, { useState } from 'react';
import { z } from 'zod';
import Instructor from '@instructor-ai/instructor';
import OpenAI from "openai"
import axios from 'axios';


const compositionSchema = z.object({
    soil: z.coerce.number(),
    perlite: z.coerce.number(),
    vermiculite: z.coerce.number(),
    peatmoss: z.coerce.number(),
    reasoning: z.string(),
  });


  interface PlantLookupProps {
    handleSoilMixChange: (composition: { soil: number; perlite: number; vermiculite: number; peatmoss: number }) => void;
  }
  
  const PlantLookup: React.FC<PlantLookupProps> = ({ handleSoilMixChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<{ soil: number; perlite: number; vermiculite: number; peatmoss: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const dbResponse = await axios.get('http://localhost:5000/get-plant', {
        params: { searchTerm },
      });

      if (dbResponse.status === 200) {
        const plant = dbResponse.data;
        let compositionResult = {
          soil: plant.soil,
          perlite: plant.perlite,
          vermiculite: plant.vermiculite,
          peatmoss: plant.peatmoss,
          reasoning: plant.reasoning,
        };
        setResult(compositionResult);
        setReasoning(compositionResult.reasoning);
        handleSoilMixChange(compositionResult);
        setLoading(false);
        return;
      }
    } catch (dbError) {
      if (axios.isAxiosError(dbError)) {
        if (dbError.response && dbError.response.status !== 404) {
          setError('Failed to fetch plant information from the database. Please try again.');
        } else {
          setError('Plant not found.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
      setLoading(false);
    }


    const client = Instructor({
        client: new OpenAI({
          apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY ?? undefined,
          organization: import.meta.env.OPENAI_ORG_ID ?? undefined,
          dangerouslyAllowBrowser: true
        }),
        mode: "JSON"
      })

    try {

      const response = await client.chat.completions.create({
          messages: [{ role: "user", content: `I am trying to pot some new ${searchTerm}s right now. I have access to perlite, peatmoss, soil, and vermiculite. How can I best make a potting mix for ${searchTerm}s? Please respond with the values for each ingredient, and the reasoning as to why you have chosen these values`}],
          model: "gpt-3.5-turbo",
          response_model: { 
            schema: compositionSchema,
            name: "Composition",
          }
      })

      console.log('response', response);
      console.log('response.reasoning', response.reasoning);

      if (response) {
        let compositionResult = { soil: response.soil, perlite: response.perlite, vermiculite: response.vermiculite, peatmoss: response.peatmoss }
        // const messageContent = response.choices[0].message.content.trim();
        // const instructorClient = Instructor({ schema });
        // const parsedResult = instructorClient.parse(messageContent);
        setResult(compositionResult);
        setReasoning(response.reasoning);
        handleSoilMixChange(compositionResult);
        // Save the result to the backend server
        await axios.post('http://localhost:5000/save-plant', {
          searchTerm,
          soil: compositionResult.soil,
          perlite: compositionResult.perlite,
          vermiculite: compositionResult.vermiculite,
          peatmoss: compositionResult.peatmoss,
          response: response.reasoning,
        });
      } else {
        setError('No response from the API.');
      }
    } catch (err) {
      setError('Failed to fetch plant information. Please try again. ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a plant..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <div>{reasoning}</div>}
    </div>
  );
};

export default PlantLookup;

function initializeDatabase() {
  throw new Error('Function not implemented.');
}
