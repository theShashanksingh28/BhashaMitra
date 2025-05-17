import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text, 
  Stars, 
  Cloud, 
  Sky, 
  Float,
  Html,
  PerspectiveCamera
} from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

// List of Indian languages for selection
const INDIAN_LANGUAGES = [
  "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", 
  "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", 
  "Assamese", "Maithili", "Santali", "Kashmiri", "Nepali", 
  "Konkani", "Sindhi", "Dogri", "Manipuri", "Bodo", "Sanskrit"
];

// List of languages to learn
const LANGUAGES_TO_LEARN = [
  "English", "Spanish", "French", "German", "Japanese", 
  "Korean", "Chinese", "Russian", "Italian", "Portuguese"
];

// Main App Component
export default function App() {
  const [currentStage, setCurrentStage] = useState('intro');
  const [nativeLanguage, setNativeLanguage] = useState(null);
  const [languageToLearn, setLanguageToLearn] = useState(null);
  const [userName, setUserName] = useState("Learner");
  const [isLoading, setIsLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    // Comment out navigation for testing if you don't have routes set up
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    /*
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    */

    // Get user name from localStorage
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  // Handle native language selection
  const handleNativeLanguageSelect = (language) => {
    setNativeLanguage(language);
    setCurrentStage('selectLanguageToLearn');
  };

  // Handle language to learn selection
  const handleLanguageToLearnSelect = (language) => {
    setLanguageToLearn(language);
    setCurrentStage('completion');
    
    // Store language selections
    localStorage.setItem('nativeLanguage', language);
    localStorage.setItem('languageToLearn', language);
    localStorage.setItem('hasSelectedLanguages', 'true');
    
    // Simulate redirect to dashboard after completion
    // Comment out for testing if routes aren't set up
    /*
    setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
    */
  };

  // Toggle background audio
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-indigo-900">
        <div className="text-white text-2xl mb-4">Loading Magical Experience...</div>
        <div className="w-64 h-2 bg-indigo-800 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-pulse rounded-full"></div>
        </div>
      </div>
    );
  }

  if (currentStage === 'redirect') {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-indigo-900 text-white">
        <div className="text-3xl font-bold mb-4">
          Welcome to your language journey!
        </div>
        <div className="text-xl mb-8">
          {userName}, you've selected to learn {languageToLearn} from {nativeLanguage}.
        </div>
        <div className="text-lg animate-pulse">
          Redirecting to your personalized dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background Audio */}
      {audioEnabled && (
        <audio 
          src="/ambient-music.mp3" 
          autoPlay 
          loop 
          className="hidden"
        />
      )}
      
      {/* Audio Toggle Button */}
      <button 
        onClick={toggleAudio} 
        className="absolute top-4 right-4 z-50 bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded-full"
      >
        {audioEnabled ? "🔊" : "🔇"}
      </button>
      
      {/* Main Canvas */}
      <Canvas shadows dpr={[1, 2]} className="bg-indigo-900">
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <SceneManager 
            currentStage={currentStage} 
            userName={userName}
            nativeLanguage={nativeLanguage}
            languageToLearn={languageToLearn}
            onNativeLanguageSelect={handleNativeLanguageSelect}
            onLanguageToLearnSelect={handleLanguageToLearnSelect}
          />
        </Suspense>
        
        <Sky sunPosition={[0, 1, 0]} turbidity={10} rayleigh={0.5} />
        <Stars radius={50} depth={50} count={1000} factor={4} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2.1} 
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.3}
        />
      </Canvas>
      
      {/* Portal Overlay (shown during completion) */}
      {currentStage === 'completion' && (
        <div className="absolute inset-0 bg-purple-900 bg-opacity-50 pointer-events-none flex items-center justify-center">
          <div className="text-white text-3xl font-bold text-center">
            <div className="mb-4">Preparing your journey...</div>
            <div className="text-xl">
              From {nativeLanguage} to {languageToLearn}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Character Component (simplified without FBX for now)
function Character({ position = [0, 0, 0], currentStage, userName }) {
  const group = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  
  // Change dialog text based on stage
  useEffect(() => {
    let text = '';
    
    switch(currentStage) {
      case 'intro':
        text = `Welcome, ${userName}! I'm your language guide. Let's start by selecting your native language.`;
        break;
      case 'selectNativeLanguage':
        text = `Great! Please select your native language from the options.`;
        break;
      case 'selectLanguageToLearn':
        text = `Wonderful choice! Now, which language would you like to learn?`;
        break;
      case 'completion':
        text = `Perfect! I'm opening a portal to your personalized language journey. Get ready for an amazing adventure!`;
        break;
      default:
        text = `Hello, ${userName}! I'm here to help you.`;
    }
    
    setDialogText(text);
    
    // Show dialog with animation
    setShowDialog(false);
    const timer = setTimeout(() => {
      setShowDialog(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentStage, userName]);
  
  // Make the character bob gently
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.position.y = position[1] + Math.sin(t) * 0.1;
      if (hovered) {
        group.current.rotation.y = Math.sin(t * 2) * 0.1;
      }
    }
  });
  
  return (
    <group 
      ref={group} 
      position={position} 
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Simple character representation (until we can load FBX properly) */}
      <mesh castShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#4527a0" />
      </mesh>
      <mesh castShadow position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#7e57c2" />
      </mesh>
      
      {/* Dialog box */}
      {showDialog && (
        <Html position={[0, 2.5, 0]} center>
          <div className="bg-white bg-opacity-90 p-4 rounded-lg max-w-md shadow-lg">
            <p className="text-gray-800 text-lg">{dialogText}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// Floating Island
function FloatingIsland({ position = [0, -3, 0] }) {
  const ref = useRef(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 0.2) * 0.1;
      ref.current.rotation.y = Math.sin(t * 0.05) * 0.05;
    }
  });
  
  return (
    <group ref={ref} position={position}>
      {/* Island base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[5, 7, 2, 32]} />
        <meshStandardMaterial color="#2e7d32" />
      </mesh>
      
      {/* Top grassy part */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[7, 7, 0.5, 32]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
      
      {/* Trees */}
      <group position={[-3, 1.5, -1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
          <meshStandardMaterial color="#5d4037" />
        </mesh>
        <mesh castShadow position={[0, 1, 0]}>
          <coneGeometry args={[1, 2, 8]} />
          <meshStandardMaterial color="#388e3c" />
        </mesh>
      </group>
      
      <group position={[2.5, 1.5, 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 2, 8]} />
          <meshStandardMaterial color="#5d4037" />
        </mesh>
        <mesh castShadow position={[0, 1.2, 0]}>
          <coneGeometry args={[1.2, 2.5, 8]} />
          <meshStandardMaterial color="#388e3c" />
        </mesh>
      </group>
      
      <group position={[3, 1.5, -2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
          <meshStandardMaterial color="#5d4037" />
        </mesh>
        <mesh castShadow position={[0, 0.8, 0]}>
          <coneGeometry args={[0.8, 1.5, 8]} />
          <meshStandardMaterial color="#388e3c" />
        </mesh>
      </group>
      
      {/* Rocks */}
      <group position={[-2, 1.5, 2]}>
        <mesh castShadow>
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
      </group>
      
      {/* Path in the middle */}
      <mesh receiveShadow position={[0, 1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#d7ccc8" />
      </mesh>
    </group>
  );
}

// Language Selection Cards
function LanguageSelectionCards({ 
  languages, 
  position = [0, 0, 0], 
  onSelect, 
  cardColor = "#3f51b5" 
}) {
  const group = useRef(null);
  const totalCards = languages.length;
  const cardsPerRow = 6;
  const rows = Math.ceil(totalCards / cardsPerRow);
  
  // Calculate positions for cards
  const cardPositions = languages.map((_, index) => {
    const row = Math.floor(index / cardsPerRow);
    const col = index % cardsPerRow;
    const radius = 4;
    const angle = (col / cardsPerRow) * Math.PI * 2;
    
    return [
      Math.sin(angle) * radius,
      row * -1.5,
      Math.cos(angle) * radius
    ];
  });
  
  // Rotate the entire group slowly
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = t * 0.05;
    }
  });
  
  return (
    <group ref={group} position={position}>
      {languages.map((language, index) => (
        <Float
          key={language}
          speed={2}
          rotationIntensity={0.2}
          floatIntensity={0.5}
          position={cardPositions[index]}
        >
          <mesh 
            castShadow 
            onClick={() => onSelect(language)}
            onPointerOver={(e) => {
              document.body.style.cursor = 'pointer';
              e.object.scale.set(1.1, 1.1, 1.1);
            }}
            onPointerOut={(e) => {
              document.body.style.cursor = 'auto';
              e.object.scale.set(1, 1, 1);
            }}
          >
            <boxGeometry args={[1.5, 0.8, 0.1]} />
            <meshStandardMaterial color={cardColor} />
          </mesh>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {language}
          </Text>
        </Float>
      ))}
    </group>
  );
}

// Portal Effect
function Portal({ position = [0, 0, -5], active = false }) {
  const ref = useRef(null);
  const { clock } = useThree();
  
  useEffect(() => {
    if (active && ref.current) {
      // Animate portal opening
      gsap.to(ref.current.scale, {
        x: 2,
        y: 2,
        z: 2,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });
      
      gsap.to(ref.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.inOut"
      });
    } else if (ref.current) {
      // Reset size when inactive
      ref.current.scale.set(0.1, 0.1, 0.1);
    }
  }, [active]);
  
  useFrame(() => {
    if (active && ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.z = t * 0.5;
    }
  });
  
  return (
    <group ref={ref} position={position} scale={[0.1, 0.1, 0.1]}>
      <mesh>
        <torusGeometry args={[2, 0.5, 16, 32]} />
        <meshStandardMaterial color="#9c27b0" emissive="#6a1b9a" emissiveIntensity={2} />
      </mesh>
      
      {active && (
        <group>
          <pointLight color="#e040fb" intensity={5} distance={10} />
          
          {/* Particles around portal */}
          {[...Array(20)].map((_, i) => (
            <mesh key={i} position={[
              Math.sin(i / 20 * Math.PI * 2) * 2.5,
              Math.cos(i / 20 * Math.PI * 2) * 2.5,
              0
            ]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#e040fb" emissive="#e040fb" />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

// Floating Cloud Elements
function CloudElements() {
  return (
    <group>
      <Cloud position={[-10, 5, -15]} speed={0.2} opacity={0.4} />
      <Cloud position={[10, 6, -10]} speed={0.1} opacity={0.3} />
      <Cloud position={[0, 10, -25]} speed={0.3} opacity={0.5} />
      <Cloud position={[-8, 8, -5]} speed={0.2} opacity={0.4} />
      <Cloud position={[8, 10, -5]} speed={0.3} opacity={0.3} />
    </group>
  );
}

// Main Scene Manager
function SceneManager({ 
  currentStage, 
  userName,
  nativeLanguage,
  languageToLearn,
  onNativeLanguageSelect,
  onLanguageToLearnSelect 
}) {
  const [cameraPosition, setCameraPosition] = useState([0, 2, 10]);
  const cameraRef = useRef(null);
  
  // Update camera position based on stage
  useEffect(() => {
    if (!cameraRef.current) return;
    
    let targetPosition;
    
    switch(currentStage) {
      case 'intro':
      case 'selectNativeLanguage':
        targetPosition = [0, 2, 10];
        break;
      case 'selectLanguageToLearn':
        targetPosition = [0, 2, 10];
        break;
      case 'completion':
        targetPosition = [0, 2, 5];
        break;
      default:
        targetPosition = [0, 2, 10];
    }
    
    // Animate camera movement
    gsap.to(cameraRef.current.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration: 2,
      ease: "power2.inOut"
    });
    
  }, [currentStage]);
  
  return (
    <>
      <PerspectiveCamera 
        ref={cameraRef} 
        makeDefault 
        position={cameraPosition} 
        fov={45} 
      />
      
      {/* Environment elements */}
      <FloatingIsland position={[0, -3, 0]} />
      <CloudElements />
      
      {/* Guide character */}
      <Character 
        position={[0, 0, 0]} 
        currentStage={currentStage}
        userName={userName}
      />
      
      {/* Language selection cards */}
      {(currentStage === 'intro' || currentStage === 'selectNativeLanguage') && (
        <LanguageSelectionCards 
          languages={INDIAN_LANGUAGES} 
          position={[0, 0, -5]}
          onSelect={onNativeLanguageSelect}
          cardColor="#3f51b5"
        />
      )}
      
      {currentStage === 'selectLanguageToLearn' && (
        <LanguageSelectionCards 
          languages={LANGUAGES_TO_LEARN} 
          position={[0, 0, -5]}
          onSelect={onLanguageToLearnSelect}
          cardColor="#009688"
        />
      )}
      
      {/* Portal for completion */}
      <Portal position={[0, 0, -5]} active={currentStage === 'completion'} />
      
      {/* Ambient lighting */}
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#8d6e63" />
      
      {/* Particles */}
      {currentStage === 'completion' && (
        <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade />
      )}
    </>
  );
}
