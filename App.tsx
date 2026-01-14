import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import FormView from './components/FormView';
import PreviewView from './components/PreviewView';
import { UserData, AppState, Language } from './types';
import { INITIAL_USER_DATA } from './constants';
import { generateBlessing } from './services/geminiService';
import { generateImage } from './services/imageService';

// Wrapper to use navigate hook
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [appState, setAppState] = useState<AppState>({
    userData: INITIAL_USER_DATA,
    generatedBlessing: null,
    language: 'en',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const setUserData = (value: React.SetStateAction<UserData>) => {
      setAppState(prev => ({
          ...prev,
          userData: typeof value === 'function' ? value(prev.userData) : value
      }));
  };

  const setLanguage = (lang: Language) => {
    setAppState(prev => ({ ...prev, language: lang }));
  };

  const handleGenerate = async () => {
    if (!appState.userData.name) return;
    
    setIsGenerating(true);
    try {
      // Execute both Gemini (Text) and SiliconFlow (Image) in parallel for speed
      const [blessingData, imageUrl] = await Promise.all([
        generateBlessing(appState.userData),
        generateImage(appState.userData)
      ]);

      setAppState(prev => ({ 
        ...prev, 
        generatedBlessing: {
          ...blessingData,
          imageUrl: imageUrl // Combine the text result with the generated image
        } 
      }));
      
      navigate('/preview');
    } catch (error) {
      console.error("Failed to generate blessing", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = () => {
    navigate('/');
  };

  return (
    <div className="w-full bg-background-light dark:bg-background-dark">
      <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-paper-texture z-0"></div>
      
      <Routes>
        <Route 
          path="/" 
          element={
            <FormView 
              userData={appState.userData} 
              setUserData={setUserData} 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              language={appState.language}
              setLanguage={setLanguage}
            />
          } 
        />
        <Route 
          path="/preview" 
          element={
            <PreviewView 
              appState={appState} 
              onEdit={handleEdit} 
              setLanguage={setLanguage}
            />
          } 
        />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;