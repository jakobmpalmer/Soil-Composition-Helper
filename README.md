# Soil Composition Helper

# React + TypeScript + Vite
### Overview

The Soil Composition Designer is an interactive web application that allows users to visually design soil mixtures by adjusting the percentages of soil, perlite, vermiculite, and peat moss. It also integrates OpenAI's API to suggest optimal soil compositions for different plants based on user queries.

### Features

Intuitive Sliders & Bars: Adjust soil component percentages dynamically.

Graphical Representation: A visual garden pot updates in real-time to reflect the composition.

AI Recommendations: Use OpenAI to fetch the best soil composition for specific plants.

Customizable Mixtures: Save and edit custom soil compositions.

Modern UI: Built with Vite for fast performance and smooth interactions.

### Tech Stack

Frontend: Vite, React

Styling: SASS

Backend API: Node.js, Express

AI Integration: OpenAI API

State Management: React Hooks

## Installation

### Prerequisites

Node.js (latest LTS recommended)

npm or yarn

### Steps to Run Locally

# Clone the repository
git clone https://github.com/yourusername/soil-composition-designer.git
cd soil-composition-designer

# Install dependencies
npm install   # or yarn install

# Start the development server
npm run dev

# Usage

Adjust the sliders to set the soil composition percentages.

Click the "Get AI Recommendation" button to receive optimal soil composition for a selected plant.

Save or modify custom compositions for future reference.

API Integration

To use the OpenAI API:

Obtain an API key from OpenAI.

Create a .env file in the root directory and add:

VITE_OPENAI_API_KEY=your_api_key_here

Restart the app to apply the changes.

Roadmap

Add database support to store user-created soil compositions.

Enhance AI recommendations with more soil properties.

Implement community sharing features.

Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request.

License

This project is licensed under the MIT License.

