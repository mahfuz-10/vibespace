import React, { useState } from 'react';

import { AudioProvider, useAudio } from './components/AudioManager';
import { Navbar } from './components/Navbar';
import { SituationBuilder } from './components/SituationBuilder';
import { VibeResult } from './components/VibeResult';
import { AtmosphereStudio } from './components/AtmosphereStudio';
import { PersistentPlayer } from './components/PersistentPlayer';
import VibeIntro from './components/VibeIntro';
import { TransitionOverlay } from './components/TransitionOverlay';


function MainContent() {
  const [currentTab, setCurrentTab] = useState('builder');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem('vibespace-intro-seen') !== 'true';
  });

  const { hasSubmittedSituation } = useAudio();


  const handleEnterSpace = () => {
    setShowIntro(false);
    sessionStorage.setItem('vibespace-intro-seen', 'true');
  };

  // Cinematic Transition Handler for Entering Atmosphere
  const handleProceedToResult = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTab('result');
      setIsTransitioning(false);
    }, 650); // Matches cinematic overlay timing
  };


  /*
   * INTRO SCREEN
   */

  if (showIntro) {
    return (
      <VibeIntro
        onEnter={handleEnterSpace}
      />
    );
  }


  /*
   * MAIN APPLICATION
   */

  return (
    <div className="min-h-screen transition-colors duration-500 pb-56 relative">

      {/* Cinematic Full-Screen Transition Overlay */}
      <TransitionOverlay isActive={isTransitioning} />

      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />


      <main>

        {/* If submitted or tab is result, show VibeResult. Otherwise show SituationBuilder */}
        {(hasSubmittedSituation || currentTab === 'result') ? (
          <VibeResult
            onOpenStudio={() => setCurrentTab('studio')}
          />
        ) : currentTab === 'builder' ? (
          <SituationBuilder
            onProceed={handleProceedToResult}
          />
        ) : currentTab === 'studio' ? (
          <AtmosphereStudio />
        ) : (
          <SituationBuilder
            onProceed={handleProceedToResult}
          />
        )}

      </main>


      <PersistentPlayer />

    </div>
  );
}


export default function App() {
  return (
    <AudioProvider>
      <MainContent />
    </AudioProvider>
  );
}