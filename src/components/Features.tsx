import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const featureItems = [
    {
      icon: '🗣️',
      title: '22 Official Indian Languages',
      description: 'Learn any of India\'s 22 officially recognized languages with comprehensive courses designed for all proficiency levels.',
      color: 'bg-gradient-to-br from-pink-50 to-purple-50',
      iconBg: 'bg-pink-100',
      hoverColor: 'hover:border-pink-300'
    },
    {
      icon: '📚',
      title: 'Interactive Learning Modules',
      description: 'Engage with interactive lessons, quizzes, and exercises designed to make language learning fun and effective.',
      color: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-100',
      hoverColor: 'hover:border-blue-300'
    },
    {
      icon: '🏆',
      title: 'Government-Recognized Certification',
      description: 'Earn official certifications recognized by government institutions and employers across India.',
      color: 'bg-gradient-to-br from-yellow-50 to-amber-50',
      iconBg: 'bg-yellow-100',
      hoverColor: 'hover:border-yellow-300'
    },
    {
      icon: '🎯',
      title: 'Personalized Learning Path',
      description: 'Follow a custom learning path tailored to your goals, schedule, and preferred learning style.',
      color: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      hoverColor: 'hover:border-green-300'
    },
    {
      icon: '🧠',
      title: 'AI-Powered Practice',
      description: 'Practice conversations with our AI language partner that adapts to your proficiency level and learning needs.',
      color: 'bg-gradient-to-br from-indigo-50 to-violet-50',
      iconBg: 'bg-indigo-100',
      hoverColor: 'hover:border-indigo-300'
    },
    {
      icon: '🏛️',
      title: 'Cultural Context',
      description: 'Learn not just the language but also cultural nuances, traditions, and regional variations across India.',
      color: 'bg-gradient-to-br from-orange-50 to-red-50',
      iconBg: 'bg-orange-100',
      hoverColor: 'hover:border-orange-300'
    }
  ];

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
            Key Features
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-indigo-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Discover what makes <span className="text-indigo-600 font-semibold">भाषामित्र</span> the premier platform for learning Indian languages
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((item, index) => (
            <Card 
              key={index} 
              className={`border-2 ${hoveredCard === index ? 'border-indigo-300 shadow-lg' : 'border-transparent shadow'} 
                         ${item.color} ${item.hoverColor} transition-all duration-300 rounded-xl overflow-hidden`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <CardHeader className="pb-2 pt-6">
                <div className={`${item.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4 text-4xl shadow-sm`}>
                  {item.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
                
                <div className={`mt-4 h-1 w-12 bg-indigo-500 rounded-full transition-all duration-300 ${hoveredCard === index ? 'w-24' : 'w-12'}`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-indigo-100 px-6 py-3 rounded-full">
            <p className="text-indigo-800 font-medium">
              Join over 100,000 language enthusiasts learning with भाषामित्र
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;