# AI Homeopathy Suggester

An AI-powered homeopathic remedy recommendation system with voice input support and bilingual capabilities.

## 🌟 Features

### Core Functionality

- **AI-Powered Analysis**: Uses Google's Gemini API for intelligent homeopathic recommendations
- **Voice Input**: Supports voice input in both English and Hindi
- **Dark/Light Theme**: Comfortable viewing in any lighting condition
- **Responsive Design**: Works on desktop and mobile devices

### Input Methods

1. **Text Input**

   - Direct typing in the textarea
   - Clear placeholder text for guidance
   - Real-time input validation

2. **Voice Input**
   - Toggle voice recording with a single click
   - Language switching (EN/HI)
   - Visual feedback during recording
   - Auto-transcription to text

### Response Format

The AI provides structured recommendations including:

- 🌿 Primary Remedy Details
  - Medicine name
  - Potency
  - Dosage
  - Duration
- 🔄 Alternative Remedies
- 💭 Selection Rationale
- ⚠️ Missing Information
- 🌱 Lifestyle & Dietary Suggestions

## 🚀 Getting Started

### Prerequisites

```bash
node >= 14.0.0
npm >= 6.14.0
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/inspiredrishabh/AI-Homeo-Suggester
cd Homeopathy
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

## 🛠️ Usage

1. **Text Input**

   - Type your symptoms in the text area
   - Click "Get Suggestion" for analysis

2. **Voice Input**

   - Click the microphone icon
   - Speak your symptoms clearly
   - Click stop when done
   - Toggle language if needed

3. **View Results**
   - Review the structured recommendation
   - Use Copy button to save the text
   - Consider the Missing Information section

## 🔒 Privacy & Security

- Voice data is processed locally
- No storage of personal health information
- API calls are encrypted
- Compliant with basic health data protection standards

## ⚠️ Medical Disclaimer

This tool is for educational purposes only. Always consult qualified healthcare professionals for medical advice.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
