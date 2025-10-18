import React from 'react';

// Language list based on Project Guide Pillar 1
const languages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Español (España)' },
  { code: 'fr-FR', name: 'Français (France)' },
  { code: 'de-DE', name: 'Deutsch (Deutschland)' },
  { code: 'it-IT', name: 'Italiano (Italia)' },
  { code: 'hu-HU', name: 'Magyar (Magyarország)' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onChange: (languageCode: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor="language-select"
        className="block text-sm font-medium text-text-secondary mb-1"
      >
        Language
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-background border border-text-secondary/50 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
