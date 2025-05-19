import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Benefits from '@/components/Benefits';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { translateText } = useLanguage();

  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="benefits">
        <Benefits />
      </section>
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;