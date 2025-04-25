# ImageFX Prompt Generator

A web-based application that enhances simple image descriptions into detailed, realistic prompts for ImageFX using the Google/Gemini-2.0-Flash-Exp AI model via OpenRouter API.

Visit the live application: [https://xhanafix.github.io/imagefx](https://xhanafix.github.io/imagefx)

## Features

- **AI-Powered Prompt Enhancement**: Transform simple descriptions into detailed, realistic prompts.
- **OpenRouter API Integration**: Uses the Google/Gemini-2.0-Flash-Exp:Free model via OpenRouter.
- **API Key Management**: Securely save your OpenRouter API key in local storage.
- **Auto-Copy Functionality**: Enhanced prompts are automatically copied to clipboard.
- **Dark/Light Theme**: Toggle between dark and light themes.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **Example Prompts**: Sample prompts to help you get started.

## Getting Started

### Prerequisites

To use the ImageFX Prompt Generator, you'll need:

1. An OpenRouter API key (sign up at [OpenRouter](https://openrouter.ai/) if you don't have one)
2. A modern web browser (Chrome, Firefox, Safari, Edge)

### Usage

1. **Enter your OpenRouter API Key**:
   - Input your API key in the designated field
   - Click "Save Key" to store it in your browser's local storage
   - The key will be remembered for future sessions

2. **Generate Enhanced Prompts**:
   - Enter a simple description in the input field (e.g., "a sunset over the mountains")
   - Click "Enhance Prompt" to transform it into a detailed, realistic prompt
   - The enhanced prompt will be displayed and automatically copied to your clipboard

3. **Use Example Prompts**:
   - Click on any of the example cards to use them as a starting point
   - Modify the examples to match your specific needs

4. **Change Theme**:
   - Toggle the switch in the header to switch between light and dark themes

## Privacy and Security

- Your OpenRouter API key is stored only in your browser's local storage
- No data is sent to any server other than the OpenRouter API
- You can reset/clear your API key at any time using the "Reset Key" button

## Running Locally

To run this project locally:

1. Clone this repository:
   ```
   git clone https://github.com/xhanafix/imagefx.git
   ```

2. Navigate to the project directory:
   ```
   cd imagefx
   ```

3. Open `index.html` in your browser or use a local development server.

## Development and Customization

This application is built using pure HTML, CSS, and JavaScript without any external libraries (except Font Awesome for icons). You can easily customize it:

- Edit `styles.css` to change the appearance
- Modify `script.js` to alter functionality
- Update the prompt template in the `generatePrompt()` function to customize AI instructions

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenRouter](https://openrouter.ai/) for providing access to Google/Gemini-2.0-Flash-Exp
- [Font Awesome](https://fontawesome.com/) for the icons 