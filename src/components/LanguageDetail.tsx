import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { Language, Level } from '@/data/languageData';

interface LanguageDetailProps {
  language: Language;
}

const LanguageDetail: React.FC<LanguageDetailProps> = ({ language }) => {
  const [selectedLevel, setSelectedLevel] = React.useState<Level | null>(null);
  
  const handleLevelClick = (level: Level) => {
    if (!level.locked) {
      setSelectedLevel(level);
    }
  };

  const handleBackClick = () => {
    setSelectedLevel(null);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">
          {language.nativeName} <span className="text-gray-500">({language.name})</span>
        </h2>
      </div>

      {selectedLevel ? (
        <div>
          <Button 
            variant="outline" 
            onClick={handleBackClick}
            className="mb-4"
          >
            ← Back to levels
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>{selectedLevel.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedLevel.content.map((item, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-medium">{item.text}</p>
                      {item.audio && (
                        <Button size="sm" variant="outline">
                          Play Audio
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {language.levels.map((level, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${level.locked ? 'opacity-70' : ''}`}
              onClick={() => handleLevelClick(level)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  {level.name}
                  {level.locked && (
                    <Lock className="ml-2 h-4 w-4 text-orange-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  {level.locked 
                    ? 'This level is locked. Subscribe to unlock.' 
                    : `${level.content.length} items`}
                </p>
                {!level.locked && (
                  <Button className="mt-2" variant="outline" size="sm">
                    Start Learning
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDetail;