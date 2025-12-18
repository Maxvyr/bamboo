# Bangboo Factory

**Bangboo Factory** is a creative web application that leverages the power of Google's Gemini 3 Pro AI to transform your photos into custom "Bangboo" characters, inspired by the art style of *Zenless Zone Zero*.

Upload any photo, customize the mood and render style, and watch as the AI reconstructs it into a collectible character from the Hollows!

## ✨ Features

- **Image-to-Bangboo Transformation**: Converts uploaded photos into Bangboo-style characters while preserving key features.
- **Customizable Styles**:
  - **3D Cel-Shaded**: Matches the authentic Zenless Zone Zero visual style with clean outlines and vibrant colors.
  - **Flat 2D**: A clean, vector-art style illustration.
- **Mood Selection**: Choose from various expressions (Default, Happy, Angry, Sad, etc.) to give your Bangboo personality.
- **Interactive UI**: Modern, game-inspired interface with CRT overlay effects and smooth animations.
- **Powered by Gemini**: Utilizes the advanced `gemini-3-pro-image-preview` model for high-quality image generation.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Google GenAI SDK (`@google/genai`)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Cloud Project with the **Gemini API** enabled.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Rayinf/bamboo.git
    cd bamboo
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```env
    # Note: For client-side usage in Vite, you might need to configure this specifically
    # or ensure your build process handles process.env.API_KEY replacement.
    API_KEY=your_google_gemini_api_key_here
    ```
    *(Note: Ensure your API key is secured and usually restricted if used in a client-side application.)*

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open the app**
    Visit `http://localhost:5173` (or the URL shown in your terminal) to start creating Bangboos!

## 📖 Usage

1.  **Upload Image**: Drag & drop or select a photo in the "Input Data" zone.
2.  **Configure**:
    - Select a **Mood** (e.g., Happy, Angry).
    - Choose a **Render Style** (3D or Flat).
3.  **Generate**: Click the "Generate Bangboo" button.
4.  **Save**: Once generated, you can download your custom Bangboo image.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
*Disclaimer: This project is a fan creation and is not affiliated with HoYoverse or Zenless Zone Zero.*
