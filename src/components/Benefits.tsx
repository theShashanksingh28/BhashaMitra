import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Benefits = () => {
  const benefitItems = [
    {
      icon: '💼',
      title: 'Career Advancement',
      description: 'Enhance your resume and unlock new job opportunities with multilingual skills.'
    },
    {
      icon: '🎭',
      title: 'Cultural Connection',
      description: 'Deepen your understanding of India\'s diverse cultures through language.'
    },
    {
      icon: '✈️',
      title: 'Travel Confidence',
      description: 'Navigate different regions of India with ease and connect with locals.'
    },
    {
      icon: '🧠',
      title: 'Cognitive Benefits',
      description: 'Improve memory, problem-solving skills, and multitasking abilities.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Learn with भाषामित्र?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the advantages of mastering Indian languages through our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitItems.map((item, index) => (
            <Card key={index} className="border border-gray-100">
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

export default Benefits;