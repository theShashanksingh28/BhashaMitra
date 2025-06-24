// Combine all language data files
import languageData from './languageData';
import languageData2 from './languageData2';
import languageData3 from './languageData3';
import languageData4 from './languageData4';
import languageData5 from './languageData5';
import languageData6 from './languageData6';
import languageData7 from './languageData7';
import languageData8 from './languageData8';

// Combine all language data into a single array
const allLanguageData = [
  ...languageData,
  ...languageData2,
  ...languageData3,
  ...languageData4,
  ...languageData5,
  ...languageData6,
  ...languageData7,
  ...languageData8
];

export default allLanguageData;