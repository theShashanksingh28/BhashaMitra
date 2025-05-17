import React from 'react';
import { useParams } from 'react-router-dom';
import LevelTemplate from '@/components/LevelTemplate';

const LanguageLevel: React.FC = () => {
  const { language, stage, levelNumber } = useParams<{
    language: string;
    stage: string;
    levelNumber: string;
  }>();

  if (!language || !stage || !levelNumber) {
    return <div>Invalid parameters</div>;
  }

  return (
    <LevelTemplate
      language={language}
      stage={stage as 'Explorer' | 'Navigator' | 'FluentCommunicator' | 'LanguageVirtuoso'}
      levelNumber={parseInt(levelNumber, 10)}
    />
  );
};

export default LanguageLevel; 