# RefineAI

RefineAI is an AI-powered writing assistant that transforms messy, informal text into clear, professional communication.


### What It Does

- Improves grammar and clarity  
- Enhances tone and professionalism  
- Keeps the original meaning intact  
- Delivers a single, refined output  
- Supports professional or friendly tone and same-length or shortened output
- Includes email, professional message, resume, and academic writing presets
- Accepts optional custom refinement instructions
- Saves up to 20 successful refinements in this browser, with individual and clear-all deletion
- Lets users clear the input and download refined text

### Refinement API

The frontend sends refinement requests to `POST /api/groq/response` as JSON:

```json
{
  "prompt": "The text to refine",
  "preset": "EMAIL",
  "tone": "PROFESSIONAL",
  "length": "SAME_LENGTH",
  "customInstructions": "Keep the greeting warm."
}
```

The API key is configured on the backend using `GROQ_API_KEY`. Set `VITE_API_URL` to the backend base URL when it is not `http://localhost:8080`.
