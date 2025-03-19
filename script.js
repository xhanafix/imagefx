document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const apiKeyInput = document.getElementById('api-key');
    const saveApiKeyBtn = document.getElementById('save-api-key');
    const resetApiKeyBtn = document.getElementById('reset-api-key');
    const apiStatusValue = document.getElementById('api-status-value');
    const userInput = document.getElementById('user-input');
    const generateBtn = document.getElementById('generate-btn');
    const outputBox = document.getElementById('output-box');
    const copyBtn = document.getElementById('copy-btn');
    const copyNotification = document.getElementById('copy-notification');
    const exampleCards = document.querySelectorAll('.example-card');
    
    // OpenRouter API Configuration
    const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
    const MODEL = 'google/learnlm-1.5-pro-experimental:free';
    
    // State
    let apiKey = localStorage.getItem('openrouter_api_key') || '';
    let isDarkTheme = localStorage.getItem('dark_theme') === 'true';
    
    // Error message element (create dynamically)
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    document.querySelector('.prompt-section').insertBefore(errorMessage, document.querySelector('.input-container'));
    
    // Loading element (create dynamically)
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.style.display = 'none';
    outputBox.appendChild(loadingElement);
    
    // Initialize the app
    function init() {
        // Set theme
        if (isDarkTheme) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.checked = true;
        }
        
        // Set API key status
        if (apiKey) {
            apiStatusValue.textContent = 'Set';
            apiStatusValue.classList.add('api-status-set');
            apiKeyInput.value = apiKey;
        }
        
        // Add event listeners
        setupEventListeners();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Theme toggle
        themeToggle.addEventListener('change', toggleTheme);
        
        // API key management
        saveApiKeyBtn.addEventListener('click', saveApiKey);
        resetApiKeyBtn.addEventListener('click', resetApiKey);
        
        // Generate prompt
        generateBtn.addEventListener('click', generatePrompt);
        
        // Copy to clipboard
        copyBtn.addEventListener('click', copyToClipboard);
        
        // Example prompts
        exampleCards.forEach(card => {
            card.addEventListener('click', () => {
                userInput.value = card.querySelector('.example-text').textContent;
                userInput.focus();
            });
        });
    }
    
    // Toggle between light and dark theme
    function toggleTheme() {
        isDarkTheme = themeToggle.checked;
        
        if (isDarkTheme) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
        
        localStorage.setItem('dark_theme', isDarkTheme);
    }
    
    // Save API key to local storage
    function saveApiKey() {
        const newApiKey = apiKeyInput.value.trim();
        
        if (!newApiKey) {
            showError('Please enter a valid API key.');
            return;
        }
        
        apiKey = newApiKey;
        localStorage.setItem('openrouter_api_key', apiKey);
        
        apiStatusValue.textContent = 'Set';
        apiStatusValue.classList.add('api-status-set');
        
        showSuccess('API key saved successfully!');
    }
    
    // Reset/clear API key
    function resetApiKey() {
        apiKey = '';
        apiKeyInput.value = '';
        localStorage.removeItem('openrouter_api_key');
        
        apiStatusValue.textContent = 'Not Set';
        apiStatusValue.classList.remove('api-status-set');
        
        showSuccess('API key cleared successfully!');
    }
    
    // Generate enhanced prompt using OpenRouter API
    function generatePrompt() {
        const input = userInput.value.trim();
        
        // Validate input
        if (!input) {
            showError('Please enter a description for your image.');
            return;
        }
        
        // Validate API key
        if (!apiKey) {
            showError('Please set your OpenRouter API key first.');
            return;
        }
        
        // Clear previous output and errors
        clearOutput();
        clearError();
        
        // Show loading indicator
        loadingElement.style.display = 'block';
        outputBox.querySelector('.placeholder')?.remove();
        
        // Prepare the prompt for the AI
        const promptTemplate = `You are an expert at creating detailed, realistic prompts for AI image generators. 
Create a detailed prompt for the ImageFX image generator based on this simple description: "${input}"

Make the prompt detailed and specific, focusing on:
- Photorealistic details
- Lighting conditions
- Camera perspective
- Style references
- Any additional elements that would enhance the image

Return ONLY the enhanced prompt with no additional text, explanations, or markdown.`;
        
        // Prepare request
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': window.location.href,
                'X-Title': 'ImageFX Prompt Generator'
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: 'You are an expert at creating detailed, realistic prompts for AI image generators.' },
                    { role: 'user', content: promptTemplate }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error?.message || 'Error connecting to OpenRouter API');
                });
            }
            return response.json();
        })
        .then(data => {
            // Extract the enhanced prompt from the response
            const enhancedPrompt = data.choices[0].message.content.trim();
            
            // Hide loading indicator
            loadingElement.style.display = 'none';
            
            // Display the enhanced prompt
            outputBox.textContent = enhancedPrompt;
            
            // Auto-copy to clipboard
            navigator.clipboard.writeText(enhancedPrompt)
                .then(() => showCopyNotification())
                .catch(err => console.error('Could not copy text: ', err));
        })
        .catch(error => {
            console.error('Error:', error);
            loadingElement.style.display = 'none';
            showError(error.message || 'Failed to generate prompt. Please try again.');
        });
    }
    
    // Copy the enhanced prompt to clipboard
    function copyToClipboard() {
        const content = outputBox.textContent.trim();
        
        if (!content || outputBox.querySelector('.placeholder')) {
            showError('No prompt to copy.');
            return;
        }
        
        navigator.clipboard.writeText(content)
            .then(() => {
                showCopyNotification();
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                showError('Failed to copy to clipboard.');
            });
    }
    
    // Show copy notification
    function showCopyNotification() {
        copyNotification.classList.add('show');
        
        setTimeout(() => {
            copyNotification.classList.remove('show');
        }, 2000);
    }
    
    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
    
    // Clear error message
    function clearError() {
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
    }
    
    // Show success message (reusing error element with different styling)
    function showSuccess(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = 'var(--success-color)';
        errorMessage.style.borderColor = 'var(--success-color)';
        errorMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        errorMessage.classList.add('show');
        
        setTimeout(() => {
            clearError();
            errorMessage.style.color = 'var(--danger-color)';
            errorMessage.style.borderColor = 'var(--danger-color)';
            errorMessage.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        }, 3000);
    }
    
    // Clear output
    function clearOutput() {
        if (!outputBox.querySelector('.placeholder')) {
            outputBox.innerHTML = '<p class="placeholder">Your enhanced prompt will appear here...</p>';
        }
    }
    
    // Initialize the app
    init();
}); 