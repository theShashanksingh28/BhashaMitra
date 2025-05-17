import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const featureItems = [
    {
      icon: '👄',
      title: '22 Official Indian Languages',
      description: 'Learn any of India\'s 22 officially recognized languages with comprehensive courses designed for all proficiency levels.'
    },
    {
      icon: '📚',
      title: 'Interactive Learning Modules',
      description: 'Engage with interactive lessons, quizzes, and exercises designed to make language learning fun and effective.'
    },
    {
      icon: '🏆',
      title: 'Government-Recognized Certification',
      description: 'Earn official certifications recognized by government institutions and employers across India.'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what makes <span className="text-indigo-600">भाषामित्र</span> the premier platform for learning Indian languages
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featureItems.map((item, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="pb-2">
                <div className="text-4xl mb-2">{item.icon}</div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;