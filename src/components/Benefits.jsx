import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Benefits = () => {
  const [activeItem, setActiveItem] = useState(null);

  const benefitItems = [
  {
    icon: '💼',
    title: 'Career Advancement',
      description: 'Enhance your resume and unlock new job opportunities with multilingual skills.',
      extendedDescription: 'Companies value employees who can communicate across language barriers, especially in a diverse country like India. Many organizations offer higher compensation for multilingual professionals.',
      color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: '🎭',
    title: 'Cultural Connection',
      description: 'Deepen your understanding of India\'s diverse cultures through language.',
      extendedDescription: 'Language is the gateway to culture. By learning a regional language, you gain insights into traditions, literature, cinema, and the unique worldview of its speakers.',
      color: 'from-pink-500 to-rose-600'
  },
  {
    icon: '✈️',
    title: 'Travel Confidence',
      description: 'Navigate different regions of India with ease and connect with locals.',
      extendedDescription: 'Speaking the local language transforms you from a tourist to a traveler. Access authentic experiences, hidden gems, and forge meaningful connections with people you meet.',
      color: 'from-green-500 to-emerald-600'
  },
  {
    icon: '🧠',
    title: 'Cognitive Benefits',
      description: 'Improve memory, problem-solving skills, and multitasking abilities.',
      extendedDescription: 'Research shows that learning additional languages enhances brain function, delays cognitive decline, and improves decision-making abilities across all aspects of life.',
      color: 'from-violet-500 to-purple-600'
  }
];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1 rounded-full mb-4 inline-block">BENEFITS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Learn with <span className="text-indigo-600">भाषामित्र</span>?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the personal and professional advantages of mastering Indian languages through our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitItems.map((item, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform ${activeItem === index ? 'scale-105' : ''}`}
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}></div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-bl-full"></div>
              
              <CardHeader className="pt-8 pb-2">
                <div className="mb-4 relative">
                  <div className="text-4xl absolute -top-1 -left-1 opacity-20">{item.icon}</div>
                  <div className="text-4xl relative z-10">{item.icon}</div>
                </div>
                <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
              
              <CardContent className="relative">
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className={`overflow-hidden transition-all duration-300 ${activeItem === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-700 text-sm pt-2 border-t border-gray-100">
                    {item.extendedDescription}
                  </p>
                </div>
                
                <div className="flex items-center text-xs text-indigo-600 mt-4">
                  <span className={`mr-1 transition-all duration-300 ${activeItem === index ? 'opacity-100' : 'opacity-50'}`}>
                    {activeItem === index ? 'Read less' : 'Read more'}
                  </span>
                  <svg 
                    className={`w-4 h-4 transform transition-transform duration-300 ${activeItem === index ? 'rotate-180' : 'rotate-0'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                </CardContent>
              </Card>
          ))}
        </div>

        <div className="mt-16 lg:mt-24 text-center">
          <div className="inline-flex items-center justify-center gap-2 bg-indigo-50 rounded-full px-6 py-3 text-indigo-700 font-medium hover:bg-indigo-100 transition-colors duration-300 cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"></path>
            </svg>
            <span>Discover all the benefits of learning with भाषामित्र</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;