const fs = require('fs');
const path = require('path');

// List of all language directories that have Level1.jsx files with TypeScript syntax
const languages = [
  'Urdu', 'Telugu', 'Tamil', 'Santali', 'Sindhi', 'Punjabi', 'Odia', 
  'Sanskrit', 'Marathi', 'Manipuri', 'Nepali', 'Kashmiri', 'Malayalam', 
  'Maithili', 'Konkani', 'Gujarati', 'Kannada', 'Dogri', 'Bodo'
];

function fixTypeScriptSyntax(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix React.FC type annotations
    content = content.replace(
      /const SymbolCard: React\.FC<\{ item: any; goBack: \(\) => void \}> = \(\{ item, goBack \}\)/g,
      'const SymbolCard = ({ item, goBack })'
    );
    
    content = content.replace(
      /const LevelOne: React\.FC = \(\)/g,
      'const LevelOne = ()'
    );
    
    // Fix type annotations in function parameters
    content = content.replace(
      /const playSound = \(symbol: string\)/g,
      'const playSound = (symbol)'
    );
    
    // Fix useState type annotations
    content = content.replace(
      /useState<any \| null>\(null\)/g,
      'useState(null)'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Fix all Level1.jsx files
languages.forEach(language => {
  const filePath = path.join(__dirname, 'src', 'pages', 'languages', language, 'Foundation', 'Level1.jsx');
  if (fs.existsSync(filePath)) {
    fixTypeScriptSyntax(filePath);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('TypeScript syntax conversion completed!'); 