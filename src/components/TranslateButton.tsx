import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Placeholder for your translation function.  Replace this with your actual implementation.
const translate = async (text: string): Promise<string> => {
  // Simulate a delay for demonstration purposes.  Remove this in your actual implementation.
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Replace this with your actual translation logic.
  if (text === "Error") {
    throw new Error("Translation failed");
  }
  return `Hebrew translation of "${text}"`;
};


interface TranslateButtonProps {
  textToTranslate: string;
  onTranslate: (translatedText: string) => void;
}

const TranslateButton: React.FC<TranslateButtonProps> = ({ textToTranslate, onTranslate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);
    setTranslatedText(null);
    try {
      const translated = await translate(textToTranslate);
      setTranslatedText(translated);
      onTranslate(translated);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      aria-disabled={isLoading}
      aria-label={`Translate "${textToTranslate}" to Hebrew`}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"></path>
          </svg>
          Translating...
        </div>
      ) : error ? (
        <span>Error: {error}</span>
      ) : translatedText ? (
        <span>Translated!</span>
      ) : (
        'Translate to Hebrew'
      )}
    </button>
  );
};

TranslateButton.propTypes = {
  textToTranslate: PropTypes.string.isRequired,
  onTranslate: PropTypes.func.isRequired,
};

export default TranslateButton;
