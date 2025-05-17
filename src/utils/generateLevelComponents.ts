import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LANGUAGES = [
  "Hindi", "Tamil", "Bengali", "Telugu", "Kannada", "Marathi",
  "Gujarati", "Malayalam", "Punjabi", "Odia", "Assamese",
  "Maithili", "Santali", "Kashmiri", "Sindhi", "Konkani",
  "Dogri", "Bodo", "Manipuri", "Nepali", "Sanskrit", "Urdu"
];

const STAGES = ['Explorer', 'Navigator', 'FluentCommunicator', 'LanguageVirtuoso'] as const;

const generateLevelComponent = (
  language: string,
  stage: typeof STAGES[number],
  levelNumber: number
): string => {
  return `import React from 'react';
import LevelTemplate from '@/components/LevelTemplate';

const ${language}${stage}Level${levelNumber}: React.FC = () => {
  return (
    <LevelTemplate
      language="${language}"
      stage="${stage}"
      levelNumber={${levelNumber}}
    />
  );
};

export default ${language}${stage}Level${levelNumber};
`;
};

const generateAllLevels = () => {
  LANGUAGES.forEach(language => {
    STAGES.forEach(stage => {
      const stageDir = join(__dirname, '..', 'pages', 'languages', language, stage);
      
      // Create stage directory if it doesn't exist
      if (!fs.existsSync(stageDir)) {
        fs.mkdirSync(stageDir, { recursive: true });
      }

      // Generate 50 levels for each stage
      for (let level = 1; level <= 50; level++) {
        const levelNumber = stage === 'Explorer' ? level :
                          stage === 'Navigator' ? level + 50 :
                          stage === 'FluentCommunicator' ? level + 100 :
                          level + 150;

        const filePath = join(stageDir, `Level${levelNumber}.tsx`);
        const content = generateLevelComponent(language, stage, levelNumber);
        
        fs.writeFileSync(filePath, content);
      }
    });
  });
};

export default generateAllLevels; 